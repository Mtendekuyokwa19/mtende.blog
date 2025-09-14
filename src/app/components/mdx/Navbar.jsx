import React from 'react';
import Link from 'next/link';
import { FaChevronUp } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToTop() {
  function toTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  return (
    <button
      onClick={toTop}
      className="fixed border-2 hover:bg-emerald-500 top-10/12 left-10/12  md:left-11/12 md:top-10/12  md:p-5 p-1 rounded-full flex "
    >
      <FaChevronUp />
    </button>
  );
}

function Tab({ children }) {
  return (
    <span className="lowercase text-black dark:text-white hover:text-black md:flex  underline  font-sans decoration-emerald-500 hover:bg-emerald-500 text-sm md:text-xl">
      /{children}
    </span>
  );
}

const ThemeSwitch = () => {
  const [mount, setMount] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  useEffect(() => {
    setMount(true);
  }, []);
  
  if (!mount) return null;
  
  return mount ? (
    <div className="z-[10000000000]">
      <button
        onClick={() => {
          setTheme(currentTheme === "dark" ? "light" : "dark");
        }}
        type="button"
        className="flex h-8 w-8 p-2 items-center justify-center rounded-md text-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:border-slate-300 dark:text-white"
      >
        <svg
          className="dark:hidden"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          className="hidden dark:block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  ) : null;
};

export function Navbar() {
  return (
    <nav className="flex  border-1 z-50 lg:w-1/2 w-11-12   backdrop-blur-md  border-slate-400 my-2 rounded-2xl font-sans w-4/5 justify-between lg:py-3 py-2 px-4 lg:px-8 items-center   ">
      <h1 title="Mtende header" className="md:text-3xl  text-md font-bold">
        <Link href="/">Mtende</Link>
        <span className="text-emerald-400 ">.</span>
      </h1>

      <div className="flex justify-center items-center md:gap-6 gap-2">
        <Link title="Blog" href={"/"}>
          <Tab>Blog</Tab>
        </Link>
        <Link title="about" href={"/about"}>
          <Tab>About</Tab>
        </Link>

        <ThemeSwitch />
      </div>
    </nav>
  );
}

export function Footer() {
  const iconsize = 20;
  return (
    <footer className="flex text-sm   lg:text-md lg:w-2/3 w-4/5 p-4 justify-between lg:p-8 items-center  ">
      <a href="mailto:mtendekuyokwa19@gmail.com" className="capitalize">
        contact
      </a>

      <div className="flex gap-6">
        <a href="https://github.com/mtendekuyokwa19">
          <BsGithub size={iconsize} />
        </a>
      </div>

      <a
        href="https://ko-fi.com/mtendekuyokwa"
        className="capitalize"
        target="_blank"
      >
        donate
      </a>
    </footer>
  );
}
