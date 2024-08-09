import React, { useState } from "react";
import MyAccount from "../components/AuthComponents/MyAccount";
import MyOrders from "../components/AuthComponents/MyOrders";
import { useRouter } from "next/router";

const MyAccountPage = ({loggedInUser}) => {
  
  const [activeBtn, setActiveBtn] = useState("MyAccount");

  const handleBtnClick = (button) => {
    setActiveBtn(button);
  };

  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div>
      <div className="w-[90%] my-[5vh] relative mx-auto flex flex-row justify-between items-center">
        <div className="my-auto flex flex-row border-2 rounded-full border-amber-800">
          <button
            className={`text-[2vh] px-[2vh] py-[1.5vh] rounded-full transition-all ease-in-out ${
              activeBtn === "MyAccount" ? "bg-amber-800 text-white" : ""
            }`}
            onClick={() => handleBtnClick("MyAccount")}
          >
            User Details
          </button>
          <button
            className={`text-[2vh] px-[2vh] py-[1.5vh] rounded-full transition-all ease-in-out ${
              activeBtn === "MyOrders" ? "bg-amber-800 text-white" : ""
            }`}
            onClick={() => handleBtnClick("MyOrders")}
          >
            My Orders
          </button>
        </div>
        <div>
          <h1 className="text-[3.5vh] font-medium mx-auto ">
            {activeBtn === "MyOrders" ? "My Recent Orders" : "My Account"}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-center px-[3vh] rounded-sm font-semibold shadow-md hover:scale-125 transition-all hover:bg-red-600 hover:text-[#f5f4f4] w-fit py-[1vh] text-red-600  border-red-600 border-[0.3vh] "
        >
          Logout
        </button>
      </div>

      <div className="w-[80vw] mx-auto overflow-hidden m-[10vh]">
        {activeBtn === "MyAccount" ? <MyAccount /> : <MyOrders />}
      </div>
    </div>
  );
};

export default MyAccountPage;

export async function getServerSideProps(context) {
  let data = [];
  const { req, locale, defaultLocale } = context;
  const Cookie = req.headers.cookie;
  const { auth_token } = req.cookies;

  if (!auth_token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      loggedInUser: auth_token ? true : false,
    },
  };
}
