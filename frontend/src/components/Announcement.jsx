import { useState, useEffect } from "react";

const Announcement = () => {
  const announcements = [
    {
      text: "Super Deal! Free Shipping on Orders Over $50",
      bgColor: "bg-teal-700",
      link: "/shipping",
    },
    {
      text: "Limited Time Offer: 20% Off All Products",
      bgColor: "bg-blue-500",
      link: "/deals",
    },
    {
      text: "New Arrivals: Check Out Our Latest Collection",
      bgColor: "bg-yellow-500",
      link: "/new-arrivals",
    },
  ];

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentAnnouncement((prevAnnouncement) =>
          prevAnnouncement === announcements.length - 1 ? 0 : prevAnnouncement + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered, announcements.length]);

  return (
    <div
      className={`relative overflow-hidden transition-all ease-in-out duration-300 ${announcements[currentAnnouncement].bgColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-4">
          {/* Announcement Text */}
          <a
            href={announcements[currentAnnouncement].link}
            className="text-center text-white font-medium hover:underline transition-all duration-300"
          >
            {announcements[currentAnnouncement].text}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
