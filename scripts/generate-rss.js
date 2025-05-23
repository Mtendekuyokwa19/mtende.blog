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

// Function to convert MDX content to HTML for RSS
function convertMdxToHtml(content) {
  // Remove import statements
  let htmlContent = content.replace(/^import\s+.*$/gm, "");

  // Convert markdown to basic HTML
  htmlContent = htmlContent
    // Convert headers
    .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")

    // Convert bold and italic
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")

    // Convert inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")

    // Convert code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")

    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    // Convert unordered lists
    .replace(/^\s*[-*+]\s+(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")

    // Convert ordered lists
    .replace(/^\s*\d+\.\s+(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ol>$1</ol>")

    // Convert line breaks to paragraphs
    .split("\n\n")
    .map((paragraph) => {
      paragraph = paragraph.trim();
      if (paragraph && !paragraph.startsWith("<")) {
        return `<p>${paragraph.replace(/\n/g, "<br>")}</p>`;
      }
      return paragraph;
    })
    .join("\n")

    // Clean up extra whitespace
    .replace(/\n\s*\n/g, "\n")
    .trim();

  return htmlContent;
}

// Function to create a clean description from content
function createDescription(content, frontmatterDescription) {
  if (frontmatterDescription) {
    return frontmatterDescription;
  }

  // Extract plain text for description
  const plainText = content
    .replace(/^import\s+.*$/gm, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();

  return plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
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
    managingEditor: "mtende@example.com (Mtende Kuyokwa)",
    webMaster: "mtende@example.com (Mtende Kuyokwa)",
    generator: "Custom RSS Generator",
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

        // Skip files without titles or that are not blog posts
        if (!data.title || !content.trim()) {
          return null;
        }

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

        // Convert content to HTML
        const htmlContent = convertMdxToHtml(content);

        // Create a clean description
        const description = createDescription(content, data.description);

        return {
          title: data.title,
          date: data.date ? new Date(data.date) : new Date(),
          description: description,
          content: htmlContent,
          author: data.author || "Mtende Kuyokwa",
          slug,
          categories: data.tags || data.categories || [],
          filePath: relativePath,
          ...data,
        };
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
        return null;
      }
    })
    .filter((post) => post !== null)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

  console.log(`Processing ${posts.length} valid posts`);

  posts.forEach((post) => {
    const postUrl =
      post.slug === "home"
        ? "https://mtende-blog.vercel.app"
        : `https://mtende-blog.vercel.app/${post.slug}`;

    // Format the date properly for RSS
    const pubDate = post.date instanceof Date ? post.date : new Date(post.date);

    feed.item({
      title: post.title,
      description: post.description,
      url: postUrl,
      guid: postUrl, // Use URL as GUID for uniqueness
      date: pubDate,
      author: post.author,
      categories: Array.isArray(post.categories) ? post.categories : [],
      custom_elements: [
        {
          "content:encoded": {
            _cdata: post.content,
          },
        },
      ],
    });

    console.log(
      `Added to RSS: ${post.title} -> ${postUrl} (${pubDate.toISOString()})`,
    );
  });

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate the RSS XML
  const rssXml = feed.xml({ indent: true });

  // Write RSS feed to public directory
  const rssPath = path.join(publicDir, "rss.xml");
  fs.writeFileSync(rssPath, rssXml);

  console.log(`RSS feed generated successfully at ${rssPath}!`);
  console.log(`Feed contains ${posts.length} items`);

  // Log first few lines of generated XML for verification
  console.log("\nFirst few lines of generated RSS:");
  console.log(rssXml.split("\n").slice(0, 10).join("\n"));
}

// Run the generator
try {
  generateRSS();
} catch (error) {
  console.error("Error generating RSS feed:", error.message);
  console.error(error.stack);
  process.exit(1);
}
