import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

export default function MobileVerification({onComplete, userData}) {
  const numberOfOtpFields = 6;
  const otpFields = Array.from({ length: numberOfOtpFields }, (_, i) => i);
  const otpRefs = useRef([]);
  const [mobileNumberEntered, setMobileNumberEntered] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    otpRefs.current = otpRefs.current
      .slice(0, numberOfOtpFields)
      .map((_, index) => otpRefs.current[index] || React.createRef());
  }, [numberOfOtpFields]);

  const handleContinue = () => {
    const mobileNumber = document.getElementById("outlined-basic").value;
    if (!mobileNumber.trim()) {
      toast.error("Please enter your mobile number.");
      return;
    }
    setMobileNumberEntered(true);
  };

  const handleOtpInputChange = (index, event) => {
    const value = event.target.value;
    if (value && index < numberOfOtpFields - 1) {
      otpRefs.current[index + 1].focus();
    } else if (
      !value &&
      index > 0 &&
      event.nativeEvent.inputType === "deleteContentBackward"
    ) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async() => {
    setLoading(true);
    try {
      if(!mobileNumber.trim()){
        toast.error("Please enter mobile number.");
        setLoading(false);
        return;
      }

      setTimeout(()=>{
        setLoading(false);
        toast.success("Mobile Number Verified Successfully",{
          position:"top-center",
        });
      })
      onComplete()
    } catch (error) {
      console.error("Error verifying mobile number",error);
      setLoading(false);
      toast.error("Failed to verify mobile number")
    }
    
  };

  const handleChangeMobileNumber = (event)=>{
    setMobileNumber(event.target.value);
  }

  return (
    <div className="mx-[6vh]">
      {!mobileNumberEntered ? (
        <>
          <h1 className="text-[4.5vh] font-semibold mb-[2vh] text-[#462E13]">
            Enter Mobile Number
          </h1>
          <TextField
            id="outlined-basic"
            label="Enter Mobile Number"
            variant="outlined"
            value={mobileNumber}
            onChange={(e)=>setMobileNumber(e.target.value)}
            className="w-full my-[1.5vh]"
          />
          <button
            className="bg-[#462E13] w-full py-[1.2vh] rounded-lg my-[1.5vh]"
            onClick={handleContinue}
          >
            <p className="text-center text-[3.2vh] text-white">Continue</p>
          </button>
        </>
      ) : (
        <div className="my-[2vh]">
          <h1 className="text-[4.5vh] font-semibold mb-[2vh] text-[#462E13]">
            Enter One Time Password
          </h1>
          <div className="flex flex-row gap-x-[1.5vh]">
            {otpFields.map((index) => (
              <TextField
                key={index}
                inputRef={(ref) => (otpRefs.current[index] = ref)}
                variant="outlined"
                placeholder="_"
                className="w-full py-[3vh]"
                onChange={(event) => handleOtpInputChange(index, event)}
                autoFocus={index === 0}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                }}
              />
            ))}
          </div>
          <button
            className="bg-[#422c12] active:bg-[#291b0b] w-full my-[1vh] h-[7vh] rounded-md"
            onClick={() => handleVerify()}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="secondary"
                sx={{ color: "#fff" }}
              />
            ) : (
              <p className="text-white text-[2.9vh]">Verify</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
