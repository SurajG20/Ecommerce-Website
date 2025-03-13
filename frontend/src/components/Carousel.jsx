import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-scroll";
import { cn } from "../utils/cn";
import PropTypes from "prop-types";
import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useMediaQuery } from "../hooks/use-media-query";
import Autoplay from "embla-carousel-autoplay";

const CAROUSEL_DATA = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/summer.avif?alt=media&token=37fc320b-09f0-402a-ad37-3e434ddb7801",
    title: "summer sale",
    description:
      "don't compromise on style! get flat 30% off for new arrivals.",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/pink.avif?alt=media&token=af57dc9b-5613-4538-845e-f79ce7d86eee",
    title: "winter sale",
    description: "Winter is coming! don't miss out on our new collection!",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/blue.avif?alt=media&token=62585a3e-c17f-4358-b31e-384faaa83550",
    title: "Special sale",
    description: " Just for you! Get flat 50% off for new arrivals.",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/yellow.avif?alt=media&token=ef6bbac1-219c-4d62-9119-58499cdba86f",
    title: "autumn sale",
    description:
      "Get ready! Coming up with new arrivals, don't miss out on our new collection!",
  },
];

const CarouselSlide = ({ slide, currentIndex }) => {
  const isActive = currentIndex === CAROUSEL_DATA.indexOf(slide);

  return (
    <CarouselItem className="relative h-[calc(100vh-104px)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.url}
          alt={slide.title}
          className="w-full h-full object-cover transition-transform duration-500"
          loading={isActive ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
        <h1
          className={cn(
            "text-4xl md:text-6xl font-bold mb-8 uppercase",
            "animate-in fade-in slide-in-from-bottom duration-500",
            "tracking-wider"
          )}
        >
          {slide.title}
        </h1>
        <p
          className={cn(
            "tracking-wider mb-16 text-md md:text-xl max-w-2xl",
            "animate-in fade-in slide-in-from-bottom duration-500 delay-200"
          )}
        >
          {slide.description}
        </p>
        <Link
          to="categories"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          className="animate-in fade-in slide-in-from-bottom duration-500 delay-300"
        >
          <Button
            size="lg"
            className="group"
          >
            Shop Now
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </CarouselItem>
  );
};

CarouselSlide.propTypes = {
  slide: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

const Carousel = () => {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <CarouselComponent
      setApi={setApi}
      className="relative"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      opts={{
        loop: true,
        align: "start",
      }}
    >
      <CarouselContent>
        {CAROUSEL_DATA.map((slide, index) => (
          <CarouselSlide
            key={index}
            slide={slide}
            currentIndex={currentIndex}
          />
        ))}
      </CarouselContent>

      {!isMobile && (
        <>
          <CarouselPrevious
            className="left-4 bg-background/20 hover:bg-background/40 backdrop-blur-sm border-none"
          />
          <CarouselNext
            className="right-4 bg-background/20 hover:bg-background/40 backdrop-blur-sm border-none"
          />
        </>
      )}

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-primary/50 hover:bg-primary/75 w-2"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </CarouselComponent>
  );
};

export default Carousel;
