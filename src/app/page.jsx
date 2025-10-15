"use client";
import { BlogPosts } from "./components/BlogCard";
export default function Page() {
  return (
    <article className="flex  lg:w-11/12 w-11/12     justify-center py-9   ">
      <BlogPosts />
    </article>
  );
}
