import { Card, posts, Recommended } from "../page";
export default function MdxLayout({ children }) {
  console.log(posts);
  return (
    <>
      <>{children}</>
      <div className="text-3xl font-bold">;</div>
    </>
  );
}
