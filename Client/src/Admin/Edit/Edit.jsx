import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import StudentCard from '../student card/StudentCard'
import { IoSearch } from "react-icons/io5";
import { useAuth } from '../../store/auth';
// import EditStudent from '../EditStudent';
import edit_illustration from '../../assets/illustration/edit.svg'
import './Edit.css'

const Edit = () => {
  const [regNumber, setRegNumber] = useState(null)
  const [detail, setDetail] = useState({})
  const [room, setRoom] = useState(null)
  const [clicked, setClicked] = useState(false)
  const {isClicked} = useAuth()
  const [loading, setLoading] = useState(false)



  const handleInput = (e) => {
    setRegNumber(e.target.value)
    setClicked(false)
  }

  // console.log(regNumber)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/api/admin/get-detail/${regNumber}`)
      const result = await response.json();

      setDetail(result.isRegistrationValid)
      setRoom(result.isUserApplied)
      setClicked(true)

    } catch (error) {
      console.log("getting error: ", error)
    }
    finally{
      setLoading(false)
    }
  }

  console.log(detail.isRegistrationValid)
  console.log(room)



  return (
    <div className={`w-full min-h-screen flex overflow-x-hidden`}>
      <Navbar />
      <div className='w-4/5 min-h-screen px-4'>
        <div className='w-full h-[6rem] flex justify-between items-center border-b-2 border-gray-200'>
          <h1 className='text-2xl text-left font-semibold'>Edit Student</h1>
          <form onSubmit={handleSubmit} className='flex gap-2'>
            <input type="text" className='bg-gray-200 font-medium p-4 w-[16rem] h-[3rem] rounded-md text-[0.9rem]' placeholder='Enter registration no.' onChange={handleInput} name='registrationNumber' value={regNumber} />
            <button type='submit' className='w-[3rem] h-[3rem] bg-black rounded-md flex justify-center items-center'>
              <IoSearch style={{ color: 'white', fontSize: '1.2rem' }} />
            </button>

          </form>
        </div>
        <div className='w-full relative'>
          {
            loading && (
              <div className="overlay">
                <l-ring
                  size="50"
                  stroke="5"
                  bg-opacity="0"
                  speed="2"
                  color="white"></l-ring >
              </div>
            )
          }
          {
            clicked && detail.firstName ? <div className='w-full p-4'>
              <StudentCard fname={detail.firstName} lname={detail.lastName} college={detail.college} email={detail.email} phone={detail.phone} regNumber={detail.registrationNumber} permanentAddress={detail.permanentAddress} type='edit' hostelName={room ? room.hostelName : 'Unknown'} roomNumber={room ? room.roomNumber : 'Not Booked!'} />
            </div> : <div className='w-full p-4 flex flex-col justify-center items-center h-[85vh]'>
              <img src={edit_illustration} alt='edit illustration' className='h-[15rem]' />
              <h1 className='text-[1.5rem] font-semibold mt-4'>Not anything searched yet!</h1>
              <p className='text-[0.9rem] text-zinc-500 font-medium'>To edit the data of the user, you have to search it first.</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Edit
