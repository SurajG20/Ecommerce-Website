import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-scroll";
import { cn } from "../utils/cn";
import PropTypes from "prop-types";

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

const CarouselButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
      "hover:bg-background/40 transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      className
    )}
  >
    {children}
  </button>
);

CarouselButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const incrementIndex = () => {
    setCurrentIndex(
      (currentIndex) => (currentIndex + 1) % CAROUSEL_DATA.length
    );
  };

  const decrementIndex = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? CAROUSEL_DATA.length - 1 : currentIndex - 1
    );
  };

  useEffect(() => {
    const autoScrollInterval = setInterval(incrementIndex, 10000);
    return () => clearInterval(autoScrollInterval);
  }, []);

  return (
    <section className="relative h-[calc(100vh-104px)] overflow-hidden">
      <CarouselButton onClick={decrementIndex} className="left-4">
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </CarouselButton>

      <div className="relative h-full w-full">
        <img
          loading="lazy"
          src={CAROUSEL_DATA[currentIndex].url}
          alt={CAROUSEL_DATA[currentIndex].title}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-primary-foreground uppercase px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-in fade-in slide-in-from-bottom duration-500">
            {CAROUSEL_DATA[currentIndex].title}
          </h1>
          <p className="tracking-wider mb-16 text-md md:text-xl max-w-2xl animate-in fade-in slide-in-from-bottom duration-500 delay-200">
            {CAROUSEL_DATA[currentIndex].description}
          </p>
          <Link
            to="categories"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <button className="btn btn-primary inline-flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
              Shop Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>

      <CarouselButton onClick={incrementIndex} className="right-4">
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </CarouselButton>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-primary/50 hover:bg-primary/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
