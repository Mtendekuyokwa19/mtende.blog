export default function MdxLayout({ children }) {
  return (
    <article className="prose dark:prose-invert text-slate-600 dark:text-slate-300 font-light font-sans">
      <div>{children}</div>;
    </article>
  );
}
