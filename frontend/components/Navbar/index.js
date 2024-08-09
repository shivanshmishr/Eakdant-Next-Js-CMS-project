import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";
import BackdropLoader from "../elements/BackdropLoader";
import { getCookie, getCookies } from "cookies-next";

const Navbar = () => {
  const { totalQuantities } = useStateContext();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authToken = getCookie("auth_token");
  // console.log(authToken);
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <div className="bg-white shadow-md mb-[0.5vh] static">
      <BackdropLoader open={loading} />
      <div className="p-[2vh] w-[%] md:w-[90%] mx-auto flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div
            onClick={toggleMobileNav}
            className="md:hidden mr-[2vh] cursor-pointer"
          >
            <MenuIcon className="text-[5vh] text-amber-950" />
          </div>

          <Link href="/">
            <img src="/favicon.ico" className="w-[13vh]" alt="" />
          </Link>
        </div>

        <div className="navlinks list-none flex flex-row gap-x-[4vh]">
          <Link href="/">
            <li className="text-[2.7vh] font-semibold ">Home</li>
          </Link>
          <Link href="/about">
            <li className="text-[2.7vh] font-semibold">About</li>
          </Link>
          <Link href="/shop">
            <li className="text-[2.7vh] font-semibold">Shop</li>
          </Link>
          <Link href="/contact">
            <li className="text-[2.7vh] font-semibold">Contact</li>
          </Link>
        </div>
        <div className="list-none flex flex-row items-center gap-x-[2vh] md:gap-x-[4vh]">
          {authToken ? (
            <Link href="/myaccount">
              <Person2Icon className="cursor-pointer text-amber-800 text-[4.5vh]" />
            </Link>
          ) : (
            <Link href="/login">
              <span className="text-center px-[5vh] rounded-sm font-semibold shadow-md hover:scale-125 transition-all hover:bg-[#B88E2F] hover:text-[#f5f4f4] w-fit py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] ">
                Login
              </span>
            </Link>
          )}

          <Link href="/shop">
            <SearchIcon className="cursor-pointer text-amber-800 text-[4.5vh]" />
          </Link>

          {/* <FavoriteIcon className="cursor-pointer text-red-500 text-[4.5vh]" /> */}
          <Link href="/checkout">
            <div className="relative">
              <p className="w-[4vh] h-[4vh] -top-[2vh] left-[2vh] bg-yellow-950 text-white rounded-full flex flex-row justify-center items-center absolute">
                {totalQuantities}
              </p>
              <ShoppingBagIcon className="cursor-pointer text-orange-300 text-[4.5vh]" />
            </div>
          </Link>
        </div>

        <div
          className={`navlinks-mobile md:hidden fixed z-50 h-[100vh] w-[80%] top-0  bg-amber-100 flex flex-col items-center transition-transform duration-500 ease-in-out  ${
            mobileNavOpen ? "-translate-x-[5vh]" : "-translate-x-[100vw]"
          }`}
        >
          <div
            onClick={toggleMobileNav}
            className=" cursor-pointer ml-[22vh] p-[4vh]"
          >
            <CloseIcon className="text-[5vh] text-amber" />
          </div>
          <ul className="flex flex-col  text-gray-700  gap-x-[3vh]">
            <Link href="/" onClick={toggleMobileNav}>
              <li className="text-[3vh] my-[2vh] font-medium focus:underline">
                Home
              </li>
            </Link>
            <Link href="/about" onClick={toggleMobileNav}>
              <li className="text-[3vh] my-[2vh] font-medium">About</li>
            </Link>
            <Link href="/shop" onClick={toggleMobileNav}>
              <li className="text-[3vh] my-[2vh] font-medium">Shop</li>
            </Link>
            <Link href="/contact" onClick={toggleMobileNav}>
              <li className="text-[3vh] my-[2vh] font-medium">Contact</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
