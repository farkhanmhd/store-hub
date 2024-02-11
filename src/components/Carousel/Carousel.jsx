import { useEffect, useState } from "react";
import image1 from "../../assets/images/img1.jpg";
import image2 from "../../assets/images/img2.jpg";
import image3 from "../../assets/images/img3.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  return (
    <>
      <div id="default-carousel" className="relative" data-carousel="static">
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[998] text-white text-7xl font-semibold">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-500">
            StoreHub
          </span>
        </h2>
        <div className="overflow-hidden relative h-[300px] md:h-[400px] lg:h-[600px] brightness-[25%]">
          <div
            className={`duration-700 ease-in-out ${
              currentIndex === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image1}
              className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              alt="..."
            />
          </div>
          <div
            className={`duration-700 ease-in-out ${
              currentIndex === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image2}
              className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              alt="..."
            />
          </div>
          <div
            className={`duration-700 ease-in-out ${
              currentIndex === 2 ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image3}
              className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              alt="..."
            />
          </div>
        </div>
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
            onClick={() => showSlide(0)}
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
            onClick={() => showSlide(1)}
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
            onClick={() => showSlide(2)}
          ></button>
        </div>
        <button
          type="button"
          className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={goToPrevSlide}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={goToNextSlide}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
