import { useState, useEffect } from "react";
import TaskPage from "./TaskPage";
const ads = ["Ad 1 - Shamem", "Ad 2 - Akash!", "Ad 3 - Manik!", "Ad 4 - Ifti!"];

const HomePage = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prevAd) => {
        if (prevAd === ads.length - 1) {
          // When reaching the last ad, reset to the first ad without animation
          setTimeout(() => setCurrentAd(0), 0); // Reset to the first ad instantly
          return prevAd + 1; // Move to the duplicated first ad
        }
        return (prevAd + 1) % ads.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-blue-600 text-white text-2xl font-bold">
        <div
          className="absolute w-full h-full flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentAd * 100}%)` }}
        >
          {ads.map((ad, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center"
            >
              {ad}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Blocks */}
      <div className="grid grid-cols-2 gap-4 p-4 text-center">
        {[
          { name: "Task", link: "/task", color: "bg-red-500" },
          { name: "Website Ads", link: "/website-ads", color: "bg-green-500" },
          {
            name: "How to Earn",
            link: "/guideline-to-earn",
            color: "bg-blue-500",
          },
          {
            name: "Know About Developer",
            link: "/developer-description",
            color: "bg-yellow-500",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={`p-8 rounded-lg shadow-lg text-white font-semibold text-lg transition transform hover:scale-105 ${item.color} flex items-center justify-center`}
          >
            <span className="animate-bounce hover:animate-pulse">
              {item.name}
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-4">
        <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-center sm:space-x-4">
          <div className="text-center sm:text-left">
            <a href="/settings" className="hover:underline block">
              Settings
            </a>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Telegram
            </a>
            <a href="#" className="hover:underline">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
