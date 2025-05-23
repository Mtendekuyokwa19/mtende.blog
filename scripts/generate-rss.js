// scripts/generate-rss.j// scripts/generate-rss.js
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

// Function to clean and process MDX content for RSS
function processContentForRSS(content) {
  // Remove MDX/JSX components and keep only markdown content
  let cleanContent = content
    // Remove import statements
    .replace(/^import\s+.*$/gm, "")
    // Remove JSX components (basic removal)
    .replace(/<[^>]+>/g, "")
    // Clean up markdown syntax for better RSS readability
    .replace(/```[\s\S]*?```/g, "[Code Block]") // Replace code blocks
    .replace(/`([^`]+)`/g, "$1") // Remove inline code backticks
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold markdown
    .replace(/\*([^*]+)\*/g, "$1") // Remove italic markdown
    .replace(/#{1,6}\s+/g, "") // Remove heading markers
    .replace(/^\s*[-*+]\s+/gm, "• ") // Convert markdown lists to bullet points
    .replace(/^\s*\d+\.\s+/gm, "• ") // Convert numbered lists to bullet points
    // Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, "\n\n") // Remove excessive line breaks
    .replace(/^\s+|\s+$/g, "") // Trim whitespace
    .trim();

  return cleanContent;
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

        // Process the full content for RSS
        const processedContent = processContentForRSS(content);

        // Extract a description from content if not provided in frontmatter
        const description =
          data.description || processedContent.substring(0, 200).trim() + "...";

        return {
          title: data.title,
          date: data.date,
          description: description,
          content: processedContent, // Include the full processed content
          author: data.author || "Mtende Kuyokwa",
          slug,
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
      description: post.content, // Use full content instead of just description
      url: postUrl,
      date: post.date || new Date(),
      author: post.author,
      categories: post.tags || post.categories || [],
      // You can also include a separate description field if needed
      custom_elements: [
        {
          "content:encoded": `<![CDATA[${post.content.replace(/\n/g, "<br>")}]]>`,
        },
      ],
    });

    console.log(`Added to RSS: ${post.title} -> ${postUrl}`);
  });

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write RSS feed to public directory
  const rssPath = path.join(publicDir, "feed.xml");
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
