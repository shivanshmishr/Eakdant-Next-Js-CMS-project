import React, { useState } from "react";
import SignUp from "../components/AuthComponents/SignUp";
import AuthBg from "../components/AuthComponents/AuthBg";

const SignUpPage = ({userData}) => {

  return (
    <div className="flex flex-row items-center overflow-y-hidden">
      <div className="w-[50%]">
        <SignUp/>
      </div>
      <AuthBg />
    </div>
  );
};

export default SignUpPage;

export async function getServerSideProps(){
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(),
    });

    const userData = await response.json();
    console.log("User Data", userData)

    return{
      props:{
        userData,
      }
    }
    
  } catch (error) {
    console.error("Error fetching data:",error)
    return {
      props:{
        userData: null,
      }
    }
  }
}