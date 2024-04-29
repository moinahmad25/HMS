import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import './Messages.css'
import { MdCancel } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import message_illustration from '../../assets/illustration/message.svg'
import not_found from '../../assets/illustration/not_found.svg'
import { useNavigate } from 'react-router-dom';

const Messages = () => {

  const navigate = useNavigate()
  const [message, setMessage] = useState([]);
  const [click, setClick] = useState(false)
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    hostelName: '',
    floorNumber: '',
    roomNumber: '',
    userType: '',
    registrationNumber: '',
    imgURL: ''
  })

  const [passUser, setPassUser] = useState({
    registrationNumber: '',
    userName: '',
    userEmail: '',
    roomNumber: '',
    hostelName: '',
    floorNumber: '',
    purpose: '',
    date: '',
    userType: ''
  })

  const [gatePassMessage, setGatePassMessage] = useState([])

  const [receiptURL, setReceiptURL] = useState(null)
  const [isZoom, setIsZoom] = useState(false)
  const [loading, setLoading] = useState(false)


  const getMessage = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/get-room-allocation-detail`)
      const result = await response.json();
      console.log(result)

      setMessage(result.user)

    } catch (error) {
      console.log("error found!!!", error)
    }
  }


  const getGatePass = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/gate-pass-request`)
      const result = await response.json();

      // console.log(result)
      setGatePassMessage(result.user)
    } catch (error) {
      console.log("error found in gate pass getting", error)
    }
  }


  useEffect(() => {
    setLoading(true)
    const callFunction = async() => {
      try {
        await getMessage();
        await getGatePass();
        
      } catch (error) {
        console.log(('Function not called!!!', error))
      }
      finally{
        setLoading(false)
      }
    }

    callFunction()

  }, [])


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

  const handleClickGatePass = (index) => {
    setClick(true)
    const userInfo = gatePassMessage[index];
    console.log(userInfo)
    setPassUser({
      registrationNumber: userInfo.registrationNumber,
      userName: userInfo.userName,
      userEmail: userInfo.userEmail,
      roomNumber: userInfo.roomNumber,
      hostelName: userInfo.hostelName,
      floorNumber: userInfo.floorNumber,
      purpose: userInfo.purpose,
      date: userInfo.date,
      userType: userInfo.userType
    })
  }


  const handleConfirm = async () => {
    await sendConfirmation();
  }

  const sendConfirmation = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/admin/booking-confirmation/${user.registrationNumber}`, {
        method: 'POST',
      })

      const result = await response.json();
      console.log(result);

    } catch (error) {
      console.log("Error found!!!", error)
    }
    finally{
      setLoading(false)
    }

    setClick(false)
  }

  const handleCancellation = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/admin/cancel-booking/${user.registrationNumber}`, {
        method: 'POST'
      })

      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log("error: ", error)
    }
    finally{
      setLoading(false)
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


  const handleAllow = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/admin/gate-pass-confirmation/${passUser.registrationNumber}`, {
        method: 'POST'
      })

      const result = await response.json();
      console.log(result)

      setClick(false)

    } catch (error) {
      console.log("error to confirm gate pass", error)
    }
    finally{
      setLoading(false)
    }
  }

  const handleNotAllow = async () => {

  }

  const renderMessageItems = (items, handleClickFn) => {
    return items.map((item, index) => (
      <div className='w-full flex text-zinc-500 cursor-pointer inbox rounded-md py-2 bor' key={index + 1} onClick={() => handleClickFn(index)}>
        <div className='w-1/5 h-8 flex items-center pl-4 font-medium justify-center'>{item.userName}</div>
        <div className='w-1/5 h-8 flex items-center pl-4 justify-center'>{item.userType || 'Room Booking'}</div>
        <div className='w-3/5 h-8 flex items-center pl-4 justify-center'>{item.userType} Request Pending!!! of Room no. {item.roomNumber} in <span className='capitalize mx-1 mt-1 font-semibold'>{item.hostelName}</span>.</div>
      </div>
    ));
  };

  return (
    <div className='w-full min-h-screen flex'>
      <Navbar />
      <div className='w-4/5 min-h-screen p-8 relative'>
        <h1 className='text-2xl text-center font-semibold mb-6'>Inbox</h1>
        <div className='w-full border-t-2 border-zinc-200 py-4'>
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
            </div> : <></>
          }
          {
            click && passUser.userName ? <div className='w-[45vw] min-h-[60vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-black rounded-md p-4'>
              <MdCancel className='absolute text-[2rem] cursor-pointer text-zinc-600 -top-4 -right-4 bg-white rounded-full' onClick={handleCancel} />
              <div className='w-full h-full border border-zinc-200 rounded-md px-8 pt-10'>
                <h1 className='text-[1.6rem] font-semibold'>{passUser.userName}</h1>
                <div className='text-[0.9rem] h-[1rem] font-normal text-zinc-400 flex gap-2 items-center'>
                  <MdEmail />
                  <p>{passUser.userEmail}</p>
                </div>
                <h3 className='text-[1rem] font-semibold my-4'>Subject: <span className='font-medium text-green-500'>{passUser.userType}</span></h3>
                <p className='text-zinc-500'>Hello Admin, I want a {passUser.userType}. My room number is<span className='font-semibold text-black'> {passUser.roomNumber} </span> in <span className='uppercase font-semibold text-black'> {passUser.hostelName}. </span> </p>
                {
                  passUser.purpose ? <div className='w-full py-4 flex flex-col gap-2'>
                    <h3 className='text-[1.1rem] font-semibold text-red-500'>Purpose: <span className='font-medium text-[1.1rem] text-zinc-400 capitalize'>{passUser.purpose}</span></h3>
                    <h3 className='text-[1.1rem] font-semibold text-red-500'>Date of going: <span className='font-medium text-[1.1rem] text-zinc-400 capitalize'>{passUser.date}</span></h3>

                  </div> : <></>
                }

                <div className='w-full h-[3rem] my-8 flex gap-4'>
                  <button className='w-1/2 h-full rounded-md bg-red-100 border border-red-200 font-semibold text-red-500' onClick={handleNotAllow}>Decline</button>
                  <button className='w-1/2 h-full rounded-md bg-green-100 border border-green-200 font-semibold text-green-500' onClick={handleAllow}>Allow</button>
                </div>
              </div>
            </div> : <></>
          }
          {
            isZoom ? <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[96vh] shadow-2xl shadow-black rounded-md bg-white p-4'>
              <MdCancel className='absolute text-[2rem] cursor-pointer text-zinc-600 -top-4 -right-4 bg-white rounded-full' onClick={handleCancelZoom} />
              <img src={receiptURL} alt="" className='w-full h-full object-contain' />
            </div> : <></>
          }
          <div className='w-full'>
            <div className='w-full flex pt-1 bg-zinc-700 rounded'>
              <div className='w-1/5 h-10  flex items-center justify-center pl-4'>
                <h1 className='font-bold text-white'>From</h1>
              </div>
              <div className='w-1/5 h-10 flex items-center  justify-center pl-4 '>
                <h1 className='font-bold text-white'>Type</h1>
              </div>
              <div className='w-3/5 h-10  flex items-center justify-center pl-4'>
                <h1 className='font-bold text-white'>Message</h1>
              </div>
            </div>
            {(message.length > 0 || gatePassMessage.length > 0) ? (
              <div className='w-full'>
                {message.length > 0 && renderMessageItems(message, handleClick)}
                {gatePassMessage.length > 0 && renderMessageItems(gatePassMessage, handleClickGatePass)}
              </div>
            ) : (
              <div className='w-full p-4 flex flex-col justify-center items-center h-[60vh]'>
                <img src={message_illustration} alt='edit illustration' className='h-[15rem]' />
                <h1 className='text-[1.5rem] font-semibold mt-4'>Nothing in message box yet!</h1>
                <p className='text-[0.9rem] text-zinc-500 font-medium'>If you think there should be a message, then refresh it.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
