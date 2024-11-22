const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="min-h-screen pt-24 bg-gray-100 flex items-center justify-center py-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1533906966484-a9c978a3f090?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-[95%] sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[35%] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/50 backdrop-blur-[2px] rounded-lg" />
        <div className="relative bg-white/[0.05] rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] 
                      backdrop-blur-[8px] border border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
