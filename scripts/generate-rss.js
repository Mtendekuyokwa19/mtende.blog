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

// Function to convert MDX content to clean HTML for RSS
function convertMdxToHtml(content) {
  // Remove import statements and JSX components
  let cleanContent = content
    .replace(/^import\s+.*$/gm, "")
    .replace(/^export\s+.*$/gm, "")
    .replace(/<[^>]*>/g, ""); // Remove JSX tags

  // Remove images completely (no images in RSS feed)
  cleanContent = cleanContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");

  // Convert markdown to HTML following the exact specifications
  let htmlContent = cleanContent
    // Convert headers (order matters - start with h6 and work up)
    .replace(/^######\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^####\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^###\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.+)$/gm, "<h1>$1</h1>")

    // Convert strikethrough
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")

    // Convert bold and italic (handle ** and __ for bold, * and _ for italic)
    .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")

    // Convert inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")

    // Convert code blocks
    .replace(/```(\w+)?\s*\n([\s\S]*?)\n```/g, (match, lang, code) => {
      return `<pre><code${lang ? ` class="language-${lang}"` : ""}>${code.trim()}</code></pre>`;
    })

    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    // Handle blockquotes (simple format, no nested <p> tags)
    .replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>")

    // Convert horizontal rules
    .replace(/^---$/gm, "<hr>")
    .replace(/^\*\*\*$/gm, "<hr>")

    // Convert lists - handle nested structure
    .replace(/^(\s*)[-*+]\s+(.+)$/gm, "$1<li>$2</li>")
    .replace(/^(\s*)\d+\.\s+(.+)$/gm, "$1<li>$2</li>");

  // Process paragraphs and lists
  const lines = htmlContent.split("\n");
  const processedLines = [];
  let inList = false;
  let listType = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("<li>")) {
      if (!inList) {
        // Determine list type based on original markdown
        const originalLine = cleanContent.split("\n")[i];
        listType = /^\s*\d+\./.test(originalLine) ? "ol" : "ul";
        processedLines.push(`<${listType}>`);
        inList = true;
      }
      processedLines.push("  " + line);
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = null;
      }

      if (
        line &&
        !line.startsWith("<h") &&
        !line.startsWith("<pre>") &&
        !line.startsWith("<blockquote>") &&
        !line.startsWith("<hr") &&
        !line.startsWith("<ul>") &&
        !line.startsWith("<ol>") &&
        !line.startsWith("</") &&
        !line.startsWith("<code>")
      ) {
        processedLines.push(`<p>${line}</p>`);
      } else if (line) {
        processedLines.push(line);
      }
    }
  }

  if (inList) {
    processedLines.push(`</${listType}>`);
  }

  return processedLines.join("\n").replace(/\n\n+/g, "\n").trim();
}

function generateRSS() {
  // Create RSS feed with proper structure matching Joshua's
  const feed = new RSS({
    title: "Mtende's Blog",
    description: "Recent content on Mtende's Site",
    site_url: "https://mtende-blog.vercel.app",
    feed_url: "https://mtende-blog.vercel.app/rss.xml",
    copyright: `${new Date().getFullYear()} Mtende Kuyokwa`,
    language: "en",
    pubDate: new Date(),
    ttl: 60,
    custom_namespaces: {
      content: "http://purl.org/rss/1.0/modules/content/",
    },
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

        // Skip files without titles
        if (!data.title) {
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
        if (slug === "" || slug === "page") {
          return null; // Skip home page
        }

        // Convert content to HTML
        const htmlContent = convertMdxToHtml(content);

        // Create description from content if not provided
        const description =
          data.description ||
          content
            .replace(/[#*_`]/g, "")
            .substring(0, 160)
            .trim() + "...";

        return {
          title: data.title,
          date: data.date ? new Date(data.date) : new Date(),
          description: description,
          content: htmlContent,
          author: data.author || "Mtende Kuyokwa",
          slug,
          categories: data.tags || data.categories || [],
        };
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
        return null;
      }
    })
    .filter((post) => post !== null)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(`Processing ${posts.length} valid posts`);

  posts.forEach((post) => {
    const postUrl = `https://mtende-blog.vercel.app/${post.slug}`;

    feed.item({
      title: post.title,
      description: post.description,
      url: postUrl,
      guid: postUrl,
      date: post.date,
      author: post.author,
      categories: post.categories,
      custom_elements: [
        {
          "content:encoded": post.content,
        },
      ],
    });

    console.log(`Added to RSS: ${post.title}`);
  });

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate RSS XML
  let rssXml = feed.xml({ indent: true });

  // Fix the content:encoded CDATA wrapping to match Joshua's format
  rssXml = rssXml.replace(
    /<content:encoded>([\s\S]*?)<\/content:encoded>/g,
    (match, content) => {
      return `<content:encoded><![CDATA[${content}]]></content:encoded>`;
    },
  );

  // Write RSS feed to public directory
  const rssPath = path.join(publicDir, "rss.xml");
  fs.writeFileSync(rssPath, rssXml);

  console.log(`RSS feed generated successfully at ${rssPath}!`);
  console.log(`Feed contains ${posts.length} items`);
}

// Run the generator
try {
  generateRSS();
} catch (error) {
  console.error("Error generating RSS feed:", error.message);
  console.error(error.stack);
  process.exit(1);
}
