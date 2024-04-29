import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import './Add.css'
// import 'ldrs/ring'
import { ring } from 'ldrs'

ring.register()

// Default values shown

import add_user from '../../assets/illustration/Add friends-amico.svg'

const Add = () => {

  const [studentDetail, setStudentDetail] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    email: '',
    phone: '',
    college: '',
    permanentAddress: '',
  })

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")


  const handleInput = (e) => {
    const { name, value } = e.target;

    setStudentDetail({
      ...studentDetail,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/add`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetail),
      })


      // making input empty again:
      if (response.ok) {
        setStudentDetail({
          firstName: '',
          lastName: '',
          registrationNumber: '',
          email: '',
          phone: '',
          college: '',
          permanentAddress: '',
        })


        // creating alert if it sent to DB
        setMessage("Data Sent Successfully!!!")
      }
      else {
        // creating alert if it did not sent to DB
        setMessage("Something Went Wrong!!!")
      }

      console.log(response)

    } catch (error) {
      console.log("error, not sent to DB", error)
    }
    finally {
      setLoading(false)
    }

    setTimeout(() => {
      setMessage("")
    }, 4000)

  }


  return (
    <div className='w-full min-h-screen flex'>
      <Navbar />
      <div className={`w-4/5 min-h-screen px-4 py-8 flex justify-center items-center ${loading ? 'blur-effect' : ''}`}>
        <div className='w-1/2 relative'>
          <h1 className='text-2xl text-center font-semibold mb-4'>Add Student</h1>
          {
            message ? <span className='absolute top-8 left-1/2 -translate-x-1/2 py-2 px-4 bg-green-600 text-green-50 rounded-md'>{message}</span> : <></>
          }
          {loading && (
            <div className="overlay">
              <l-ring
              size = "50"
              stroke = "5"
              bg-opacity="0"
              speed = "2"
              color = "white"></l-ring >
            </div>
          )}
        <div className='w-full py-4 border-t-2 border-zinc-200'>
          {/* <img src={add_user} alt={add_user} className='h-[60vh]' /> */}
          <form className='w-full' onSubmit={handleSubmit}>
            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <label htmlFor="firstName" className='font-semibold text-[0.9rem]'>First Name</label>
                <input type="text" className="h-12 px-2 w-full rounded-md bg-transparent mt-2 border border-zinc-300" name='firstName' onChange={handleInput} value={studentDetail.firstName} />
              </div>
              <div className='w-1/2'>
                <label htmlFor="lastName" className='font-semibold text-[0.9rem]'>Last Name</label>
                <input type="text" className="h-12 px-2 w-full rounded-md bg-transparent mt-2 border border-zinc-300" name='lastName' onChange={handleInput} value={studentDetail.lastName} />

              </div>
            </div>
            <div className='w-full mt-2'>
              <label htmlFor="registrationNumber" className='font-semibold text-[0.9rem]'>Registration Number</label>
              <input name='registrationNumber' type="number" className="h-12 w-full rounded-md border bg-transparent border-zinc-300 regInput mt-2" onChange={handleInput} value={studentDetail.registrationNumber} />

            </div>
            <div className='w-full mt-2'>
              <label htmlFor="email" className='font-semibold text-[0.9rem]'>Email</label>
              <input type="email" className="h-12 px-2 w-full rounded-md bg-transparent mt-2 border border-zinc-300" name='email' onChange={handleInput} value={studentDetail.email} />

            </div>
            <div className='w-full mt-2'>
              <label htmlFor="phone" className='font-semibold text-[0.9rem]'>Phone</label>
              <input name='phone' type="number" className="h-12 w-full rounded-md border bg-transparent border-zinc-300 regInput mt-2" onChange={handleInput} value={studentDetail.phone} />

            </div>
            <div className='w-full mt-2'>
              <label htmlFor="college" className='font-semibold text-[0.9rem]'>Select College</label>
              <select name="college" id="" className='w-full mt-2 bg-transparent border border-[#d4d4d8] h-12 rounded-md text-[#89a3af] px-2' onChange={handleInput} value={studentDetail.college}>
                <option value=""></option>
                <option value="brcmcet">BRCM College of Engineering and Technology</option>
                <option value="gdc">GDC Memorial College</option>
                <option value="brcmlaw">BRCM Law College</option>
              </select>

            </div>
            <div className='w-full mt-2'>
              <label htmlFor="permanentAddress" className='font-semibold text-[0.9rem]'>Permanent Address</label>
              <textarea type="text" className="min-h-6 px-2 py-2 w-full rounded-md bg-transparent mt-2 border border-zinc-300 resize-none" name='permanentAddress' onChange={handleInput} value={studentDetail.permanentAddress} />

            </div>
            <button type='submit' className='float-right w-[10rem] px-4 py-2 mt-4 rounded-md bg-black text-white'>Add</button>
          </form>
        </div>
      </div>
    </div>
    </div >
  )
}

export default Add
