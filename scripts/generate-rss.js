// scripts/generate-rss.js
const RSS = require("rss");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Recursively find all .mdx files in a directory
function findMDXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      findMDXFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function generateRSS() {
  const feed = new RSS({
    title: "Your Site Title",
    description: "Your site description",
    site_url: "https://mtende-blog.vercel.app",
    feed_url: "https://mtende-blog.vercel.app/rss.xml",
    copyright: `${new Date().getFullYear()} Your Name`,
    language: "en",
    pubDate: new Date(),
  });

  // Get all MDX files from app directory recursively
  const appDirectory = path.join(process.cwd(), "app");
  const mdxFiles = findMDXFiles(appDirectory);

  const posts = mdxFiles
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // Generate slug from file path relative to app directory
      const relativePath = path.relative(appDirectory, filePath);
      const slug = relativePath.replace(".mdx", "").replace(/\\/g, "/");

      return {
        ...data,
        slug,
        content,
        filePath: relativePath,
      };
    })
    .filter((post) => post.title && post.date) // Only include posts with title and date
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description || post.content.substring(0, 200),
      url: `https://yoursite.com/${post.slug}`, // Uses the relative path from app directory
      date: post.date,
      author: post.author || "Your Name",
    });
  });

  // Write RSS feed to public directory
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
  console.log("RSS feed generated successfully!");
}

generateRSS();
