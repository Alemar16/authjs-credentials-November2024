const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="grid place-items-center min-h-screen bg-gray-100 mt-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1533906966484-a9c978a3f090?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-md w-full max-w-md mx-4 backdrop-blur-lg border border-opacity-10 border-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
