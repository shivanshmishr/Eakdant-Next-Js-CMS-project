import React from 'react'
import Link from 'next/link'

export const NewArrivalSale = () => {
  return (
    <div className='flex flex-row  bg-[url("/newarrival.jpg")] bg-no-repeat md:bg-cover shadow-md '>
     
      {/* <img src='/newarrival.jpg'   /> */}

      <div 
        className="md:ml-[52%] flex flex-col justify-center space-y-5 p-[10vh] md:h-[80vh]"
        data-aos="zoom-in"
      >
        <h3 className="text-[#333333]">New Arrival</h3>
        <h1 className="text-[#6D4128] text-[3.5vh] md:text-[6.5vh] font-bold font-mono leading-tight">Discover Our New Collection</h1>
        <p className="text-[#333333]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <Link href='/shop'><button className="bg-[#6D4128] text-white font-bold md:w-[12vw] md:p-[3vh] p-[1.5vh]">BUY NOW!</button>
        </Link>
      </div>
    </div>
  )
}
