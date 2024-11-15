import { signOut } from "@/auth";
import { Button } from "../ui/button";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default LogoutButton;
