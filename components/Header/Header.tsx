import Link from "next/link";
import React from "react";
import AuthButton from "../AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SearchInput from "../search-input";

interface HeaderProps {
  user: boolean;
}

const Header = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* <Logo /> */}
          <ul className="hidden md:flex gap-x-6 text-white">
            <li>
              <Link href="/">
                <p className="text-secondary">Home</p>
              </Link>
            </li>
            {user && (
              <li>
                <Link href="/profile">
                  <p className="text-secondary">Profile</p>
                </Link>
              </li>
            )}
          </ul>
          <SearchInput />
          {/* {!user ? <AuthButton user={user} /> : <></>} */}
          <AuthButton user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
