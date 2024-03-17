'use client';

import React, { useState } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import SearchInput from "../search-input";
import AuthButton from "../AuthButton";
import { useRouter } from "next/navigation";
import withTheme from "@/theme";

const Nav = (user: any, signOut: any) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const router = useRouter();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [{ id: 1, text: "Home", href: "/" }];

  //Navigate function to handle navigation
  const navigate = (href: string) => {
    router.push(href);
  }


  return (
    <div className="bg-black flex justify-between items-center w-full h-16 mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>

      {/* Desktop Navigation */}
      <>
        <SearchInput />
        <ul className="hidden ml-5 sm:flex">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
              onClick={() => navigate(item.href)}
            >
              {item.text}
            </li>
          ))}
          {user && (
            <>
              <li
                key="3213121"
                className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <AuthButton user={user}/>
            </>
          )}
        </ul>
      </>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <Cross1Icon /> : <HamburgerMenuIcon />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>

        {/* Mobile Navigation Items */}
        <>
          <SearchInput />
          {navItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
              onClick={() => navigate(item.href)}
            >
              {item.text}
            </li>
          ))}
        </>
      </ul>
    </div>
  );
};

// export default withTheme(Navbar);

const Navbar = (user: any, signOut: any) => {
  return withTheme(<Nav user={user} signOut={signOut}/>);
}

export default Navbar;