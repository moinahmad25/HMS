import React from 'react'
import './Student.css'
import pic_1 from '../../assets/users/1.png'
import pic_2 from '../../assets/users/2.png'
import pic_3 from '../../assets/users/3.png'
import pic_4 from '../../assets/users/4.png'
import pic_5 from '../../assets/users/5.png'
import pic_6 from '../../assets/users/6.png'
import pic_7 from '../../assets/users/7.png'
import pic_8 from '../../assets/users/8.png'
import pic_9 from '../../assets/users/9.png'
import pic_10 from '../../assets/users/10.png'

const Student = () => {
    const array = [pic_1, pic_2, pic_3, pic_4, pic_5, pic_6, pic_7, pic_8, pic_9, pic_10];


    return (
        <div className='w-full max-h-screen py-4 overflow-x-hidden bg-white'>
            <div className="about_heading flex justify-center h-[6rem] mb-4">
                <h1 className='text-[3.2rem] py-2 px-8'><span className='font-extrabold'>Student's</span> <span className='font-extrabold bg-zinc-700 text-zinc-50 rounded-md px-4 pb-2'>who get registered</span></h1>
            </div>
            <div className='w-full h-[12rem] marquee'>
                <div className='scroll min-w-[100%] flex h-[12rem] gap-2 my-2 '>
                    {
                        array.map((item, index) => {
                            return (
                            <>
                                <div key={index} className='-z-10 imgGrp h-full rounded-md flex-shrink-0  bg-zinc-500 flex justify-center items-center'>
                                    <div className='h-[10rem] w-[10rem] rounded-full bg-zinc-50 shadow-2xl overflow-y-hidden'>
                                        <img src={item} alt="" className='absolute bottom-0 h-[10rem] object-contain'/>
                                    </div>
                                </div>
                            </>
                            )
                        })
                    }
                    {
                        array.map((item, index) => {
                            return (
                            <>
                                <div key={index} className='-z-10 imgGrp h-full rounded-md flex-shrink-0  bg-zinc-500 flex justify-center items-center'>
                                    <div className='h-[10rem] w-[10rem] rounded-full bg-zinc-50 shadow-2xl'>
                                        <img src={item} alt="" className='absolute bottom-0 h-[10rem] object-contain'/>
                                    </div>
                                </div>
                            </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Student
