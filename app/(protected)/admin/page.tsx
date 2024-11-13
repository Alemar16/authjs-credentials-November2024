import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

const AdminPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">You are not authorized, please login as an admin</h1>
      </div>
    );
  }

  // if (!session) {
  //   return <div className="flex items-center justify-center h-screen bg-gray-100">
  //     <h1 className="text-3xl font-bold text-gray-800">
  //       No autenticated
  //     </h1>
  //   </div>;
  // }

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
