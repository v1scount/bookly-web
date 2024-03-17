import Link from "next/link";
import { signOut } from "@/app/lib/supabase";

export default function AuthButton({ user }: any) {
  console.log(user);
  return user.user.user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <button className="w-24 py-2 ml-5 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <button className="w-24 py-2 ml-5 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Sign in
        </button>
      </Link>
    </div>
  );
}
