"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SignUp = () => {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
    confirmPassword: "",
  });

  const [error,setError]= useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = (variant) => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform client-side validation
    if (!formData.password || !formData.confirmPassword) {
      setError("Password is required");
      toast.error("Password is required")
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Password do not match")
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully!",formData)
        toast.success("User registered successfully!");
        setFormData({
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
          confirmPassword: "",
        });
        Cookies.set("userData", formData);
        router.push("/login");

      } else if (response.status === 409) {
        toast.warning("User already exists");
      } else {
        toast.error("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="mx-[6vh]">
      <h1 className="text-[4vh] mb-[1.5vh] font-semibold text-[#313131]">
        Create Account
      </h1>

      <form onSubmit={handleCreateAccount}>
        <div className="flex flex-row gap-[1vh]">
          <TextField
            id="outlined-basic"
            label="Enter First Name"
            variant="outlined"
            className="w-full my-[1vh]"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <TextField
            id="outlined-basic"
            label="Enter Last Name"
            variant="outlined"
            className="w-full my-[1vh]"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-row gap-[1vh]">
          <TextField
            id="outlined-basic"
            label="Enter Email Address"
            variant="outlined"
            className="w-full my-[1vh]"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter Mobile Number"
            variant="outlined"
            className="w-full my-[1vh]"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-row gap-x-[1.5vh]">
          <FormControl className="w-full my-[1vh]" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Create Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl className="w-full my-[1vh]" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
        </div>

        <div className="flex flex-row gap-x-[1.5vh]">
          <TextField
            id="outlined-basic"
            label="Enter City"
            variant="outlined"
            className="w-full my-[1vh]"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter Pincode"
            variant="outlined"
            className="w-full my-[1vh]"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Enter Address"
            variant="outlined"
            className="w-full my-[1vh]"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-row gap-x-[1.5vh]">
          <TextField
            id="outlined-basic"
            label="Enter State"
            variant="outlined"
            className="w-full my-[1vh]"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter Country"
            variant="outlined"
            className="w-full my-[1vh]"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="bg-[#422c12] active:bg-[#291b0b] w-full my-[1vh] h-[7vh] rounded-md"
          type="submit"
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="secondary"
              sx={{ color: "#fff" }}
            />
          ) : (
            <p className="text-white text-[2.9vh]">CreateAccount</p>
          )}
        </button>
      </form>

      <h1 className="text-center text-[2.7vh] my-[3vh]">
        Already have an Account?{" "}
        <Link href="/login">
          <span className="font-semibold text-[#422c12]">Log in</span>
        </Link>
      </h1>

      {/* <div className="mt-[5vh]">
        <div className="relative">
          <hr className="h-[0.5vh]" />
          <p className="text-center absolute text-gray-500 font-medium text-[2.6vh] -top-[2vh] left-[42%] bg-white px-[1vh]">
            Sign up with
          </p>
        </div>

        <div className="flex flex-row justify-center items-center gap-x-[2vh] mt-[4vh] bg-orange-100 py-[1vh] rounded-lg shadow-md">
          <img src="/google.png" className="w-[3.7vh] h-[3.7vh]" alt="" />
          <p className="text-[2.7vh] font-semibold text-gray-700">
            Continue with Google
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default SignUp;
