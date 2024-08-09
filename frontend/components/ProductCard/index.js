import React from "react";
import Link from "next/link";
import { Skeleton } from "@mui/material";

const ProductCard = ({ product }) => {
  const { _id, name, images, description, price } = product;

  if (!name || !images || !description || !price) {
    return (
      <div className="relative bg-gray-100 shadow-lg w-[19vh] md:w-[35vh]">
        <Skeleton variant="rectangular" width="100%" height={250} />

        <div className="flex flex-col space-y-2 py-[1vh] px-[1vh]">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="70%" />
        </div>
      </div>
    );
  }

  const truncatedDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  const truncatedName = name.length > 15 ? name.substring(0, 15) + "..." : name;

  return (
    <Link href="/productdetails/[id]" as={`/productdetails/${_id}`}>
      <div className="relative cursor-pointer bg-gray-100 shadow-lg w-[19vh] md:w-[35vh] md:h-[64vh]">
        <div >
          <img
            src={images[0]}
            className="md:h-[44vh] md:w-[35vh] w-[20vh] h-[20vh] object-cover"
          />
        </div>

        <p className="absolute z-20 top-[2vh] right-[2vh] text-white bg-red-500 md:w-[6vh] w-[4vh] h-[4vh] md:h-[6vh] rounded-full flex flex-row justify-center items-center">
          30%
        </p>
        <div className="flex flex-col md:space-y-2 md:py-[2vh] space-y-1 py-[1vh]">
          <h1 className="px-[1vh]  md:text-[2.8vh] text-[#111] font-semibold ">
            {truncatedName}
          </h1>
          <p className="pl-[1vh] md:text-[2.1vh] text-gray-600 font-normal ">
            {truncatedDescription}
          </p>
          <div className="flex flex-row justify-between items-center px-[1vh] ">
            <p className="md:text-[2.5vh] font-semibold">Rs.{price}</p>
            <p className="line-through text-red-500 md:text-[2vh]">Rs.3500</p>
          </div>
        </div>
        {/* <div className="onhover flex flex-col items-center p-[1vh]">
        <button className="bg-white text-[#B88E2F] w-full py-[1vh] text-[2.6vh] font-semibold">
          Add to Cart
        </button>
      </div> */}
      </div>
    </Link>
  );
};

export default ProductCard;
