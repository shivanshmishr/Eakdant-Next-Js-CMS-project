import { useEffect, useState } from "react";
import { getCookie, getCookies, setCookie } from "cookies-next";
import CloseIcon from "@mui/icons-material/Close";

export const Order = ({ summary }) => {

  const [modal, setModal] = useState(false);
  const [userData, , setUserData, ] = useState(null);
  const [productData, setProductData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const showModal = () =>{
    setModal(true);
  }

  const closeModal = ()=>{
    setModal(false)
  }

  useEffect(()=>{
    if(summary.data && summary.data.length > 0){
      const UserId = summary.data[0].user_id;
      fetchUserData(UserId);
    }
  });

  const fetchUserData = async(UserId)=>{
    try {
      const token = getCookie("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/get-user-details/${UserId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setUserData(userData);
      console.log("User details fetched",userData);
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  };

  const fetchProductData = async(productId)=>{
    try {
      const token = getCookie("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/get-product/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Product Data fetched", data); // Log product data
        setProductData(data); // Set product data
      }
    } catch (error) {
      console.log("Error fetching product details:", error)
    }
  }

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

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    showModal();
    const productDataPromises = order.items.map((item) =>
      fetchProductData(item.product_id)
    );
    const productDataArray = await Promise.all(productDataPromises);
    console.log("Product Data received", productDataArray);
    setProductData(productDataArray.filter((data) => data !== null));

  };
  
  console.log("Order Details fetched successfully", summary);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {/* <button onClick={OrderSummary}>Get order api</button> */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Status</th>
            {/* <th className="border px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {summary.data && summary.data.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2 text-center">{order._id}</td>
              <td className="border px-4 py-2 text-center">{order.user_id}</td>
              <td className="border px-4 py-2 text-center">{order.order_date}</td>
              <td className="border px-4 py-2 text-center">{order.total_amount}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => {handleViewDetails(order)}}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="w-[80%] relative bg-white p-[2vh] rounded-2xl">
            <h1 className="text-[3.5vh] text-center my-[2vh]">Order Details</h1>

            <h1
              onClick={closeModal}
              className="absolute right-[2vh] top-[2.5vh] text-red-600 cursor-pointer"
            >
              <CloseIcon className="text-[5vh]" />
            </h1>

            <div className="mb-[10vh] bg-[#fcfaf6] p-[2.5vh]" key={selectedOrder._id}>
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-[3vh] font-semibold text-amber-950">
                  Order ID: <span className="font-normal">{selectedOrder._id}</span>
                </h2>
                {userData && (
                  <h2 className="text-[3vh] font-semibold text-amber-950">
                    User Name: <span className="font-normal">{userData.username}</span>
                  </h2>
                )}
                <div>
                  <button
                    className="text-center px-[2vh] my-[2vh] font-semibold shadow-md hover:scale-110 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] mr-[2vh]"
                  >
                    Download Invoice
                  </button>
                  <button>
                    {selectedOrder.status}
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-[5vh]">
                <p className="text-[3vh] font-semibold text-green-800">
                  Estimated Delivery: <span className="font-normal">{formatDate(selectedOrder.order_date).estimatedDeliveryDate}</span>
                </p>
                <p className="text-[3vh] font-semibold text-amber-950">
                  Order Date: <span className="font-normal">{formatDate(selectedOrder.order_date).orderDate}</span>
                </p>
              </div>

              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row w-[95%] mx-auto my-[1vh]"
                >
                  {productData && productData[index] && (
                    <img
                      className="w-[15vh] h-[18vh] object-cover mr-[4vh] p-[0.2vh] bg-[#111]"
                      src={productData[index].images[0]} // Assuming productData contains image URLs
                      alt={productData[index].name} // Assuming productData contains product names
                    />
                  )}
                  <div className="flex flex-row justify-between">
                    <div className="w-[55vw] ">
                      <p className="text-[3vh] font-medium text-amber-950">{productData && productData[index] && productData[index].name}</p>
                      <p className="text-[2.5vh] text-amber-950 my-[0.5vh]">{productData && productData[index] && productData[index].description}</p>
                    </div>
                    <div>
                      <p className="text-[2.7vh] font-semibold text-amber-900">
                        Qty: <span className="font-medium">{item.quantity}</span>
                      </p>
                      <p className="my-[1vh] text-[2.6vh]">MRP: Rs.{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-[3vh] text-right font-medium mr-[5vh]">
                Total Amount: &nbsp;&nbsp;<span className="font-normal">Rs.{selectedOrder.total_amount}</span>
              </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};
