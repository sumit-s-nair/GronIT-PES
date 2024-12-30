import type { Metadata } from "next";
import "../../globals.css";

// Sample team member data for demonstration (replace with API call)
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "https://via.placeholder.com/150",
    bio: "John is a senior developer with a passion for green computing and sustainable technology.",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "https://via.placeholder.com/150",
    bio: "Jane is a UX/UI designer focused on creating accessible and user-friendly applications.",
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatarUrl: "https://via.placeholder.com/150",
    bio: "Alice is a project manager who ensures smooth collaboration across teams to deliver impactful solutions.",
  },
];

type Props = {
  params: Promise<{ memberId: string }>;
}

// Dynamic metadata based on memberId
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const memberId = (await params).memberId;

  // Find the team member based on memberId
  const member = teamMembers.find((m) => m.id === memberId);

  // If the team member is found, return dynamic metadata
  if (member) {
    return {
      title: member.name,
      description: member.bio,
      openGraph: {
        title: member.name,
        description: member.bio,
        images: [
          {
            url: member.avatarUrl,
            width: 150,
            height: 150,
            alt: member.name,
          },
        ],
      },
    };
  }

  // Fallback to default metadata if no member is found
  return {
    title: "GronIT Team",
    description: "Meet the Green Computing Club's Team at PES",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  console.log("Dynamic Route Params:", memberId);

  return (
    <html lang="en">
      <head>
        {/* Add any additional head elements for global styles, scripts, etc. */}
      </head>
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
