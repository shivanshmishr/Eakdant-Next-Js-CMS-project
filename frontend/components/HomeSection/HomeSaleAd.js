import React ,{ useEffect } from "react";
import Link from "next/link";
import "aos/dist/aos.css";
import AOS from "aos";

const HomeSaleAd = () => {
  
  useEffect(() => {
    AOS.init({});
    // Add event listeners for updates
    AOS.refresh();
    // Clean up on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  return (
    <div className="m-[2vh] md:m-[15vh] shadow-lg p-[2vh] rounded-md md:shadow-none ">
      <h1 className="text-center font-poppins font-bold md:text-[6vh] text-[3vh]">
        Browse The Range
      </h1>
      <p className="text-[#666666] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="flex flex-row md:space-x-6 justify-center items-center py-[2vh] md:py-0">
        <img
          src="/sale1.jpg"
          className="w-[25vw] h-fit hidden md:block"
          alt="sale"
          data-aos="fade-left"
          
        />

        <div className="flex flex-col items-center justify-between space-y-1 md:space-y-3 overflow-hidden">
          <img src="/sale2.jpg"  data-aos="fade-up" className="md:w-[30vw] " alt="sale" />

          <div data-aos="zoom-in">
            <h1 className="text-center font-poppins  md:text-[10vh] text-[4vh] leading-none">
              ULTIMATE
            </h1>
            <h1 className="text-center  font-bold md:text-[6vh] text-[3vh]">
              SALE
            </h1>
            <p className="text-[#484848] text-center">NEW COLLECTION</p>
          </div>
            <Link href="/shop">
              <button className="bg-[#070707]  text-white font-bold  w-full  md:w-[12vw] rounded-md py-[1vh] md:py-[2vh] px-[3vh]">
                SHOP NOW!
              </button>
            </Link>
          <img src="/sale3.jpg"  data-aos="fade-down" className="md:w-[30vw] !mt-[2vh] " alt="sale" />
        </div>

        <img
          src="/sale4.jpg"
          className="w-[25vw]  h-fit hidden md:block"
          alt="sale"
          data-aos="fade-right"
        />
      </div>
    </div>
  );
};

export default HomeSaleAd;
