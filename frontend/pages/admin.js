import React from "react";
import Sidebar from "../components/AdminDashboard/Sidebar";

export default function AdminPanel({ products, orderdetail, userdetail }) {
  // console.log("User datadd : ", userdetail);
  return (
    <div className="bg-[#fffffff8]">
      <Sidebar products={products} orderdetail={orderdetail} userdetail = {userdetail} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let products = [];
  let orderdetail = null;
  let userdetail = [];

  const { req } = context;
  const { auth_token } = req.cookies;

  if (!auth_token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  try {
    const apiUrlProducts =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/get-all-products";
    const apiUrlOrders =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/get-all-orders";
    const apiUrlUserdetail =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/get-all-users";

    const [productsResponse, ordersResponse, userdetailResponse] =
      await Promise.all([
        fetch(apiUrlProducts),
        
        fetch(apiUrlOrders, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth_token}`,
          },
        }),
        fetch(apiUrlUserdetail, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`,
          },
        }),
      ]);

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    if (!ordersResponse.ok) {
      throw new Error("Failed to fetch orders");
    }
    if (!userdetailResponse.ok) {
      throw new Error("Failed to fetch user details");
    }

    products = await productsResponse.json();
    orderdetail = await ordersResponse.json();
    userdetail = await userdetailResponse.json();

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      products: products || [],
      orderdetail: orderdetail || null,
      userdetail: userdetail || [],
    },
  };
}
