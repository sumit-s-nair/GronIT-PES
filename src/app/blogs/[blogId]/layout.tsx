import type { Metadata } from "next";
import "../../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ blogId: string }>;
};

// Fetch blog details based on blogId
const fetchBlog = async (blogId: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const url = `${apiUrl}/api/blogs/getBlog?blogId=${blogId}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Blog not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch blog details:", error);
    return null;
  }
};

// Dynamic metadata based on blogId
export async function generateMetadata(
  { params }: { params: Promise<{ blogId: string }> }
): Promise<Metadata> {
  const { blogId } = await params; 

  const blog = await fetchBlog(blogId);

  // If the blog is found, return dynamic metadata
  if (blog) {
    const imageUrl = blog.image
      ? `data:${blog.imageType || "image/jpeg"};base64,${Buffer.from(
          blog.image
        ).toString("base64")}`
      : "/assets/logo_black.png";

    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 400,
            alt: blog.title,
          },
        ],
      },
    };
  }

  // Fallback to default metadata if no blog is found
  return {
    title: "GronIT Blogs",
    description: "Green computing club of PES",
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { blogId } = await params; 

  await fetchBlog(blogId);

  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
