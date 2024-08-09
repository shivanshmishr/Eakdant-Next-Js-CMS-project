import React, { useState } from "react";
import Cart from "@/components/CheckoutComponents/Cart";
import OrderDetail from "@/components/CheckoutComponents/OrderDetail";
import { OrderStatus } from "@/components/CheckoutComponents/OrderStatus";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
import Payment from "../components/CheckoutComponents/Payment";
// import { redirect } from "next/dist/server/api-utils";

export default function checkout() {

  const { cartItems } = useStateContext();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cartData, setCartData] = useState([]);

  const steps = [
    { label: "Shopping Cart", component: <Cart /> },
    { label: "Order Detail", component: <OrderDetail /> },
    { label: "Order Status", component: <OrderStatus /> },
  ];

  const router = useRouter();

  const handleStepChange = (index,data) => {
    if (index === activeStep + 1) {
      if (index === 1 && cartItems.length === 0) {
        toast.error("Your cart is empty. Please add items to proceed.");
        return;
      }
      setCartData(data);    
    }
    setActiveStep(index);
  };

  const handlePlaceOrder = ()=>{
    if(cartItems.length > 0){
      console.log("Cart Data:",cartItems);
      handleStepChange(activeStep + 1, cartItems);
    } else{
      toast.error("Your cart is empty. Please add items to proceed.")
    }
  }

  const handlePaymentCompletion = () => {
    setPaymentCompleted(true);
    setActiveStep(2);
  };

  return (
    <div className="w-[90%] mx-auto my-[10vh]">
      <div className="flex flex-row justify-between items-center relative my-[5vh] -z-50">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index !== 0 && (
              <div className="h-[0.2vh] bg-gray-500 left-[15%] bottom-[75%] md:bottom-5 w-[69%] mx-auto absolute md:-z-50"></div>
            )}
            <div className="flex flex-col md:flex-row items-center px-[2vh] bg-white space-y-2">
              <p
                className={`md:text-[2.4vh] flex flex-row  items-center justify-center font-semibold rounded-full ${
                  activeStep > index || (paymentCompleted && index === 2)
                    ? "bg-green-700 text-white"
                    : "bg-[#B88E2F] text-white z-20"
                } w-[5vh] h-[5vh] mr-[1.5vh]`}
              >
                {activeStep > index ||
                (index === activeStep && paymentCompleted) ? (
                  <span className="flex flex-row justify-center items-center">
                    {/* <FontAwesomeIcon
                      className="text-white text-[3vh]"
                      icon="fa-solid fa-square-check"
                    /> */}
                    &#10003;
                  </span>
                ) : (
                  index + 1
                )}
              </p>
              <h2
                className={`md:text-[2.8vh] text-center mx-auto z-50 font-medium ${
                  activeStep > index || (paymentCompleted && index === 2)
                    ? "text-green-700"
                    : "bg-white"
                }`}
              >
                {step.label}
              </h2>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div>{steps[activeStep].component}</div>

      <div className="flex justify-end mt-4">
        {activeStep === 0 && (
          <>
            {/* <button
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md mr-4"
            >
              Back
            </button> */}
            {activeStep === 0 && !cartItems.length == 0 && (
              <button
                // onClick={() => handleStepChange(activeStep + 1)}
                onClick={handlePlaceOrder}
                disabled={activeStep === steps.length - 1}
                className="bg-[#141414] shadow-md text-white hover:scale-110 font-bold font-poppins px-[4vh] py-[1.5vh] "
              >
                PLACE ORDER
              </button>
            )}
          </>
        )}

        {activeStep === 1 && (
          <div className="flex flex-row gap-x-[1vh] relative">
            <button
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md mr-4"
            >
              Back
            </button>
            <div className="absolute -top-[16vh] right-[15vh] ">
              <Payment cartData={cartData} onPaymentComplete={handlePaymentCompletion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
