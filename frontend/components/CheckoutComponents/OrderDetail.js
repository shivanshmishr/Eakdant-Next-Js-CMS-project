import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import TextField from "@mui/material/TextField";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";

export default function OrderDetail() {

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
    password: "",
  });

  const calculateTotal = () => {
    const shippingCharges = 299;
    const total = totalPrice + shippingCharges;
    return total;
  };
  const [checked, setChecked] = useState(false);

  const { totalPrice } = useStateContext();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fetch User Login Details
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

  // For Saving Details
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
      toast.success("Delivery Details Updated Successfully!!");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <h1 className="text-[4vh] font-semibold my-[4vh] text-center">
        Order Details
      </h1>
      <div className="flex space-x-7 md:flex-row flex-col">
        <form
          className="flex flex-col w-full mx-auto text-[#202020]"
          onSubmit={handleSave}
        >
          <div className="flex flex-col w-full space-y-5  justify-between">
            <div>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="FirstName"
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
                  label="LastName"
                  variant="standard"
                  margin="normal"
                  name="name"
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
                  name="phoneNumber"
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
                  label="Address "
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
              className="text-center px-[3vh] rounded-sm font-semibold shadow-md hover:scale-125 transition-all hover:bg-[#B88E2F] hover:text-[#f5f4f4] w-fit py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] "
            >
              Save Details
            </button>
          </div>
        </form>
        <div className="md:w-[40vw] sticky bg-[#e2e2e2be]  shadow-md flex flex-col justify-center  space-y-4">
          <h1 className="md:text-[3.2vh] text-[#0c0c0c] font-medium underline mx-auto">
            YOUR ORDER
          </h1>
          <div className="mx-auto p-[2vh]">
            <p className="text-lg my-[2vh] ">Sub Total: Rs.{totalPrice}</p>
            <p className="text-lg my-[2vh] ">Shipping Carges: Rs.299</p>
            <p className="text-lg my-[2vh] font-medium">
              Total : Rs.{calculateTotal()}
            </p>
            {/* <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={handleChange} required />
              }
              label="I agree to the terms and conditions"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
