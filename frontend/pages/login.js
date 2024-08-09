import React from "react";
import Login from "../components/AuthComponents/Login";
import AuthBg from "../components/AuthComponents/AuthBg";

const LoginPage = () => {
  return (
    <div className="flex flex-row items-center overflow-y-hidden">
      <div className="w-[50%]">
        <Login />
      </div>
      <AuthBg />
    </div>
  );
};

export default LoginPage;
