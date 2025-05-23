// scripts/generate-rss.js
import fs from "fs";
import RSS from "rss";

import { getAllPosts } from "../lib/posts"; // Your posts fetching function

async function generate() {
  const feed = new RSS({
    title: "Mtende",
    description: "My personal blog RSS feed",
    site_url: "https://mtende-blog.vercel.app",
    feed_url: "https://mtende-blog.vercel.app/rss.xml",
    language: "en",
  });

  const posts = await getAllPosts(); // fetch your posts with title, slug, date, etc.

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://mtende-blog.vercel.app/${post.slug}`,
      date: post.date,
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync("./public/rss.xml", rss);
  console.log("RSS feed generated");
}

generate();
