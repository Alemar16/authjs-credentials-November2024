import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        No autenticated
      </h1>
    </div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      </div>

      <p className="text-lg text-gray-700 text-center mb-5">
        This page is protected and only accessible to authenticated users.
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
