import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import BackdropLoader from "../elements/BackdropLoader";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const [ordersWithProductDetails, setOrdersWithProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      const token = getCookie("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/get-user-order/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const ordersData = data.data;
        const ordersWithProductDetails = await Promise.all(
          ordersData.map(async (order) => {
            const productDetails = await Promise.all(
              order.items.map(async (item) => {
                const productResponse = await fetch(
                  `${apiUrl}/get-product/${item.product_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (productResponse.ok) {
                  const productData = await productResponse.json();
                  console.log("Product Fetched", productData);
                  return { ...productData.data, quantity: item.quantity };
                } else {
                  console.error(
                    `Failed to fetch product details for product ${item.product_id}`
                  );
                  return null;
                }
              })
            );

            return { ...order, products: productDetails };
          })
        );
        setOrdersWithProductDetails(ordersWithProductDetails);
        setIsLoading(false);
        console.log(
          "User Orders details fetched Successfully",
          ordersWithProductDetails
        );
      } else {
        console.log("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const orderDate = new Date(dateString);
    const estimatedDeliveryDate = new Date(orderDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);
    return {
      orderDate: orderDate.toLocaleString(undefined, options),
      estimatedDeliveryDate: estimatedDeliveryDate.toLocaleString(
        undefined,
        options
      ),
    };
  };

  const handleDownload = () => {
    toast.error("Invoice not available!");
  };

  return (
    <div>
      {/* <h1 className='text-center text-[4.5vh]'>Order History</h1> */}
      {isLoading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center">
          <CircularProgress size={30} className="text-amber-950" />
        </div>
      ) : // <h1>My Recent Orders</h1>

      ordersWithProductDetails.length > 0 ? (
        ordersWithProductDetails.map((order) => (
          <div
            className="mb-[10vh] shadow-lg bg-[#fcfaf6] p-[2.5vh]"
            key={order._id}
          >
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-[3vh] font-semibold text-amber-950">
                Order ID: <span className="font-normal"> #{order._id}</span>
              </h2>
              <div>
                {/* <button
                  className="text-center px-[2vh] my-[2vh] font-semibold shadow-md hover:scale-110 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] mr-[2vh]"
                  onClick={handleDownload}
                >
                  {" "}
                  Download Invoice
                </button> */}
                <button
                  className={`text-center px-[2vh] my-[2vh] font-semibold shadow-md hover:scale-110 transition-all mx-auto py-[1vh] border-[0.3vh] mr-[2vh] ${
                    order.status === "Delivered"
                      ? "bg-green-700 text-white hover:bg-green-700 border-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-700 text-white hover:bg-red-700 border-red-700"
                      : "text-[#ffffff] border-[#ffa230] bg-[#ffa230] hover:text-white"
                  }`}
                >
                  {" "}
                  {order.status}
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-[5vh]">
              <p className="text-[3vh] font-semibold text-green-800">
                Estimated Delivery:{" "}
                <span className="font-normal">
                  {formatDate(order.order_date).estimatedDeliveryDate}
                </span>{" "}
              </p>
              <p className="text-[3vh] font-semibold text-amber-950">
                Order Date:{" "}
                <span className="font-normal">
                  {" "}
                  {formatDate(order.order_date).orderDate}
                </span>{" "}
              </p>
            </div>

            {/* <p>Price: {order.product.price}</p> */}
            {order.products.map((product, index) => (
              <div
                key={index}
                className="flex flex-row w-[95%] mx-auto my-[1vh]"
              >
                <img
                  className="w-[15vh] h-[18vh] object-cover mr-[4vh] p-[0.2vh] bg-[#111]"
                  src={product.images}
                  alt={product.name}
                />
                <div className="flex flex-row justify-between">
                  <div className="w-[55vw] ">
                    <p className="text-[3vh] font-medium text-amber-950">
                      {product.name}
                    </p>
                    <p className="text-[2.5vh] text-amber-950 my-[0.5vh]">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-[2.7vh] font-semibold text-amber-900">
                      Qty:{" "}
                      <span className="font-medium">{product.quantity}</span>{" "}
                    </p>
                    <p className="my-[1vh] text-[2.6vh]">
                      MRP: Rs.{product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[3vh] text-right font-medium mr-[5vh]">
              Total Amount: &nbsp;&nbsp;
              <span className="font-normal">Rs.{order.total_amount}</span>{" "}
            </p>
          </div>
        ))
      ) : (
        <div className="h-auto ">
          <p className="text-[3.4vh] font-medium text-amber-950 text-center my-[2vh]">
            Your have no Recent Orders!
          </p>
          <Link href="/shop">
            <p className="text-center my-[2vh] font-semibold shadow-md hover:scale-125 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] w-[35vw] md:w-[15vw]">
              Continue Shopping
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
