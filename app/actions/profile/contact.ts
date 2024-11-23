"use server";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { ContactSchema } from "@/lib/schemas/contact";
import { z } from "zod";

export async function updateContactInfo(values: z.infer<typeof ContactSchema>) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    console.log('Usuario actual:', { id: user.id, email: user.email });

    // Validar los datos primero
    const validatedData = ContactSchema.parse(values);

    // Preparar los datos para la base de datos
    const contactData: Record<string, string | null> = {
      phone: validatedData.phone?.trim() || null,
      phoneCountry: validatedData.phoneCountry?.trim() || null,
      githubUrl: validatedData.githubUrl?.trim() || null,
      linkedinUrl: validatedData.linkedinUrl?.trim() || null,
      facebookUrl: validatedData.facebookUrl?.trim() || null,
      instagramUrl: validatedData.instagramUrl?.trim() || null,
    };

    console.log('Datos a guardar:', contactData);

    // Verificar si ya existe un contacto para este usuario
    const existingContact = await db.contact.findUnique({
      where: {
        userId: user.id,
      },
    });

    console.log('Contacto existente:', existingContact);

    // Actualizar o crear el contacto
    const contact = await db.contact.upsert({
      where: {
        userId: user.id,
      },
      create: {
        ...contactData,
        userId: user.id,
      },
      update: contactData,
    });

    console.log('Contacto después de guardar:', contact);

    return { success: true, data: contact };
  } catch (error) {
    console.error("[CONTACT_UPDATE_ERROR]", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update contact information" };
  }
}

export async function getContactInfo() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    console.log('Obteniendo contacto para usuario:', { id: user.id, email: user.email });

    const contact = await db.contact.findUnique({
      where: {
        userId: user.id,
      },
    });

    console.log('Contacto recuperado de la base de datos:', contact);

    // Si no hay contacto, devolver valores por defecto
    if (!contact) {
      console.log('No se encontró contacto, devolviendo valores por defecto');
      return { 
        success: true, 
        data: {
          phone: "",
          phoneCountry: "",
          githubUrl: "",
          linkedinUrl: "",
          facebookUrl: "",
          instagramUrl: "",
        } 
      };
    }

    return { success: true, data: contact };
  } catch (error) {
    console.error("[CONTACT_GET_ERROR]", error);
    return { success: false, error: "Failed to get contact information" };
  }
}
