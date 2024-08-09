import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import TextField from "@mui/material/TextField";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";

const MyAccount = () => {

  useEffect(() => {
    AOS.init({});
    AOS.refresh();
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    city: "",
    country: "",
    address: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const UserDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const token = getCookie("auth_token");

        if (!token) {
          console.log("User not authenticated");
          return;
        }

        const userId = sessionStorage.getItem("user_id");

        if (!userId) {
          console.log("User ID not found in session storage");
          return;
        }

        const response = await fetch(`${apiUrl}/get-user-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        // console.log("User Details Fetched Successfully", userData);
        // Set the form data with fetched user details
        setFormData(userData.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    UserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const token = getCookie("auth_token");

      if (!token) {
        console.log("User not authenticated");
        return;
      }

      const userId = sessionStorage.getItem("user_id");

      if (!userId) {
        console.log("User ID not found in session storage");
        return;
      }

      const response = await fetch(`${apiUrl}/edit-profile-details/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      console.log("User Details updated successfully");
      toast.success("User Details updated successfully");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col md:space-x-10 space-y-3">
        <div 
          className="relative md:w-[60vw]"
          data-aos="fade-left"
        >
          <img src="/product1.png" alt="idol-image" className="" />
          <div className="md:w-[20vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-[5vh] shadow-2xl text-center bg-[#0000001b] shadow-black font-bold text-white ">
            My Account
          </div>
        </div>

        <form 
          onSubmit={handleSave} 
          data-aos="fade-right"
          className="flex flex-col w-full mx-auto"
        >
          <div className="flex flex-col w-full space-y-5 justify-between">
            <div>
              <h1 className="text-[3vh] text-[#202020] font-medium">
                Personal Detail
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  margin="normal"
                  name="first_name"
                  type="text"
                  className="md:w-[48%] w-full "
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  margin="normal"
                  name="last_name"
                  type="text"
                  className="md:w-[48%] w-full"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  margin="normal"
                  name="email"
                  type="email"
                  className="md:w-[48%] w-full"
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-basic"
                  label="Phone No."
                  variant="standard"
                  margin="normal"
                  name="mobile_number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="md:w-[48%] w-full "
                />
              </div>
            </div>
            <div>
              <h1 className="text-[3vh] text-[#202020] font-medium mt-[2vh]">
                Billing Detail
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  margin="normal"
                  name="address"
                  type="text"
                  className=" w-full "
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="City"
                  variant="standard"
                  margin="normal"
                  name="city"
                  type="city"
                  className="md:w-[48%] w-full"
                  value={formData.city}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-basic"
                  label="State"
                  variant="standard"
                  margin="normal"
                  name="state"
                  pattern="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="md:w-[48%] w-full "
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="Country"
                  variant="standard"
                  margin="normal"
                  name="country"
                  type="text"
                  className="md:w-[48%] w-full"
                  value={formData.country}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-basic"
                  label="Pin Code"
                  variant="standard"
                  margin="normal"
                  name="pincode"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="md:w-[48%] w-full "
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-center px-[5vh] rounded-sm font-semibold shadow-md hover:scale-125 transition-all hover:bg-[#B88E2F] hover:text-[#f5f4f4] w-fit py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] "
            >
              SAVE!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
