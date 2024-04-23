import React from 'react'
import './About.css'
import pic_1 from '../../assets/othersss/1.jpg'
import pic_2 from '../../assets/othersss/2.jpg'
import pic_3 from '../../assets/othersss/3.jpg'
import pic_4 from '../../assets/othersss/4.jpg'
import pic_5 from '../../assets/othersss/5.jpg'

const About = () => {

    const postersArray_1 = [pic_1, pic_2, pic_3]
    const postersArray_2 = [pic_4, pic_5]

    return (
        <div className='w-full max-h-screen py-8 bg-white'>
            <div className="about_heading flex justify-center h-[6rem]">
                <h1 className='text-[3.2rem] py-2 px-8'><span className='font-extrabold'>About</span> <span className='font-extrabold bg-zinc-700 text-zinc-50 rounded-md px-4'>Us</span></h1>
            </div>
            <div className='mt-8 w-full h-[30rem] flex justify-between'>
                <div className="left w-[59%] h-full bg-gradient-to-l p-8 py-6 from-zinc-200 to-transparent rounded-md">
                    <h1 className='text-[2.4rem] border-b-2 border-zinc-900 inline-block'>Our Commitment</h1>
                    <p className='w-[90%] text-[1.4rem] font-extrabold mt-8'>
                        Our hostel management system is born from a commitment to simplify student accommodation. Led by a passionate team, we prioritize transparency, innovation, and student well-being. Our mission is to create a seamless living experience through technology, fostering vibrant and sustainable communities. With a focus on environmental responsibility and community engagement, we're dedicated to shaping the future of student living.</p>
                        <button className='px-12 py-4 text-[1.2rem] bg-zinc-800 text-zinc-50 rounded-md mt-8'>Explore More</button>
                </div>
                <div className="right w-[40%] h-full flex gap-4 relative">
                    <div className="part_1 w-[40%] h-full flex flex-col justify-between pl-2">
                        {
                            postersArray_1.map((item, index) => {
                                return (
                                <div key={index+1} className='w-[16rem] h-[9.2rem] rounded-md box_img'>
                                        <img src={item} alt="" className='w-full h-full rounded-md object-center object-cover' />
                                </div>
                                )

                            })
                        }
                    </div>
                    <div className="part_1 w-[54%] h-full flex flex-col items-end justify-between absolute right-0 ">
                        {
                            postersArray_2.map((item, index) => {
                                return(
                                    <div key={index+1} className='w-[100%] h-[14.5rem] rounded-md box_img'>
                                        <img src={item} alt="" className='w-full h-full rounded-md object-center object-cover' />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
