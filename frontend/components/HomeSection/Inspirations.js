import React, { useEffect } from "react";
import Link from "next/link";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "aos/dist/aos.css";
import AOS from "aos";

const Inspirations = () => {

  useEffect(() => {
    AOS.init({});
    // Add event listeners for updates
    AOS.refresh();
    // Clean up on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const images = [
    { id: 1, source: "/slider/boxslider.webp" },
    { id: 2, source: "/slider/boxslider2.webp" },
    { id: 3, source: "/slider/boxslider3.webp" },
    { id: 4, source: "/slider/boxslider4.webp" },
  ];

  return (
    <div className="bg-[#FCF8F3] overflow-hidden flex flex-col md:flex-row justify-between items-center my-[5vh] md:my-[15vh]">
      <div 
        className="text-left p-8 md:p-4 md:w-[60vw] md:ml-[20vh]"
        data-aos="fade-left"
        data-aos-duration="700"
      >
        <h1 className="font-poppins font-bold text-3xl  md:text-6xl">
          50+ Beautiful Idols & Statues
        </h1>
        <p className="mt-4 mb-6 text-lg hidden md:block">
          Immerse yourself in the exquisite craftsmanship and timeless elegance
          showcased in our carefully selected pieces. Whether you're an art
          enthusiast, a collector, or simply appreciate the aesthetic appeal of
          sculptures, our diverse array of idols and statues is sure to
          captivate your senses.
        </p>
        <p className="mt-4 mb-6 text-lg md:hidden">
          Immerse yourself in the exquisite craftsmanship and timeless elegance
          showcased in our carefully selected pieces.{" "}
        </p>
        <Link href="/shop">
          <button className="bg-[#60482D] text-white font-bold rounded-md py-2 px-6 md:py-3 md:px-8">
            SHOP NOW!
          </button>
        </Link>
      </div>
      <div 
        className="slide-container md:w-[70vh] w-[50vh] overflow-hidden  md:mr-[10vh]"
        data-aos="fade-right"
        data-aos-duration="700"
      >
        <Zoom scale={0.4}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.source}
              className="object-cover md:h-[80vh] h-[50vh] mx-auto"
              alt={`Inspiration ${image.id}`}
            />
          ))}
        </Zoom>
      </div>
    </div>
  );
};

export default Inspirations;
