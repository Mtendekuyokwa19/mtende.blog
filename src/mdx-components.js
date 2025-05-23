import Image from "next/image";
import Code from "@/components/mdx/code";
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="capitalize  font-extrabold lg:text-4xl md:text-2xl text-xl">
        {children}
      </h1>
    ),
    mark: ({ children }) => (
      <mark className="bg-stone-800 text-pink-500"> {children}</mark>
    ),
    p: ({ children }) => (
      <p className="dark:text-slate-400 text-slate-700  md:w-1/2 w-11/12 text-justify">
        {children}
      </p>
    ),
    h2: ({ children }) => {
      const anchor = getAnchor(children);
      const link = `#${anchor}`;
      return (
        <h2
          id={anchor}
          className=" font-bold text-left  text-xl w-11/12 md:w-1/2 md:my-3 my-1 hover:underline "
        >
          {children}
          <a
            target="_blank"
            href={link}
            className="anchor-link mx-7 text-green-300  "
          >
            #
          </a>
        </h2>
      );
    },

    ol: ({ children }) => (
      <ol className=" text-md  list-disc w-11/12   md:w-1/2 flex md:px-12 px-6 justify-center  flex-col">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className=" text-md  list-disc  text-left">{children}</li>
    ),

    code: ({ children }) => <Code className=" w-28">{children}</Code>,
    blockquote: ({ children }) => (
      <blockquote className=" text-md md:w-1/2 w-11/12  bg-gray-900 dark:bg-everNav bg-catNav p-4 font-Quicksand italic rounded border-l-2 border-emerald-700 dark:border-emerald-300  ">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-green-300">
        {children.toString()}
      </a>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        className="w-1/2 my-7 flex justify-center  items-center"
      />
    ),
    ...components,
  };
}

export function getAnchor(text) {
  let message = text + "";
  return message
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}
