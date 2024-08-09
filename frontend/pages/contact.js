import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { IoIosMail } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { IoIosGlobe } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

export default function contact() {
  useEffect(() => {
    AOS.init({});
    // Add event listeners for updates
    AOS.refresh();
    // Clean up on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormIncomplete = Object.values(formData).some(
      (value) => value === ""
    );
    if (isFormIncomplete) {
      return toast.error("Please fill all details");
    }

    setLoading(true);

    try {
      console.log("Form Data:", formData);
      const response = await fetch("/api/saveContactDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          username: "",
          email: "",
          subject: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        throw new Error("Failed to save form data");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      toast.error("Failed to send messagae. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden ">
      <div className="bg-[url('/backgroundbanner.webp')] md:bg-cover  md:bg-center bg-cover bg-no-repeat bg-center h-[9vh] md:h-[35vh]  flex justify-center items-center ">
        <p className=" md:text-[8vh]  shadow-xl text-white font-semibold  text-[3vh] text-center align-middle ">Contact Us</p></div>
      <div className="flex flex-col-reverse md:flex-row md:justify-evenly justify-center items-center mt-[2vh]">
        <div
          className="flex flex-col space-y-6 p-[6vh] rounded-3xl bg-[#F9F1E7] my-[5vh] shadow-lg"
          data-aos="fade-left"
        >
          <div className="flex flex-row space-x-2 ">
            <IoIosMail className="bg-white text-[#3e3d3d] p-[1vh] text-[5vh] rounded-full" />
            <span className="pt-[1vh]">info@ekdantmurti.com</span>
          </div>
          <div className="flex flex-row space-x-2 ">
            <IoIosCall className="bg-white text-[#3e3d3d] p-[1vh] text-[5vh] rounded-full" />
            <span className="pt-[1vh]">+91 6567816142</span>
          </div>
          <div className="flex flex-row space-x-2 ">
            <IoIosGlobe className="bg-white text-[#3e3d3d] p-[1vh] text-[5vh] rounded-full" />
            <span className="pt-[1vh]">www.ekdantmurti.com</span>
          </div>
          {/* icon */}
          <div className="flex flex-row text-[5vh] text-[#3e3d3d] space-x-7">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
        <form
          className="flex flex-col w-[80%] md:w-[60%]"
          onSubmit={handleSubmit}
          data-aos="fade-right"
        >
          <div className="flex flex-col md:flex-row justify-between">
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              margin="normal"
              name="username"
              type="text"
              className="md:w-[48%] w-full"
              value={formData.username}
              onChange={handleChange}
            />
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
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <TextField
              id="standard-basic"
              label="Subject"
              variant="standard"
              margin="normal"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="md:w-[48%] w-full"
            />
            <TextField
              id="standard-basic"
              label="Phone No."
              variant="standard"
              margin="normal"
              name="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              // maxLength={10}
              maxLength="10"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="md:w-[48%] w-full "
            />
          </div>
          <TextField
            id="standard-basic"
            label="Your Message"
            variant="standard"
            margin="normal"
            name="message"
            className=""
            multiline={true}
            value={formData.message}
            onChange={handleChange}
          />
       

          <button
            type="submit"
            className={`bg-[#3e3d3d] text-white font-bold md:w-[10vw] mt-[2vh] py-[1.5vh] rounded-md px-[3vh] ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <span className={`text-white text-center  pr-[1vh]`}>
              {loading ? "Sending.." : "Send"}
            </span>
          </button>
        </form>
      </div>
      <div data-aos="zoom-in" data-aos-duration="500">

      </div>
    </div>
  );
}