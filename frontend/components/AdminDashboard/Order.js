import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import CloseIcon from "@mui/icons-material/Close";

export const Order = ({ orderdetail }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productDetails, setProductDetails] = useState([]);

  const token = getCookie("auth_token");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchProductDetails = async (items) => {
    try {
      const token = getCookie("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const productDetailsArray = [];

      for (const item of items) {
        const response = await fetch(
          `${apiUrl}/get-product/${item.product_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const productData = await response.json();
        console.log("Product details fetched successfully:", productData);

        if (productData.status && productData.data) {
          productDetailsArray.push(productData.data);
        } else {
          throw new Error("Product data is invalid or missing");
        }
      }

      setProductDetails(productDetailsArray);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleview = async (orderId) => {
    try {
      const token = getCookie("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/get-order-details/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const orderDetailsData = await response.json();
      console.log("Order details fetched successfully:", orderDetailsData);

      if (orderDetailsData.status && orderDetailsData.data) {
        setSelectedOrder(orderDetailsData.data);
        await fetchProductDetails(orderDetailsData.data.items);
        openModal();
      } else {
        throw new Error("Order data is invalid or missing");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-[#fde2a4e0] p-[1vh] border-black text-[2.5vh] ">
            <th className="border border-black px-4 py-2">Sr No.</th>
            <th className="border border-black px-4 py-2">Order ID</th>
            <th className="border border-black px-4 py-2">User ID</th>
            <th className="border border-black px-4 py-2">Date</th>
            <th className="border border-black px-4 py-2">Total</th>
            <th className="border border-black px-4 py-2">Status</th>
            <th className="border border-black px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderdetail &&
            orderdetail.data.map((orderdetail, index) => (
              <tr key={orderdetail._id}>
                <td className="border border-black px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {orderdetail._id.slice(0, 10)}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {orderdetail.user_id.slice(0, 10)}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {new Date(orderdetail.order_date).toLocaleString()}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  Rs. {orderdetail.total_amount}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {orderdetail.status}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  <button
                    onClick={() => handleview(orderdetail._id)}
                    className="bg-[#fcfcfc]  text-[#141414] font-semibold shadow-md  font-poppins w-fit hover:scale-110 transition-all hover:bg-[#1c1c1c] hover:text-white py-[0.5vh] px-[2vh] border-[0.2vh] border-black my-[1vh]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && selectedOrder && productDetails && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative w-[50vw]  p-[5vh] rounded-lg h-auto">
            <h2 className="text-[3.5vh] text-amber-950 text-center font-semibold mb-[2vh]">
              Order Detail
            </h2>
            <h1
              onClick={closeModal}
              className="absolute right-[2vh] top-[2.5vh] text-red-600 cursor-pointer"
            >
              <CloseIcon className="text-[5vh]" />
            </h1>
            <div className="flex flex-col  space-y-5 text-[2.8vh] text-[#464646] overflow-y-scroll h-[60vh]">
              <p>
                <span className="font-semibold">Order ID : </span>{" "}
                <span> {selectedOrder?._id} </span>
              </p>
              <p>
                <span className="font-semibold">User ID : </span>{" "}
                <span> {selectedOrder?.user_id} </span>
              </p>
              <p>
                <span className="font-semibold">Date : </span>{" "}
                <span>
                  {new Date(selectedOrder?.order_date).toLocaleString()}
                </span>
              </p>
              <p>
                <span className="font-semibold">Total : </span>{" "}
                <span>Rs. {selectedOrder?.total_amount}</span>
              </p>
              <p>
                <span className="font-semibold">Status : </span>{" "}
                <span>{selectedOrder?.status}</span>
              </p>

              <div className="flex flex-col space-y-3">
                <p className="font-semibold">Product Ordered : </p>
                <div>
                  {selectedOrder?.items.map((item) => (
                    <div key={item._id} className="flex flex-col space-y-2 ">
                      <p>Product ID: {item.product_id}</p>
                      <p>Quantity: {item.quantity}</p>
                      {/* Price: Rs. {item.price},  */}
                      {/* Subtotal: Rs. {item.subtotal} */}
                    </div>
                  ))}
                </div>
                <div>
                  {productDetails.map((product, index) => (
                    <div
                      key={product._id}
                      className="flex flex-row space-x-2 border-black border-[0.1vh]"
                    >
                      <img
                        className="w-[15vh] h-[22vh] object-cover "
                        src={product.images}
                        alt={product.name}
                      />
                      <div className="flex flex-row justify-between">
                        <div className=" ">
                          <p className="text-[3vh] font-medium text-amber-950">
                            {product.name}
                          </p>
                          <p className="text-[2.5vh] text-amber-950 my-[0.5vh]">
                            {product.description}
                          </p>
                          <p className="text-[2.5vh] text-amber-950 my-[0.5vh]">
                            Size :{product.size}
                          </p>
                          <p className="text-[2.5vh] text-amber-950 my-[0.5vh]">
                            Price : Rs.
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
