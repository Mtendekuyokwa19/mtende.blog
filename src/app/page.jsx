import Image from "next/image";
import Link from "next/link";

import { BsGithub, BsRssFill, BsTwitter } from "react-icons/bs";

export default function Home() {
  return (
    <main className="flex   flex-col items-center  justify-center">
      <ShortBio />
      <BlogPosts />

    </main>


  );
}

export function Navbar() {
  const iconsize = 20

  return (
    <nav className="flex font-sans justify-around p-8 items-center   ">
      <h1 className="text-3xl font-bold">Mtende<span className="text-emerald-400 ">.</span></h1>

      <div className="flex gap-6">
        <BsRssFill size={iconsize} />
        <BsGithub size={iconsize} />
        <BsTwitter size={iconsize} />
      </div>
    </nav>
  )
}

export function Footer() {
  const iconsize = 20;
  return (

    <footer className="flex justify-around p-8 items-center  ">

      <h2 className="capitalize">contact</h2>

      <div className="flex gap-6">
        <BsRssFill size={iconsize} />
        <BsGithub size={iconsize} />
        <BsTwitter size={iconsize} />
      </div>

      <h2 className="capitalize">donate</h2>
    </footer>


  )


}

export function ShortBio() {

  return (
    <section className="w-2/3 flex-1">
      <h2 className="text-2xl font-bold">
        About Me

      </h2>
      <p className="font-alltext text-slate-300"> I am a third year student at the Malawi univerisity of business and applied science. I am pursuing a  Bachelors degree in Information Technology. </p>
      <p className="font-alltext text-slate-300">I am a minimalist and a linux fan who recently survived a <a href="https://www.reddit.com/r/unixporn/comments/3iy3wd/stupid_question_what_is_ricing/">ricing</a> addiction. My current setup is <a href="https://archlinux.org/" className=" hover:underline text-slate-400">arch-linux(btw) </a>,<a href="https://neovim.io/" className=" hover:underline  text-slate-400">Neovim</a>,<a href="https://github.com/kovidgoyal/kitty" className="text-slate-400 hover:underline">Kitty</a>, <a href="https://github.com/zellij-org/zellij" className="hover:underline text-slate-400">zellij</a> and <a href="https://github.com/zellij-org/zellij" className="hover:underline text-slate-400">i3</a></p>
    </section>
  )

}
export function Card() {

  return (
    <section className="border  rounded-md flex">
      <section className="flex flex-col flex-1  p-4">
        <Link href="/" className="text-xl text-emerald-300 hover:underline">Choosing an editor</Link>
        <p className="text-slate-500 text-sm">2025-03-04</p>
        <p>The person should be able to fit in the world</p>
        <p className="text-slate-500 italic text-xs ">2 min read</p>




      </section>

      <section className="rounded-md"><Image className="rounded p-3" alt="Image of finn" src="/finn.jpg" width={150} height={150} /> </section>
    </section>

  )

}

export function BlogPosts() {
  let cards = [];
  for (let index = 0; index < 8; index++) {
    cards.push(<Card key={index} />)
  }
  return (
    <section className="flex w-2/3 flex-col">

      <h2 className="text-2xl font-bold">Blog posts</h2>
      <section className="  grid grid-cols-2 grid-rows-4 gap-6 py-4 flex-col">
        {cards}


      </section>

    </section>

  )
}
