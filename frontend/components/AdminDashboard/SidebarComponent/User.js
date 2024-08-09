import { useState } from "react";
import { getCookie, getCookies, setCookie } from "cookies-next";
import CloseIcon from "@mui/icons-material/Close";

export const User = ({ userdetail }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = getCookie("auth_token");
  // console.log("User data33 : ", userdetail);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleview = async (userID) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const token = getCookie("auth_token");
      const response = await fetch(`${apiUrl}/get-user-details/${userID}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const userdetail = await response.json();
      console.log("User details fetched successfully:", userdetail);

      if (userdetail.status && userdetail.data) {
        setSelectedUser(userdetail.data);
        openModal();
      } else {
        throw new Error("User data is invalid or missing");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <table className="table-auto w-full ">
        <thead>
          <tr className="bg-[#fde2a4e0] p-[1vh] border-black text-[2.5vh] ">
            <th className="border border-black px-4 py-2">Sr No.</th>
            <th className="border border-black px-4 py-2">User ID</th>
            <th className="border border-black px-4 py-2">First name</th>
            <th className="border border-black px-4 py-2">Last name</th>
            <th className="border border-black px-4 py-2">Mobile No.</th>
            <th className="border border-black px-4 py-2">Email</th>
            <th className="border border-black px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userdetail.data &&
            userdetail.data.map((userdetail, index) => (
              <tr key={userdetail._id}>
                <td className="border border-black px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {userdetail._id.slice(0, 5)}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {userdetail.first_name}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {userdetail.last_name}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {userdetail.mobile_number}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {userdetail.email}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  <button
                    onClick={() => handleview(userdetail._id)}
                    className="bg-[#fcfcfc]  text-[#141414] font-semibold shadow-md  font-poppins w-fit hover:scale-110 transition-all hover:bg-[#1c1c1c] hover:text-white py-[0.5vh] px-[2vh] border-[0.2vh] border-black my-[1vh]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative w-[50vw] h-auto p-[5vh] rounded-lg overflow-x-auto">
            <h2 className="text-[3.5vh] text-amber-950 text-center font-semibold mb-[2vh]">
              User Detail
            </h2>
            <h1
              onClick={closeModal}
              className="absolute right-[2vh] top-[2.5vh] text-red-600 cursor-pointer"
            >
              <CloseIcon className="text-[5vh]" />
            </h1>
            <div className="flex flex-col p-[3vh] shadow-md">
              <div className="flex flex-row items-center space-x-5 text-[2.8vh]">
                <img
                  src="/userimg.jpg"
                  className="w-[10vw] border-[0.1vh] shadow-xl rounded-full"
                  alt="user-profile-image"
                />
                <div className="flex flex-col space-y-[1vh]">
                <p>
                  <span className="font-medium">Name : </span>{" "}
                  <span> {selectedUser?.first_name} {selectedUser?.last_name}</span>
                </p>
                <p>
                  <span className="font-medium">Mobile No. : </span>{" "}
                  <span> {selectedUser?.mobile_number}</span>
                </p>
                <p>
                  <span className="font-medium">Email-id : </span>{" "}
                  <span> {selectedUser?.email} </span>
                </p>
                
                </div>
              </div>
              <div className="flex flex-col space-y-2 text-[2.5vh] text-[#372e14]">
                <h1 className="text-[3vh] py-[2vh] mt-[5vh] rounded-xl shadow-sm text-center bg-amber-50">
                  Address Details
                </h1>
                <p>
                  <span className="font-medium">Address : </span>{" "}
                  <span> {selectedUser.address} </span>
                </p>
                <p>
                  <span className="font-medium">Pincode : </span>{" "}
                  <span> {selectedUser.pincode} </span>
                </p>
                <p>
                  <span className="font-medium">City : </span>{" "}
                  <span> {selectedUser.city} </span>
                </p>
                <p>
                  <span className="font-medium">State : </span>{" "}
                  <span> {selectedUser.state} </span>
                </p>
                <p>
                  <span className="font-medium">Country : </span>{" "}
                  <span> {selectedUser.country} </span>
                </p>
             
             
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
