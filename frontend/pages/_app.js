import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "../context/StateContext";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <StateContext>
        <Layout>
          <Component {...pageProps} />

          <Toaster
            position="bottom-left"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "none",
                padding: "2vh",
                fontSize: "2.2vh",
              },
              success: {
                style: {
                  background: "#111",
                  color: "#fff",
                  borderRadius: "none",
                  padding: "2.5vh",
                  fontSize: "2.2vh",
                },
              },
              error: {
                style: {
                  background: "#111",
                  color: "#fff",
                  borderRadius: "none",
                  padding: "2.5vh",
                  fontSize: "2.2vh",
                },
              },
            }}
          />
        </Layout>
      </StateContext>
    </>
  );
}
