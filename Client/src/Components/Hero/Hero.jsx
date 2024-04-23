import React from 'react'
import './Hero.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import heroImg from '../../assets/Images/HostelVibhag.jpg'
import About from '../About/About'
import Student from '../Student/Student'
import Contact from '../Contact/Contact'
import Owner from '../Owner/Owner'
import Footer from '../Footer/Footer'

const Hero = () => {

  const navigate = useNavigate()

  const takeDetail = () => {
    navigate('/form')
  }

  console.log(logo)

  return (
    <>
      <div className='w-full h-screen relative main overflow-x-hidden '>
        <img src={heroImg} alt="" className='object-cover h-full w-full object-right brightness-200 -z-10 fixed' />
        <header className=' w-full h-[8rem] absolute top-0 left-0  z-50 flex justify-between items-center '>
          <div className='w-[7rem] h-[7rem] rounded-full bg-white ml-4 mt-2'>
            <img src={logo} alt="" className=' z-10 h-full' />
          </div>
          <nav className=' w-[50%] h-full flex items-center'>
            <ul className='list w-full h-[80%] flex justify-end items-center gap-4 font-bold px-[1rem]'>
              <Link href=""><li>Home</li></Link>
              <Link href=""><li>About Us</li></Link>
              <Link href=""><li>Features</li></Link>
              <Link href=""><li>Contact Us</li></Link>
              <Link href=""><li>Join Now</li></Link>
            </ul>
          </nav>
        </header>
        <div className='main_child_1 w-full h-full z-10 absolute top-0 left-0 flex items-center'>
        </div>
        <div className=' w-[40%] h-3/4 mt-12 absolute top-[5rem] right-0 z-[100] flex flex-col py-[3rem] pl-4'>
          <h1 className='hero_heading text-[6rem] font-extrabold bg-gradient-to-r from-zinc-950 to-zinc-400 w-[25rem]'>Hostel <span>विभाग</span></h1>
          <p className=' font-semibold text-[0.9rem] text-zinc-700 -skew-x-[10deg]'>for BRCM College of Engineering and Technology.</p>
          <p className=' text-[1.2rem] font-semibold w-[30rem] my-6 text-zinc-900 '>Easily reserve your ideal hostel room online, simplifying student accommodations. Streamlining your stay for a hassle-free experience.</p>

          <button onClick={takeDetail} className='join bg-gradient-to-r from-zinc-950 to-zinc-400 w-[16rem] h-16 text-white text-[1.1rem] rounded-md'>Join Now</button>
        </div>
      </div>
      <About />
      <Student />
      <Owner />
      <Contact />
      <Footer />
    </>
  )
}

export default Hero
