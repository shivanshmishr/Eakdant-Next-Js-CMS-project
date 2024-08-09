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
import { Password } from "@mui/icons-material";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const loginResponse = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        
        // Store user ID and token in session storage
        sessionStorage.setItem("user_id", loginData.data._id);
        sessionStorage.setItem("auth_token", loginData.data.token);
        
        // Set auth token as cookie
        setCookie("auth_token", loginData.data.token, {
          path: "/",
        });
  
        if (loginData.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
        toast.success("Login successful");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in, Try Signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-[6vh]">
      <h1 className="text-[4vh] font-semibold text-[#313131] text-center">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter Email Address"
          variant="outlined"
          className="w-full my-[2vh]"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormControl className="w-full my-[2vh]" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter Password
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
          />
        </FormControl>

        <button
          className="bg-[#422c12] active:bg-[#291b0b] w-full h-[7vh] rounded-md"
          type="submit"
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="secondary"
              sx={{ color: "#fff" }}
            />
          ) : (
            <p className="text-white text-[2.9vh]">Login</p>
          )}
        </button>
      </form>

      <h1 className="text-center text-[2.7vh] my-[3vh]">
        Didn't have an Account ?{" "}
        <Link href="/signup">
          <span className="font-semibold text-[#422c12]">Sign Up</span>
        </Link>
      </h1>

      {/* <div className="mt-[5vh]">
        <div className="relative">
          <hr className="h-[0.5vh]" />
          <p className="text-center absolute text-gray-500 font-medium text-[2.6vh] -top-[2vh] left-[42%] bg-white px-[1vh]">
            Log in with
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

export default Login;
