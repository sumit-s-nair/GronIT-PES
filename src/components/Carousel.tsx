import Image from "next/image";
import { useState, useEffect } from "react";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
  indicator?: "line" | "thumbnail";
  aspectRatio?: string;
  sizes?: string;
  revealedByDefault?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  indicator = "line",
  aspectRatio = "16 / 10",
  sizes,
  revealedByDefault = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(revealedByDefault);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = () => {
    if (images.length > 1) {
      setIsTransitioning(false);
      const nextIndex = (activeIndex + 1) % images.length;
      handleControlClick(nextIndex);
    }
  };

  const handleControlClick = (index: number) => {
    if (index !== activeIndex) {
      setIsTransitioning(false);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(true);
      }, 500);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Carousel Image */}
      <div onClick={handleImageClick}>
        <div
          className={`transition-all duration-1000 transform ${
            isTransitioning ? "opacity-100" : "opacity-0 translate-x-4"
          }`}
          style={{ width: "100%" }}
        >
          <Image
            className={`w-full rounded-lg border ${
              images.length > 1 ? "cursor-pointer" : ""
            }`}
            src={images[activeIndex]?.src}
            alt={images[activeIndex]?.alt}
            style={{
              aspectRatio: aspectRatio,
            }}
            sizes={sizes}
            width={1920}
            height={1080}
          />
        </div>
      </div>

      {/* Carousel Indicator */}
      {images.length > 1 && (
        <>
          {indicator === "line" ? (
            <div className="flex justify-center gap-6 px-4 mt-4">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleControlClick(index)}
                  className={`w-12 h-1 rounded-full cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-green-900 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-scroll gap-4 px-4 py-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleControlClick(index)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeIndex === index ? "border-4 border-green-900" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { Carousel };
