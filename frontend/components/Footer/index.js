import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Footer = () => {
  return (
    <footer className="bg-white shadow-xl p-[6vh] md:p-[10vh] border-t-2 mt-[2vh] py-[5vh] border-[#ebeaea]">
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col space-y-4 text-[#9F9F9F]'>
          <Link href="/">
            <img src="/favicon.ico" className="w-[13vh]" alt="Logo" />
          </Link>
          <p>Address: 400 Lorem Ipsum</p>
        </div>
        <div>
          <p className='text-[#9F9F9F] py-5'>Links</p>
          <ul className='list-none flex  flex-col space-y-4 '>
            <li ><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className='text-[#9F9F9F] py-5'>Help</p>
          <ul className='list-none flex  flex-col space-y-4 '>
            <li><Link href="/">Payment Options</Link></li>
            <li><Link href="/about">Returns</Link></li>
            <li><Link href="/shop">Privacy Policies</Link></li>
          </ul>
        </div>
        <div>
          <p className='text-[#9F9F9F] py-5'>Newsletters</p>
          <TextField className='w-full' id="standard-basic" label="Enter your email address" variant="standard" />
          <Link href="/">
            <button
              className="text-center my-[2vh] px-[2vh] rounded-sm font-semibold shadow-md hover:scale-105 transition-all hover:bg-[#B88E2F] hover:text-[#f5f4f4] w-fit py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] "
            >
              Subscribe
            </button>
          </Link>
        </div>
      </div>
      <div className=" border-t-2 my-[2vh] py-[2vh] border-[#D9D9D9]">
        &copy; 2024 Logo. All rights reserved
      </div>
    </footer>
  )
}

export default Footer;
