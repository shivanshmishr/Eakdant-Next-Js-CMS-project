import React from "react";
import HeroBanner from "../components/HomeSection/HeroBanner";
import HomeSaleAd from "../components/HomeSection/HomeSaleAd";
import { ProductCard } from "../components";
import Link from "next/link";
import Inspirations from "../components/HomeSection/Inspirations";
import { NewArrivalSale } from "../components/HomeSection/NewArrivalSale";

export default function Home({ products }) {
  const productsArray = products.data.slice(0, 8);
  console.log("Products received:", products);

  return (
    <div>
      <HeroBanner />
      <HomeSaleAd />
      <div>
        <h1 className="text-center font-poppins font-bold md:text-[6vh] my-[3vh] text-[3vh]">
          Our Murtis
        </h1>
        <div className="md:w-[80%] w-[90%] overflow-hidden mx-auto flex flex-wrap  md:my-[5vh] md:flex-row justify-center items-center gap-[2vh] md:gap-[5vh]  ">
          {productsArray.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Link href="/shop">
          <p className="text-center my-[2vh] font-semibold shadow-md hover:scale-125 transition-all hover:bg-[#B88E2F] hover:text-[#f5f4f4] mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] w-[35vw] md:w-[10vw]">
            Show More
          </p>
        </Link>
      </div>
      <Inspirations />
      <NewArrivalSale />
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
