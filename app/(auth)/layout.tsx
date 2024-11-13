const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="border rounded-lg w-[300px] h-[400px] flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
