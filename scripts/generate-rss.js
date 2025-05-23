// scripts/generate-rss.js
const RSS = require("rss");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Recursively find all .mdx files in a directory
function findMDXFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (!file.startsWith(".") && file !== "node_modules") {
        findMDXFiles(filePath, fileList);
      }
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function generateRSS() {
  const feed = new RSS({
    title: "Mtende's Blog",
    description:
      "A blog by Mtende Kuyokwa - Student, Developer, and Linux enthusiast",
    site_url: "https://mtende-blog.vercel.app",
    feed_url: "https://mtende-blog.vercel.app/rss.xml",
    copyright: `${new Date().getFullYear()} Mtende Kuyokwa`,
    language: "en",
    pubDate: new Date(),
    ttl: 60,
  });

  // Get all MDX files from src/app directory recursively
  const appDirectory = path.join(process.cwd(), "src", "app");
  const mdxFiles = findMDXFiles(appDirectory);

  console.log(`Found ${mdxFiles.length} MDX files`);

  const posts = mdxFiles
    .map((filePath) => {
      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        // Generate slug from file path relative to src/app directory
        const relativePath = path.relative(appDirectory, filePath);
        let slug = relativePath.replace(/page\.mdx$/, "").replace(/\.mdx$/, "");

        // Clean up the slug
        slug = slug.replace(/\\/g, "/");
        if (slug.endsWith("/")) {
          slug = slug.slice(0, -1);
        }
        if (slug === "") {
          slug = "home";
        }

        // Extract a description from content if not provided
        const description =
          data.description ||
          content
            .replace(/[#*_`]/g, "")
            .substring(0, 200)
            .trim() + "...";

        return {
          title: data.title,
          date: data.date,
          description: description,
          author: data.author || "Mtende Kuyokwa",
          slug,
          content,
          filePath: relativePath,
          ...data,
        };
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
        return null;
      }
    })
    .filter((post) => post && post.title) // Only include posts with title
    .sort((a, b) => {
      // Sort by date if available, otherwise by title
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return a.title.localeCompare(b.title);
    });

  console.log(`Processing ${posts.length} valid posts`);

  posts.forEach((post) => {
    const postUrl =
      post.slug === "home"
        ? "https://mtende-blog.vercel.app"
        : `https://mtende-blog.vercel.app/${post.slug}`;

    feed.item({
      title: post.title,
      description: post.description,
      url: postUrl,
      date: post.date || new Date(),
      author: post.author,
      categories: post.tags || post.categories || [],
    });

    console.log(`Added to RSS: ${post.title} -> ${postUrl}`);
  });

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write RSS feed to public directory
  const rssPath = path.join(publicDir, "rss.xml");
  fs.writeFileSync(rssPath, feed.xml({ indent: true }));
  console.log(`RSS feed generated successfully at ${rssPath}!`);
  console.log(`Feed contains ${posts.length} items`);
}

// Run the generator
try {
  generateRSS();
} catch (error) {
  console.error("Error generating RSS feed:", error.message);
  process.exit(1);
}
