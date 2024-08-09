import React,{useState, useEffect} from 'react';
import Head from "next/head";
import Navbar from '../Navbar';
import Footer from '../Footer';
import CircularProgress from "@mui/material/CircularProgress";

export default function Layout({children}) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {loading ? (
      <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
        <img src="/favicon.ico" className="w-[30vh]" alt="" />
        <div className='flex flow-row justify-center items-center my-[3vh]'>
        <p className='text-[2.8vh] font-semibold my-[2vh] mr-[2vh]'>Loading</p>
        <CircularProgress size={24} className='text-amber-950'/>
        </div>
      </div>
    ):(
      <div>
      <Head>
        <title>Ekdanta-Murtis</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
    )}
    
    </>
  )
}

