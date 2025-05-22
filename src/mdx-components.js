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
    p: ({ children }) => (
      <p className="text-slate-400 w-1/2 text-justify">{children}</p>
    ),
    h2: ({ children }) => {
      const anchor = getAnchor(children);
      const link = `#${anchor}`;
      return (
        <h2
          id={anchor}
          className=" font-bold text-left  text-xl w-1/2 my-3 hover:underline "
        >
          <a href={link} className="anchor-link text-green-300  ">
            #
          </a>
          {children}
        </h2>
      );
    },

    ol: ({ children }) => (
      <ol className=" text-md  list-disc   w-1/2 flex px-12 justify-center  flex-col">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className=" text-md  list-disc  text-left">{children}</li>
    ),

    code: ({ children }) => <Code className=" w-28">{children}</Code>,
    blockquote: ({ children }) => (
      <blockquote className=" text-md w-1/2  rounded-xl p-4">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      <Image src={src} alt={alt} width={0} height={0} className="w-1/2 h-2/3" />
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
