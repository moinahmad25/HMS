import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import './Messages.css'
import { MdCancel } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import message_illustration from '../../assets/illustration/message.svg'
import not_found from '../../assets/illustration/not_found.svg'

const Messages = () => {

  const [message, setMessage] = useState([]);
  const [click, setClick] = useState(false)
  const [user, setUser] = useState({
    userName:'',
    userEmail:'',
    hostelName:'',
    floorNumber:'',
    roomNumber:'',
    userType:'',
    registrationNumber:'',
    imgURL:''
  })

  const [receiptURL, setReceiptURL] = useState(null)
  const [isZoom, setIsZoom] = useState(false)


  const getMessage = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/get-room-allocation-detail`)
      const result = await response.json();
      // console.log(result)

      setMessage(result.user)

    } catch (error) {
      console.log("error found!!!", error)
    }
  }


  useEffect(() => {

    getMessage()

  }, [])


  // useEffect(() => {

  //   getMessage()

  // }, [message])


  const handleClick = (index) => {
    setClick(true)
    const detail = message[index];
    setUser({
      userName: detail.userName,
      userEmail: detail.userEmail,
      hostelName: detail.hostelName,
      floorNumber: detail.floorNumber,
      roomNumber: detail.roomNumber,
      userType: 'Room Booking', 
      registrationNumber: detail.registrationNumber,
      imgURL: detail.imgURL,
    })
  }


  const handleConfirm = async () => {
    // try {
    //   const response = await fetch(`http://localhost:5000/api/admin/allocate-room/${user.registrationNumber}`,
    //     {
    //       method: 'POST'
    //     })

    //   const result = await response.json();
    //   console.log("confirm!!!", result)
    //   setClick(false)

    // } catch (error) {
    //   console.log("cancel!!!", error)
    // }

    await sendConfirmation();
  }

  const sendConfirmation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/booking-confirmation/${user.registrationNumber}`,{
        method:'POST',
      })

      const result = await response.json();
      console.log(result);

    } catch (error) {
      console.log("Error found!!!", error)
    }

    setClick(false)
  }

  const handleCancellation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/cancel-booking/${user.registrationNumber}`, {
        method:'POST'
      })

      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log("error: ", error)
    }
    setClick(false)
  }


  const handleCancel = () => {
    setClick(false)
  }

  const zoomReceipt = (e) => {
    setReceiptURL(e.target.currentSrc)
    setIsZoom(true)
  }

  const handleCancelZoom = () => {
    setIsZoom(false)
  }

  return (
    <div className='w-full min-h-screen flex'>
      <Navbar />
      <div className='w-4/5 min-h-screen p-8 relative'>
        <h1 className='text-2xl text-center font-semibold mb-6'>Inbox</h1>
        <div className='w-full border-t-2 border-zinc-200 py-4'>
          {
            click && user.userName ? <div className='w-[45vw] min-h-[60vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-black rounded-md p-4'>
              <MdCancel className='absolute text-[2rem] cursor-pointer text-zinc-600 -top-4 -right-4 bg-white rounded-full' onClick={handleCancel} />
              <div className='w-full h-full border border-zinc-200 rounded-md px-8 pt-10'>
                <h1 className='text-[1.6rem] font-semibold'>{user.userName}</h1>
                <div className='text-[0.9rem] h-[1rem] font-normal text-zinc-400 flex gap-2 items-center'>
                  <MdEmail />
                  <p>{user.userEmail}</p>
                </div>
                <h3 className='text-[1rem] font-semibold my-4'>Subject: <span className='font-medium text-green-500'>{user.userType}</span></h3>
                <p className='text-zinc-500'>Hello Admin, I want to book the room number <span className='mt-1 font-semibold text-black'> {user.roomNumber} </span> on <span className='mt-1 font-semibold text-black'> {user.floorNumber} </span> floor in <span className='mt-1 uppercase font-semibold text-black'> {user.hostelName}. </span> </p>
                {
                  user.imgURL ? <div className='w-1/2 h-[40vh] rounded-md mt-4 cursor-pointer relative'>
                    <p className='font-semibold text-[1rem] absolute -left-4 top-0 bg-red-600 text-red-50 rounded-md px-2 z-50'>Fee receipt</p>
                    <img src={user.imgURL} alt="receipt" className=' brightness-[40%] w-full h-full rounded-md object-cover object-top' onClick={zoomReceipt} />
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent border-2 border-dashed border-zinc-300 font-semibold flex justify-center items-center text-zinc-300 py-1 px-4 rounded-md' onClick={() => setIsZoom(true)}>Click To Zoom</div>
                  </div> : 
                    <div className='w-1/2 h-[40vh] rounded-md flex justify-center items-center mt-4 cursor-pointer relative bg-zinc-200'>
                      <p className='font-semibold text-[1rem] absolute -left-4 top-0 bg-red-600 text-red-50 rounded-md px-2 z-50'>Fee receipt</p>
                      <img src={not_found} alt="receipt" className='blur-[2px] w-[15rem] h-[15rem] rounded-md object-contain object-center' />
                      <p className='text-red-600 text-[11rem] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>?</p>
                      <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent border-2 border-dashed border-zinc-600 font-semibold flex justify-center items-center text-zinc-600 py-1 px-4 rounded-md text-nowrap'>Fee Receipt Missing!!!</p>
                  </div>
                }
                
                <div className='w-full h-[3rem] my-8 flex gap-4'>
                    <button className='w-1/2 h-full rounded-md bg-red-100 border border-red-200 font-semibold text-red-500' onClick={handleCancellation}>Cancel Booking</button>
                  <button className='w-1/2 h-full rounded-md bg-green-100 border border-green-200 font-semibold text-green-500' onClick={handleConfirm}>Confirm Booking</button>
                </div>
              </div>
            </div>:<></>
          }
          {
            isZoom ? <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[96vh] shadow-2xl shadow-black rounded-md bg-white p-4'>
              <MdCancel className='absolute text-[2rem] cursor-pointer text-zinc-600 -top-4 -right-4 bg-white rounded-full' onClick={handleCancelZoom} />
              <img src={receiptURL} alt="" className='w-full h-full object-contain' />
            </div> : <></>
          }
          <div className='w-full'>
            <div className='w-full flex pt-1'>
              <div className='w-1/5 h-10  flex items-center pl-4'>
                <h1 className='font-bold text-gray-900'>From</h1>
              </div>
              <div className='w-1/5 h-10 flex items-center pl-4 '>
                <h1 className='font-bold text-gray-900'>Type</h1>
              </div>
              <div className='w-3/5 h-10  flex items-center pl-4'>
                <h1 className='font-bold text-gray-900'>Message</h1>
              </div>
            </div>
            {
              message.length > 0 ? message.map((item, index) => {
                return (
                  <div className='w-full flex text-zinc-500 cursor-pointer inbox rounded-md py-2 bor' key={index + 1} onClick={() => handleClick(index)}>
                    <div className='w-1/5 h-8 flex items-center pl-4 font-medium '>{item.userName}</div>
                    <div className='w-1/5 h-8 flex items-center pl-4'>Room Booking</div>
                    <div className='w-3/5 h-8 flex items-center pl-4'>Booking Pending!!! of Room no. <span className='font-semibold mx-1'> {item.roomNumber} </span> on <span className='font-semibold mx-1'> {item.floorNumber} floor </span> in <span className='font-semibold mx-1'> {item.hostelName} </span></div>
                  </div>
                )
              }) : <div className='w-full p-4 flex flex-col justify-center items-center h-[60vh]'>
                <img src={message_illustration} alt='edit illustration' className='h-[15rem]' />
                <h1 className='text-[1.5rem] font-semibold mt-4'>Nothing in message box yet!</h1>
                <p className='text-[0.9rem] text-zinc-500 font-medium'>If you think there should be a message, then refresh it.</p>
              </div>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
