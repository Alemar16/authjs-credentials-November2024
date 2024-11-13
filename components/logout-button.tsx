// "use client";

// import { signOut } from "@/auth";
// import { Button } from "./ui/button";

// const LogoutButton = () => {
//   const handleClick = async () => {
//     try {
//       await signOut();
//     } catch (error) {
//       console.error("Error during sign out:", error);
//     }
//   };
//   return <Button onClick={handleClick}>Logout</Button>;
// };

// export default LogoutButton;

// components/logout-button.tsx

import { signOut } from "@/auth";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default LogoutButton;
