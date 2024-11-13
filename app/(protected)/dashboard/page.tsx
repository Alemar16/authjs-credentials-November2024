import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      </div>

      <p className="text-lg text-gray-700">
        Este dashboard es el resultado de tu registro o inicio de sesión. Aquí
        puedes ver la información de tu sesión y realizar acciones adicionales.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
        <pre className="text-sm text-gray-700">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="mt-8 text-center">
        <LogoutButton />
      </div>
    </div>
  );
}
