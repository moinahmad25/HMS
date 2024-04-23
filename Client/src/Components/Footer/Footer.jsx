import React from 'react'
import './Footer.css'
import heroImg from '../../assets/logo_black.svg'

const Footer = () => {
    return (
        <div className='w-full min-h-[30rem] relative flex flex-col items-center pb-16 bg-white'>
            <div className='w-[90%] h-[1px] bg-zinc-200'></div>
            <div
                class="h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] -z-20 absolute top-0 border-t border-zinc-300"
            ></div>
            <div className='w-full h-full absolute top-0 flex justify-center'>
                <div className='w-[70%] h-full flex flex-col items-center z-10 py-12'>
                    {/* <img src={heroImg} alt="" className='object-cover h-[8rem] object-right brightness-150' /> */}
                    <h1 className=' text-center hero_heading text-[5rem] font-extrabold bg-gradient-to-r from-zinc-950 to-zinc-400 w-[24rem]'>Hostel <span>विभाग</span></h1>
                    <div className='mt-4 w-full'>
                        <h1 className='text-center text-3xl'>BRCM College of Engineering and Technology</h1>
                        <h3 className='text-center mt-4 text-zinc-600'>Bahal - 127028, Dist. - Bhiwani, Haryana, India</h3>
                        <p className="phone text-center font-bold text-[0.8rem] mt-4 text-zinc-500"><span className='text-black font-extrabold'>Telephone:-</span> +91 1255 265101-04</p>
                        <p className="phone text-center font-bold text-[0.8rem] mt-4 text-zinc-500"><span className='text-black font-extrabold'>Mobile:-</span> +91 80599 00243</p>
                        <p className="phone text-center font-bold text-[0.8rem] mt-4 text-zinc-500"><span className='text-black font-extrabold'>Mail us on:- </span>infocollege@brcm.edu.in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
