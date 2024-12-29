import Image from "next/image";
import React from "react";

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 50,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return imageUrl ? (
    <Image
      src={imageUrl}
      alt={name || "Avatar"}
      className="rounded-full object-cover"
      width={size}
      height={size}
    />
  ) : (
    <div
      className="rounded-full bg-zinc-400 flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
};
