import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button/logout-button";

const AdminPage = async () => {
  const session = await auth();

  // Verificar si el usuario no ha iniciado sesión
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">
          You must be authenticated as an admin to access this page
        </h1>
      </div>
    );
  }

  // Verificar si el usuario no es administrador
  if (session?.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">
          You are not authorized, you are not an admin
        </h1>
      </div>
    );
  }

  // Si el usuario es administrador, mostrar la página de administrador
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to the Admin Page
      </h1>
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
