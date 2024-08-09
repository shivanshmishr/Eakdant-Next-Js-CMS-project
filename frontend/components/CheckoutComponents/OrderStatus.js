import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { getCookie } from "cookies-next";
import ordersuccess from "../../public/orderplaced.json";

export const OrderStatus = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("Fetching");
      try {
        const userId = sessionStorage.getItem("user_id");
        const token = getCookie("auth_token");
        if (!userId) {
          throw new Error("User ID not found in session storage");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${apiUrl}/get-user-details/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        console.log("User data fetched", userData);
        setEmail(userData.data.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="">
      <div className=" rounded-[3vh] w-[70%] mx-auto">
        <Lottie
          animationData={ordersuccess}
          loop={false}
          className="w-[40vh] mx-auto"
        />
        {/* <button onClick={fetchUserDetails}>hg</button> */}
        <h1 className="text-[4.5vh] font-bold text-amber-900 mb-[2vh] text-center">
          Thank You for Order
        </h1>
        <p className=" text-amber-950 text-[2.8vh] text-center">
          Your Order Updates will be shared on your registered email address
        </p>
        <p className="text-center text-[3vh] font-semibold text-green-800 my-[2vh]">
          {email}
        </p>
        <p className="text-gray-900 font-semibold text-[2.8vh] mt-[3vh] text-center">
          Thank You, Do visit Again
        </p>
        <Link href="/shop">
          <p className="text-center my-[3vh] font-semibold shadow-md hover:scale-125 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] w-[35vw] md:w-[15vw]">
            Continue Shopping
          </p>
        </Link>
      </div>
    </div>
  );
};
