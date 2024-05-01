import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { IoSearch } from "react-icons/io5";
import StudentCard from '../student card/StudentCard';
import { useAuth } from '../../store/auth';
import delete_illustration from '../../assets//illustration/remove.svg'

const Remove = () => {

  const [regNumber, setRegNumber] = useState(null)
  const [detail, setDetail] = useState({})
  const [room, setRoom] = useState(null)
  const [clicked, setClicked] = useState(false)
  const { isClicked } = useAuth()
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


  return (
    <div className='w-full min-h-screen flex'>
      <Navbar />
      <div className='w-4/5 min-h-screen px-4'>
        <div className='w-full h-[6rem] flex justify-between items-center  border-b-2 border-zinc-200'>
          <h1 className='text-2xl text-left font-semibold'>Remove Student</h1>
          <form onSubmit={handleSubmit} className='flex gap-2'>
            <input type="text" onChange={handleInput} className='bg-gray-200 p-4 w-[16rem] h-[3rem] rounded-md font-medium text-[0.9rem]' placeholder='Enter registration no.' name='registration' />
            <button className='w-[3rem] h-[3rem] bg-black rounded-md flex justify-center items-center'>
              <IoSearch style={{ color: 'white', fontSize: '1.2rem' }} />
            </button>
          </form>
        </div>
        <div className='w-full p-4'>
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
              <StudentCard fname={detail.firstName} lname={detail.lastName} college={detail.college} email={detail.email} phone={detail.phone} regNumber={detail.registrationNumber} permanentAddress={detail.permanentAddress} type='delete' hostelName={room.hostelName} roomNumber={room.roomNumber} />
            </div> : <div className='w-full p-4 flex flex-col justify-center items-center h-[80vh]'>
                <img src={delete_illustration} alt='edit illustration' className='h-[13rem]' />
              <h1 className='text-[1.5rem] font-semibold mt-4'>You did not search the data to delete it.</h1>
              <p className='text-[0.9rem] text-zinc-500 font-medium'>To delete the data of the user, you have to search it first.</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Remove
