import Link from "next/link";
import React from "react";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface HeaderProps {
  user: boolean;
  signOut?: Function;
}

const Header = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    await supabase.auth.signOut();
    return redirect("/login");
  };
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* <Logo /> */}
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/popular">
                  <p>Popular</p>
                </Link>
              </li>
              <li>
                <Link href="/latest">
                  <p>Latest</p>
                </Link>
              </li>
              <li>
                <Link href="/lists">
                  <p>Lists</p>
                </Link>
              </li>
            </ul>
            {user ? <AuthButton user={user} signOut={signOut} /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
