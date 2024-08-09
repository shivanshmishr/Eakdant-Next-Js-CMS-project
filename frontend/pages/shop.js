// "use client"
import React from "react";
import { ProductCard } from "../components";

export default function Shop({ products }) {
  // console.log("Products received:", products);

  const productsArray = products.data;

  if (!Array.isArray(productsArray)) {
    console.error("Products is not an array:", productsArray);
    return <div>Error: Products data is not in expected format</div>;
  }

  if (productsArray.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="">
      <div className="bg-[url('/backgroundbanner.webp')] md:bg-cover  md:bg-center bg-cover bg-no-repeat bg-center h-[9vh] md:h-[35vh]  flex justify-center items-center ">
        <p className=" md:text-[7vh] text-[3vh] shadow-xl text-white font-semibold text-center align-middle ">Shop</p>
      </div>
      <h2 className=" md:text-[6vh] mt-[5vh] font-bold font-sans text-[3vh] text-center align-middle text-[#3A3A3A]">Our Murtis</h2>

      <div className="flex flex-wrap my-[2vh] md:my-[5vh] md:flex-row justify-center items-center gap-[2vh] md:gap-[5vh]  ">
        {productsArray.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/get-all-products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    return {
      props: {
        products: products || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        error: "Failed to fetch products",
      },
    };
  }
}
