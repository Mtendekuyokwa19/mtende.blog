import Image from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="text-teal-500">{children}</h1>,
    p: ({ children }) => <p className="text-pink-500">{children}</p>,
    img: (props) => (
      <Image
        alt="person"
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    ),
    ...components,
  };
}
