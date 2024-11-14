This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash

pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Configuración de Prisma

Para que Prisma funcione correctamente en diferentes entornos, es necesario configurar la variable de entorno `PRISMA_BINARY_TARGETS` con la lista JSON apropiada para cada sistema operativo.

### Google IDX

En Google IDX, es necesario agregar `debian-openssl-3.0.x` a la lista `binaryTargets` en el archivo `schema.prisma`. Para evitar que este cambio se suba al repositorio y afecte a otros entornos, se utiliza la variable de entorno `PRISMA_BINARY_TARGETS`.

Para configurar Prisma en Google IDX, define la variable de entorno `PRISMA_BINARY_TARGETS` con la siguiente lista JSON:

```bash

PRISMA_BINARY_TARGETS='["native", "debian-openssl-3.0.x"]'

```
Puedes definir esta variable de entorno en la configuración de IDX o en tu archivo `.bashrc`, `.zshrc` o similar.

### Windows

En Windows, la configuración de `binaryTargets` por defecto es suficiente, por lo que no es necesario definir la variable de entorno `PRISMA_BINARY_TARGETS`.

Si por alguna razón necesitas definirla, utiliza la siguiente lista JSON:

```bash

PRISMA_BINARY_TARGETS='["native"]'

```
### Otros entornos

Para otros entornos, consulta la documentación de Prisma para obtener la lista JSON apropiada para tu sistema operativo: [enlace a la documentación de Prisma].

### Generar Prisma Client

Después de configurar la variable de entorno `PRISMA_BINARY_TARGETS`, ejecuta el siguiente comando para generar Prisma Client:

```bash

npx prisma generate

```
Esto generará una versión de Prisma Client que es compatible con tu entorno actual.
