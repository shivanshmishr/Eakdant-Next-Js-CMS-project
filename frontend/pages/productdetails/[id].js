import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ShareIcon from "@mui/icons-material/Share";
import { useStateContext } from "@/context/StateContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getCookie } from "cookies-next";

export default function ProductDetails({ product }) {
  const authToken = getCookie('auth_token');

  // console.log("Product received in ProductDetails:", product);

  if (!product || !product.data) {
    return <div>Loading...</div>;
  }

  const { name, images, description, price,size } = product.data;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: description,
          url: window.location.href,
        });
      } else {
        console.log("Web Share API not supported");
        // Fallback for browsers that do not support Web Share API
        // You can implement your custom sharing logic here
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const { onAdd, qty } = useStateContext();

  const addToCart = () => {
    // if (!selectedSize) {
    //   toast.error("Please select size!");
    // } else {
    //   onAdd({ ...product, selectedSize }, qty);
    // }
    onAdd({ ...product, selectedSize }, qty);
  };
  const [selectedSize, setSelectedSize] = useState(null)


  return (
    <div className="md:mx-[15vh] m-[5vh] md:my-10  flex md:flex-row flex-col gap-x-[3vh]">
      <div className="flex flex-col-reverse md:flex-row md:space-x-4">
        <div className="flex flex-row   items-center overflow-hidden md:flex-col ">
          {images.map((image, index) => (
            <img
              key={index}
              className={`md:h-[20vh] cursor-pointer md:w-[18vh] w-[10vh] object-cover ${
                index !== 0 ? "ml-[2vh] my-[2vh] md:ml-[0vh]" : ""
              }`}
              src={image}
              alt={name}
              onMouseEnter={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="relative md:w-[40vw]">
          {/* {selectedImage && (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Product Image",
                  isFluidWidth: true,
                  src: selectedImage,
                },
                largeImage: {
                  src: selectedImage,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          )} */}
          <div
            onClick={handleShare}
          >
            <ShareIcon className="cursor-pointer absolute p-[1.2vh] bg-[#ffffffd4] rounded-full top-4 right-4 text-black text-[6vh] " />
          </div>
          {selectedImage && (
            <img
              className="md:w-[70vw] md:h-[70vh] object-cover object-top"
              src={selectedImage}
              alt={name}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:ml-[2vh] md:w-[50vw]">
        <h1 className="md:text-[5vh] text-[3vh] text-[#303030] font-medium ">
          {name}
        </h1>
        <p className="md:text-[3vh] font-medium  text-[#4c4b4b]">
          {description}
        </p>
        <div className="flex flex-row space-x-4">
          <p className=" text-[3vh] text-[#7a7979] font-bold font-poppins">
            Rs.{price}
          </p>
          <p className=" text-[3vh] text-[#ed6969] font-bold font-poppins line-through">
            Rs.{price}
          </p>
        </div>
        <div>
          <h1 className=" text-[2.5vh] text-[#878787] font-semibold font-poppins">
            Size
          </h1>
          <div className="flex flex-row space-x-4 my-[1vh]">
            <button onClick={() => setSelectedSize("size")} className={`bg-[#F9F1E7] p-[2vh] ${selectedSize ? "border-2 border-black" : ""}`}>{size}</button>
          </div>
         
        </div>
      
        <div className="flex flex-row space-x-5">
          <button  onClick={addToCart} className="md:px-[4.8vh] md:py-[1.2vh] px-[2vh] py-[1vh] shadow-sm md:text-[2.8vh] rounded-xl border-[0.3vh] border-[#2424248f] text-[#242424] hover:scale-105 ">
            Add To Cart
          </button>
          <Link href="/checkout">
          <button onClick={addToCart} className="md:px-[5.5vh] md:py-[1.3vh] px-[3vh] py-[1vh] shadow-md font-semibold md:text-[3vh] rounded-xl  text-[#fef8f8] bg-[#B88E2F] hover:scale-105">
            Buy Now!
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    console.log("ID parameter recieved", id);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/get-product/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      props: {
        product: null,
        error: "Failed to fetch product details",
      },
    };
  }
}
