import React, { useState, useEffect } from "react";

const Announcements = () => {
  const announcements = [
    {
      text: "Super Deal! Free Shipping on Orders Over $50",
      bgColor: "bg-teal-700",
    },
    {
      text: "Limited Time Offer: 20% Off All Products",
      bgColor: "bg-blue-500",
    },
    {
      text: "New Arrivals: Check Out Our Latest Collection",
      bgColor: "bg-yellow-500",
    },
  ];

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prevAnnouncement) =>
        prevAnnouncement === announcements.length - 1 ? 0 : prevAnnouncement + 1
      );
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`text-white text-center py-1 px-4 h-8 transition-all ease-in-out duration-300 ${announcements[currentAnnouncement].bgColor}`}
    >
      {announcements[currentAnnouncement].text}
    </div>
  );
};

export default Announcements;
