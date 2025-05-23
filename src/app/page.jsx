'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BsDiscord, BsLinkedin, BsGithub, BsMedium, BsRssFill, BsTwitter, BsMailbox } from "react-icons/bs";


export default function Home() {
	return (
		<article className="flex gap-5 lg:w-2/3 w-11/12 flex-1 items-stretch   flex-col   justify-between">
			<ShortBio />
			<BlogPosts />

		</article>


	);
}

export function Navbar() {
	const iconsize = 20

	return (
		<nav className="flex border-1  sticky top-1 backdrop-blur-md  border-slate-400 my-2 rounded-2xl font-sans w-4/5 justify-between lg:py-3 py-2 px-4 lg:px-8 items-center   ">
			<h1 className="md:text-3xl  text-md font-bold"><a href="/">Mtende</a><span className="text-emerald-400 ">.</span></h1>

			<div className="flex md:gap-6 gap-2">
				<a href="">

					<BsRssFill className="w-5" />
				</a>
				<a href="https://github.com/mtendekuyokwa19" target="_blank">


					<BsGithub className="w-5" />
				</a>
				<a href="mailto:mtendekuyokwa19@gmail.com">


					<BsMailbox className="w-5" /> </a>
				<ThemeSwitch />
			</div>
		</nav>
	)
}

export function Footer() {
	const iconsize = 20;
	return (

		<footer className="flex text-sm dark:bg-stone-900 bg-stone-400 lg:text-md lg:w-2/3 w-4/5 p-4 justify-between lg:p-8 items-center  ">

			<a href="mailto:mtendekuyokwa19@gmail.com" className="capitalize">contact</a>

			<div className="flex gap-6">
				<a href="https://www.linkedin.com/in/mtende-kuyokwa-a71a60241/?originalSubdomain=mw">



					<BsLinkedin size={iconsize} />

				</a>
			</div>

			<a href="https://ko-fi.com/mtendekuyokwa" className="capitalize" target="_blank">donate</a>
		</footer>


	)


}

export function ShortBio() {

	return (
		<section className=" flex-1  text-justify">
			<h2 className="lg:text-2xl text-lg font-bold">
				About Me

			</h2>
			<p className=" font-alltext text-sm lg:text-lg text-slate-900 dark:text-slate-300"> I am a student at the Malawi univerisity of business and applied science. I am pursuing a  Bachelors degree in Information Technology.
				I am a minimalist and a linux fan who recently survived a <a className="hover:underline text-slate-400" target="_blank" href="https://www.reddit.com/r/unixporn/comments/3iy3wd/stupid_question_what_is_ricing/">ricing</a> addiction. I write code as an excuse to use vim.<a href="https://archlinux.org/" className=" hover:underline text-slate-400">Arch-linux(btw) </a>,<a href="https://neovim.io/" className=" hover:underline  text-slate-400">Neovim</a>,<a href="https://github.com/kovidgoyal/kitty" className="text-slate-400 hover:underline">Kitty</a>, <a href="https://github.com/zellij-org/zellij" className="hover:underline text-slate-400">zellij</a> and <a href="https://github.com/zellij-org/zellij" className="hover:underline text-slate-400">i3 supremancy</a></p>
		</section>
	)

}
class blog {
	constructor(image, title, date, description, timetoread) {
		this.title = title;
		this.date = date;
		this.description = description;
		this.timetoread = timetoread
		this.image = image
	}


}
export function Card() {

	return (
		<>
			<section className="border  rounded-md md:flex hidden">
				<section className="flex flex-col flex-1  p-4">
					<Link href="/" className="lg:text-xl text-md text-emerald-300 hover:underline">Choosing an editor</Link>
					<p className="text-slate-500 text-xs lg:text-sm">2025-03-04</p>
					<p className="text-sm lg:text-md">The person should be able to fit in the world</p>
					<p className="text-slate-500 italic text-xs ">2 min read</p>

				</section>

				<section className="   rounded-md"><Image className="rounded p-3" alt="Image of finn" src="/finn.jpg" width={150} height={150} /> </section>
			</section>

			<section className="flex md:hidden border border-slate-600 rounded-md h-28 ">
				<section className="flex backdrop-blur-lg rounded-md">
					<div className="flex p-2 gap-4">
						<div className="flex justify-center items-center">
							<Image src={"/finn.jpg"} height={0} width={0} alt="image blog" className="w-40 rounded-md" />

						</div>
						<div className="flex gap-1 font-Quicksand justify-center items-start flex-col ">
							<div className="text-xs flex gap-2"> 26 may <p>{"⏱️" + 3 + "min read"}</p></div>
							<h3 className="text-md font-bold">{"The boy "}</h3>
							<p className="text-sm text-slate-400 italic">{"The man on the moon took a left turn to read the sign"}</p>
						</div>

					</div>
				</section>

			</section>
		</>
	)

}

export function BlogPosts() {
	let cards = [];
	for (let index = 0; index < 8; index++) {
		cards.push(<Card key={index} />)
	}
	return (
		<section className="flex  flex-col">

			<h2 className="lg:text-2xl text-lg font-bold">Blog posts</h2>
			<section className="  grid lg:grid-cols-2 grid-cols-1 grid-rows-4 gap-3 lg:gap-6 py-4 flex-col">
				{cards}


			</section>

		</section>

	)
}

const ThemeSwitch = () => {
	const [mount, setMount] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;
	useEffect(() => {
		setMount(true);
		console.log(systemTheme, theme, currentTheme)
	}, []);
	return mount ? (
		<div className="fixed right-5 z-[10000000000] max-lg:bottom-2.5 lg:top-1/3">
			<button
				onClick={() => { setTheme(currentTheme === "dark" ? "light" : "dark"); console.log(currentTheme) }}
				type="button"
				className="flex h-10 w-10 p-2 items-center justify-center rounded-md border border-gray-800 text-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:border-slate-300 dark:text-white"
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
