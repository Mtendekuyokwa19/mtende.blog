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
          <Tab>ABout</Tab>
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
