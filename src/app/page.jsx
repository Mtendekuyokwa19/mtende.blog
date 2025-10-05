"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <article className="flex  lg:w-11/12 w-11/12     justify-center py-9   ">
      <BlogPosts />
    </article>
  );
}
