// src/app/rss.xml/route.js
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const rssPath = path.join(process.cwd(), "public", "rss.xml");

    if (!fs.existsSync(rssPath)) {
      return new Response(
        "RSS feed not found. Please run the RSS generation script.",
        {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        },
      );
    }

    const rssContent = fs.readFileSync(rssPath, "utf8");

    return new Response(rssContent, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error serving RSS feed:", error);
    return new Response("Error generating RSS feed", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
