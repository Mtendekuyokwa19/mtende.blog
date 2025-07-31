"use client";
import { useTheme } from "next-themes";
import { FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  BsArrowLeft,
  BsBoxArrowInLeft,
  BsDiscord,
  BsGithub,
  BsLinkedin,
  BsMailbox,
  BsMedium,
  BsRssFill,
  BsTwitter,
} from "react-icons/bs";

export default function Home() {
  return (
    <article className="flex  lg:w-11/12 w-11/12     justify-center py-9   ">
      <BlogPosts />
    </article>
  );
}

export function Navbar() {
  return (
    <nav className="flex  border-1 z-50 lg:w-1/2    backdrop-blur-md  border-slate-400 my-2 rounded-2xl font-sans w-4/5 justify-between lg:py-3 py-2 px-4 lg:px-8 items-center   ">
      <h1 title="Mtende header" className="md:text-3xl  text-md font-bold">
        <Link href="/">Mtende</Link>
        <span className="text-emerald-400 ">.</span>
      </h1>

      <div className="flex justify-center items-center md:gap-6 gap-2">
        <Link title="about" href={"/about"}>
          <Tab>Blog</Tab>
        </Link>
        <Link title="about" href={"/about"}>
          <Tab>ABout</Tab>
        </Link>
        |
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

export function ShortBio() {
  return (
    <section className=" flex-1  text-justify">
      <h2 className="lg:text-2xl text-lg font-bold">About Me</h2>
      <p className=" font-alltext text-sm lg:text-lg text-slate-900 dark:text-slate-300">
        {" "}
        I am a student at the Malawi univerisity of business and applied
        science. I am pursuing a Bachelors degree in Information Technology. I
        am a minimalist and a linux fan who recently survived a{" "}
        <a
          className="hover:underline text-emerald-900  dark:text-[#9DA9A0]"
          target="_blank"
          href="https://www.reddit.com/r/unixporn/comments/3iy3wd/stupid_question_what_is_ricing/"
        >
          ricing
        </a>{" "}
        addiction. I write code as an excuse to use vim.
        <a
          href="https://archlinux.org/"
          className=" hover:underline text-emerald-900 dark:text-[#9DA9A0]"
        >
          Arch-linux(btw){" "}
        </a>
        ,
        <a
          href="https://neovim.io/"
          className=" hover:underline text-emerald-900  dark:text-[#9DA9A0]"
        >
          Neovim
        </a>
        ,
        <a
          href="https://github.com/kovidgoyal/kitty"
          className="dark:text-[#9DA9A0]  text-emerald-900  hover:underline"
        >
          Kitty
        </a>
        ,{" "}
        <a
          href="https://github.com/zellij-org/zellij"
          className="hover:underline text-emerald-900 dark:text-[#9DA9A0]"
        >
          zellij
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/zellij-org/zellij"
          className="hover:underline text-emerald-900 dark:text-[#9DA9A0]"
        >
          i3 supremancy
        </a>
      </p>
    </section>
  );
}
class Blog {
  constructor(image, title, date, description, timetoread, link, time) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.timetoread = timetoread;
    this.image = image;
    this.link = link;
    this.time = time;
  }
}
export function Card({
  title,
  date,
  description,
  image,
  link,
  time,
  timetoread,
}) {
  return (
    <>
      <section className="border  rounded-md md:flex hidden">
        <section className="flex flex-col flex-1  p-4">
          <Link
            href={"/" + link}
            className="lg:text-xl text-md dark:text-[#A7C080] text-emerald-900 hover:underline"
          >
            {title}
          </Link>
          <p className="dark:text-slate-400 text-[#232A2E] text-xs lg:text-sm">
            {date}
          </p>
          <p className="text-sm lg:text-md">{description}</p>
          <p className="dark:text-slate-500 text-[#3A515D] italic text-xs  ">
            {timetoread + " min read"}
          </p>
        </section>

        <section className="   rounded-md">
          <Image
            unoptimized={true}
            className="rounded p-3"
            alt="Image of finn"
            src={"/" + image}
            width={150}
            height={150}
          />{" "}
        </section>
      </section>

      <section className="flex md:hidden overflow-hidden border border-slate-600 rounded-md h-28 ">
        <Link href={"/" + link}>
          <section className="flex backdrop-blur-lg rounded-md">
            <div className="flex p-2 gap-4">
              <div className="flex justify-center items-center">
                <Image
                  src={"/" + image}
                  height={150}
                  width={150}
                  alt="image blog"
                  className="h-24 hidden rounded-md"
                />
              </div>
              <div className="flex gap-1 font-Quicksand justify-center items-start flex-col ">
                <div className="text-xs flex gap-2">
                  {" "}
                  {date}
                  <p>{"⏱️" + timetoread + "min read"}</p>
                </div>
                <h3 className="text-md dark:text-[#A7C080] font-bold">
                  {title}
                </h3>
                <p className="text-sm text-[#3A515D] dark:text-slate-400 italic ">
                  {description}
                </p>
              </div>
            </div>
          </section>
        </Link>
      </section>
    </>
  );
}

const health_as_a_dev = new Blog(
  "health-as-a-dev.jpg",
  "health as a  dev",
  "02-June-2025",
  "A guide on improving one's health as a dev.",
  "2",
  "health-as-a-dev",
  "2",
);

const a_rant_on_escaping_monotony = new Blog(
  "gdscript.jpg",
  "escaping monotony",
  "11-June-2025",
  "A rant on how I escaped monotony",
  "2",
  "escaping-monotony",
  "3",
);
const hackathons = new Blog(
  "july.jpg",
  "losing hackthons",
  "16-July-2025",
  "computer-vision,pi3 and losing hackathons",
  "2",
  "computer-vision-pi-waste",
  "3",
);
const batteries_vs_no_batteries = new Blog(
  "batteries.jpg",
  "batteries and buildings",
  "1-July-2025",
  "advantages and disadvantages of framework classes",
  "2",
  "batteries-vs-no-batteries",
  "3",
);

const aJujutsuLater = new Blog(
  "juju.jpg",
  "A Jujutsu Later",
  "30-July-2025",
  "An exploration on a new VCS tool",
  "2",
  "a-jujutsu-later",
  "3",
);
export const posts = [
  aJujutsuLater,
  hackathons,
  batteries_vs_no_batteries,
  a_rant_on_escaping_monotony,
  health_as_a_dev,
];

export function BlogPosts({ initializer = 0 }) {
  let cards = [];
  for (let i = initializer; i < posts.length; i++) {
    cards.push(
      <Card
        key={i}
        title={posts[i].title}
        date={posts[i].date}
        description={posts[i].description}
        timetoread={posts[i].timetoread}
        image={posts[i].image}
        link={posts[i].link}
      />,
    );
  }
  return (
    <section className="flex  flex-col">
      <h2 className="lg:text-2xl text-lg font-bold">All Posts</h2>
      <section className="grid lg:grid-cols-2 grid-cols-1 grid-rows-4 gap-3 lg:gap-6 py-4 flex-col">
        {cards}
      </section>
    </section>
  );
}

export function Recommended() {
  let number = Math.floor(Math.random() * (posts.length - 1));

  return (
    <div className="bg-[#a3be8c] w-42 text-black relative p-2">
      <h4>
        <Link
          href={"/"}
          className="flex font-bold justify-center gap-2 items-center "
        >
          <BsArrowLeft size={23} />
          <span>Back to home</span>
        </Link>
      </h4>
    </div>
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
    <div className="z-[10000000000]   ">
      <button
        onClick={() => {
          setTheme(currentTheme === "dark" ? "light" : "dark");
          console.log(currentTheme);
        }}
        type="button"
        className="flex h-8 w-8 p-2 items-center justify-center rounded-md  text-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:border-slate-300 dark:text-white"
      >
        <svg
          className="dark:hidden"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000postssvg"
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

function Tab({ children }) {
  return (
    <span className="lowercase text-black dark:text-white hover:text-black hidden md:flex  underline  font-sans decoration-emerald-500 hover:bg-emerald-500 text-xl">
      /{children}
    </span>
  );
}

export function ToTop() {
  function toTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  return (
    <button
      onClick={toTop}
      className="fixed border-2 hover:bg-emerald-500 md:left-11/12 hidden md:top-10/12  md:p-5 p-2 rounded-full md:flex "
    >
      <FaChevronUp />
    </button>
  );
}
