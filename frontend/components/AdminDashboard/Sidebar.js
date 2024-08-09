import React, { useState } from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dashboard } from "./SidebarComponent/Dashboard";
import { Order } from "./Order";
import AddProduct from "./AddProduct";
import { User } from "./SidebarComponent/User";
import { useRouter } from "next/router";

const Sidebar = ({ products, orderdetail , userdetail }) => {
  
  const router = useRouter();

  const [activeComponent, setActiveComponent] = useState(Dashboard); // State to hold the active component

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleLogout = () => {
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 h-screen w-[18vw] pt-[5vh]   top-0 left-0 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-white  font-semibold text-center md:text-[4vh]">
            Admin Panel
          </h2>
        </div>
        <nav className="text-white">
          <ul className="py-4 flex flex-col space-y-6 md:text-[2.5vh]">
            <li className="px-4 py-2 bg-[#f4f3f319] rounded-xl  mx-[3vh] shadow-2xl hover:scale-105    hover:bg-white hover:text-gray-800">
              <div
                onClick={() => handleComponentChange(<Dashboard />)}
                className="cursor-pointer"
              >
                <DashboardIcon className="mr-2" />
                <span className="md:inline hidden">Dashboard</span>
              </div>
            </li>
            <li className="px-4 py-2 bg-[#f4f3f319] rounded-xl  mx-[3vh] shadow-2xl hover:scale-105  hover:bg-white hover:text-gray-800">
              <div
                onClick={() =>
                  handleComponentChange(<Order orderdetail={orderdetail} />)
                }
                className="cursor-pointer"
              >
                <ShoppingCartIcon className="mr-2" />
                Order
              </div>
            </li>
            <li className="px-4 py-2 bg-[#f4f3f319] rounded-xl  mx-[3vh] shadow-2xl hover:scale-105  hover:bg-white hover:text-gray-800">
              <div
                onClick={() =>
                  handleComponentChange(<AddProduct products={products} />)
                }
                className="cursor-pointer"
              >
                <StorefrontIcon className="mr-2" />
                Add Product
              </div>
            </li>
            <li className="px-4 py-2 bg-[#f4f3f319] rounded-xl  mx-[3vh] shadow-2xl hover:scale-105  hover:bg-white hover:text-gray-800">
              <div
                onClick={() => handleComponentChange(<User userdetail={userdetail} />)}
                className="cursor-pointer"
              >
                <span className="flex items-center">
                  <PeopleIcon className="mr-2" />
                  User
                </span>
              </div>
            </li>
            
            <li onClick={handleLogout} className="cursor-pointer px-4 py-2 bg-[#f4f3f319] rounded-xl  mx-[3vh] shadow-2xl hover:scale-105  hover:bg-white hover:text-gray-800">
              <span className="flex items-center">
                <LogoutIcon className="mr-2" />
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Active Component */}
      <div className="ml-2 p-8 w-[90vw] h-[100vh] overflow-y-scroll">
        {activeComponent}
      </div>
    </div>
  );
};

export default Sidebar;
