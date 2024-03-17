import Link from "next/link";
import { signOut } from "@/app/lib/supabase";
import { Button } from "antd";
import { redirect } from "next/navigation";

export default function AuthButton({ user }: any) {
  const closeSession = () => {
    signOut();
    console.log("sucede");
    // redirect("/profile");
  };
  return (
    <Button
      className="w-24 py-2 ml-5 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      onClick={closeSession}
    >
      Sign out
    </Button>
  );
}
