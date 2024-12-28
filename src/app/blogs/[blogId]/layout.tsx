import type { Metadata } from "next";
import "../../globals.css";

// Sample blog data
const blogs = [
  {
    id: "1",
    image: "https://via.placeholder.com/800x400",
    title: "Blog Post 1",
    author: "Author A",
    date: "2023-12-01",
    description: "An introduction to the latest trends in web development.",
    content: "This is the detailed content of Blog Post 1...",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/800x400",
    title: "Blog Post 2",
    author: "Author B",
    date: "2023-12-10",
    description: "Exploring sustainability through tech innovation.",
    content: "This is the detailed content of Blog Post 2...",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/800x400",
    title: "Blog Post 3",
    author: "Author C",
    date: "2023-12-20",
    description: "How to master design principles for modern UI/UX.",
    content: "This is the detailed content of Blog Post 3...",
  },
];

type Props = {
  params: Promise<{ blogId: string }>;
}

// Dynamic metadata based on blogId
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogId = (await params).blogId;

  // Find the blog based on the blogId
  const blog = blogs.find((e) => e.id === blogId);

  // If the blog is found, return dynamic metadata
  if (blog) {
    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: [
          {
            url: blog.image,
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params
  console.log("Dynamic Route Params:", blogId);

  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
