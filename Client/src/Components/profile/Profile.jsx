import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import './Profile.css'
import { FaImage } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import security_gate from '../../assets/security-gate.png'
import { MdCancel } from "react-icons/md";
import { useAuth } from '../../store/auth';
import default_profile from '../../assets/illustration/default_profile.svg'
import back_default_profile from '../../assets/illustration/back_default_img.jpg'
import card_bg from '../../assets/card_bg.jpg'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';


const Profile = () => {
  const { id } = useParams();
  const [verified, setVerified] = useState(false)
  const [profileImg, setProfileImg] = useState([])
  const [receipt, setReceipt] = useState([]);
  const [img, setImg] = useState(null)
  const [selectedBox, setSelectedBox] = useState(null);
  const [bhabhaRoom, setBhabhaRoom] = useState([])
  const [abdulKalamRoom, setAbdulKalamRoom] = useState([])
  const [roomDetail, setRoomDetail] = useState({
    roomNumber: '',
    hostelName: ''
  })

  const [isAllowed, setIsAllowed] = useState(null)

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: '',
    permanentAddress: ''
  })

  const [room, setRoom] = useState({
    hostelName: '',
    floorNumber: '',
    roomNumber: '',
    userType: 'Room Booking'
  })

  const [roomMsg, setRoomMsg] = useState({
    type: '',
    message: ''
  })

  // const [dateState, setGatePass] = useState('')

  // const [purpose, setPurpose] = useState('')

  const [gatePass, setGatePass] = useState({
    date: '',
    purpose:''
  })

  const fileRef = useRef()
  const navigate = useNavigate()
  const { isHostelBtnClicked, setIsHostelBtnClicked, isPassBtnClicked, setIsPassBtnClicked } = useAuth()


  // room generate
  const floors = ['0th', '1st', '2nd'];
  const roomsPerFloor = 39; // Assuming each floor has 30 rooms
  const roomNumbers = Array.from({ length: floors.length * roomsPerFloor }, (_, i) => {
    const floorNumber = Math.floor(i / roomsPerFloor) + 1;
    const roomNumber = (i % roomsPerFloor) + 1;
    return `${floorNumber}${roomNumber < 10 ? '0' : ''}${roomNumber}`;
  });

  // handling date
  const handleGate = (e) => {
    const {name, value} = e.target;
    setGatePass((old) => ({...old, [name]: value}))
    console.log(e.target.name)
  }


  useEffect(() => {
    const gettingDetail = async () => {
      const response = await fetch(`http://localhost:5000/api/form/${id}`)
      const result = await response.json();

      // setting user's room and hostel if they got allocated
      // setIsAllowed(result.isUserApplied.isAllocated)
      console.log(result)

      // if (result.isUserApplied.isAllocated) {
      //   setRoomDetail({
      //     roomNumber: result.isUserApplied.roomNumber,
      //     hostelName: result.isUserApplied.hostelName
      //   })
      // }
      // else {
      //   setRoomDetail({
      //     roomNumber: 'Not Selected',
      //     hostelName: 'Not Selected'
      //   })
      // }



      setVerified(result.isRegistrationValid.isVerified)
      setUser({
        firstName: result.isRegistrationValid.firstName,
        lastName: result.isRegistrationValid.lastName,
        email: result.isRegistrationValid.email,
        phone: result.isRegistrationValid.phone,
        college: result.isRegistrationValid.college,
        permanentAddress: result.isRegistrationValid.permanentAddress
      })
    }

    const getRoomAllocationDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/form/${id}`)
        const result = await response.json();
        console.log(result)
        // setting user's room and hostel if they got allocated
        setIsAllowed(result.isUserApplied.isAllocated)

        if (result.isUserApplied.isAllocated) {
          setRoomDetail({
            roomNumber: result.isUserApplied.roomNumber,
            hostelName: result.isUserApplied.hostelName
          })
        }
        else {
          setRoomDetail({
            roomNumber: 'Not Selected',
            hostelName: 'Not Selected'
          })
        }
      } catch (error) {
        
      }
      
    }

    const confirmedRooms = async () => {

      try {
        const response = await fetch(`http://localhost:5000/api/user/get-confirmed-rooms`)
        const result = await response.json();

        setBhabhaRoom(result.message[0].allocatedRoomNumbers)
        setAbdulKalamRoom(result.message[1].allocatedRoomNumbers)

      } catch (error) {
        // console.log("error found in confirmed rooms!!!", error)
      }

    }

    gettingDetail();
    confirmedRooms();
    getRoomAllocationDetail();

  }, [])

  useEffect(() => {
    const getImage = async () => {
      const response = await fetch(`http://localhost:5000/api/form/get-image/${id}`)
      const result = await response.json();
      setImg(result);
    }
    getImage()

  }, [img])



  const onFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Now you can work with the files array
      setProfileImg(files)
    } else {
      console.error('No files selected or invalid FileList');
    }

  }

  const handleFile = (e) => {
    if (fileRef.current) {
      fileRef.current.click();

      handleSubmit(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', profileImg[0])


    try {
      const response = await fetch(
        `http://localhost:5000/api/form/add-image/${id}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result)

      if (!response.ok) {
        throw new Error('Error uploading image');
      }

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  const handleHostelClick = () => {
    setIsHostelBtnClicked(true)
    setIsPassBtnClicked(false)
  }

  const handleCancel = () => {
    setIsHostelBtnClicked(false)
  }

  const handleRoomSubmit = async () => {
    setIsHostelBtnClicked(false)

    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}/pending-room-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(room)
      })

      const result = await response.json();
      console.log(result)
      if (result.status === 'Failed!!!') {
        setRoomMsg({
          type: 'Failed',
          message: `Failed!!! ${result.message}`
        })
        setTimeout(() => {
          setRoomMsg({
            type: '',
            message: ''
          })
        }, 3000)
      }
      else {
        setRoomMsg({
          type: 'Success',
          message: `Applied!!! ${result.message}`
        })
        setTimeout(() => {
          setRoomMsg({
            type: '',
            message: ''
          })
        }, 3000)
      }

    } catch (error) {
      console.log("error", error)
      // clg(error.message)
    }
  }

  const handlePassClick = () => {
    setIsPassBtnClicked(true)
    setIsHostelBtnClicked(false)
  }

  const handlePassCancel = () => {
    setIsPassBtnClicked(false)
  }

  // handling the room selection situation
  const handleClick = (floorIndex, roomIndex) => {
    setSelectedBox({ floor: floorIndex, room: roomIndex });

    const roomNumber = `${floorIndex + 1}${roomIndex + 1 < 10 ? '0' : ''
      }${roomIndex + 1}`

    setRoom((prev) => ({
      ...prev,
      floorNumber: floors[floorIndex],
      roomNumber
    }))
  }


  const handleChange = (e) => {
    setRoom((prev) => ({
      ...prev,
      hostelName: e.target.value
    }))
  }


  const handleReceipt = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const receiptImg = Array.from(e.target.files);
      setReceipt(receiptImg);
    }
  }


  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('receipt', receipt[0])


    try {
      const response = await fetch(
        `http://localhost:5000/api/form/add-receipt/${id}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result)

      setRoomMsg({
        type: 'Success',
        message: result.message
      })
      setTimeout(() => {
        setRoomMsg('')
      }, 3000)

      if (!response.ok) {
        throw new Error('Error uploading image');
      }

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  // gate pass functionality

  const handleGatePassClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/form/apply-gate-pass/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(gatePass)
        });

        const result = await response.json();
        if(response.ok){
          setRoomMsg({
            type: 'Success',
            message: `Created!!! ${result.message}`
          })
          setTimeout(() => {
            setRoomMsg('')
          }, 3000)
        }
        else {
          setRoomMsg({
            type: 'Failed',
            message: `Failed!!! ${result.message}`
          })
          setTimeout(() => {
            setRoomMsg({
              type: '',
              message: ''
            })
          }, 3000)
        }
        console.log(result)

    } catch (error) {
      console.log("error found in gate pass", error)
    }
  }


  return (
    <div className='w-full min-h-screen flex justify-center gap-6 item-center p-8 ' >
      <img src={back_default_profile} className='h-full w-full fixed top-0 left-0 -z-[180] bg_filter' alt="" />
      {
        roomMsg.type === 'Success' ? <div className='py-2 px-4 bg-green-500 text-green-50 rounded-md absolute z-[180] top-[2rem] left-1/2 -translate-x-1/2 -translate-y-1/2 capitalize text-center'>{roomMsg.message}</div> :
          roomMsg.type === 'Failed' ? <div className='py-2 px-4 text-red-50 rounded-md bg-red-500 absolute z-[180] top-[2rem] left-1/2 -translate-x-1/2 -translate-y-1/2 capitalize text-center'>{roomMsg.message}</div> : <></>
      }
      {
        isHostelBtnClicked ? <div className='z-[150] w-[50vw] min-h-[92vh] bg-white fixed top-[3%] left-1/2 -translate-x-1/2 rounded-md shadow-2xl border-2 border-zinc-200 py-4'>
          <MdCancel className='absolute text-[2rem] z-[160] cursor-pointer text-zinc-600 -top-4 -right-4 bg-white rounded-full' onClick={handleCancel} />
          <div className='w-[40vw] min-h-[10vh] mx-auto'>
            <div className="sm:col-span-3 bg-white">
              <label htmlFor="hostel" className="block text-sm font-medium ml-2 leading-2 text-gray-900">
                Select Hostel
              </label>
              <div className="mt-2">
                <select
                  id="hostel"
                  name="hostelName"
                  autoComplete="hostel-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2"
                  onChange={handleChange}
                  value={room.hostelName}
                >
                  <option value=''>choose a hostel room</option>
                  <option value='bhabha hostel'>Bhabha Hostel</option>
                  <option value='abdul kalam hostel'>Abdul Kalam Hostel</option>
                </select>
              </div>
            </div>
            {
              room.hostelName === 'bhabha hostel' ? <div className='w-full mt-4 bg-white'>
                <label className='block text-sm ml-2 font-medium leading-6 text-gray-900'>Choose room</label>
                <div className="w-full min-h-[40vh] border-2 my-2 p-4 border-zinc-300 rounded-lg">
                  <div className='w-full'>
                    {floors.map((floor, floorIndex) => (
                      <div className='w-full' key={floorIndex + 1}>
                        <div className='w-full min-h-[33%]'>
                          <div className='flex gap-2 items-center w-full h-full justify-center'>
                            <span className="w-[4rem] h-[1.2px] bg-zinc-300"></span>
                            <p className='text-[0.7rem] text-zinc-400'>{floor} floor</p>
                            <span className="w-[4rem] h-[1.2px] bg-zinc-300"></span>
                          </div>
                          <div className='w-full min-h-full p-2 flex gap-2 flex-wrap'>
                            {roomNumbers
                              .slice(floorIndex * roomsPerFloor, (floorIndex + 1) * roomsPerFloor)
                              .map((roomItem, roomIndex) => (
                                <div
                                  key={roomIndex + 1}
                                  className={`w-6 h-6 border cursor-pointer rounded-sm border-zinc-200 text-[0.7rem] flex justify-center items-center p-[0.8px] ${selectedBox?.floor === floorIndex && selectedBox?.room === roomIndex ? 'bg-green-700 text-white' : 'text-zinc-600'
                                    }`}
                                  onClick={() => handleClick(floorIndex, roomIndex)} style={bhabhaRoom.includes(roomItem) ? { background: "#c0c0c0", cursor: 'not-allowed', color: 'white' } : {}}
                                >
                                  {roomItem}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> :
                room.hostelName === 'abdul kalam hostel' ?
                  <div className='w-full mt-4'>
                    <label className='block text-sm ml-2 font-medium leading-6 text-gray-900'>Choose room</label>
                    <div className="w-full min-h-[10vh] border-2 my-2 p-4 border-zinc-300 rounded-lg">
                      <div className='w-full'>
                        {floors.map((floor, floorIndex) => (
                          <div className='w-full' key={floorIndex + 1}>
                            <div className='w-full min-h-[33%]'>
                              <div className='flex gap-2 items-center w-full h-full justify-center'>
                                <span className="w-[4rem] h-[1.2px] bg-zinc-300"></span>
                                <p className='text-[0.7rem] text-zinc-400'>{floor} floor</p>
                                <span className="w-[4rem] h-[1.2px] bg-zinc-300"></span>
                              </div>
                              <div className='w-full min-h-full p-2 flex gap-2 flex-wrap'>
                                {roomNumbers
                                  .slice(floorIndex * roomsPerFloor, (floorIndex + 1) * roomsPerFloor)
                                  .map((roomItem, roomIndex) => (
                                    <div
                                      key={roomIndex + 1}
                                      className={`w-6 h-6 border cursor-pointer rounded-sm border-zinc-200 text-[0.7rem] flex justify-center items-center p-[0.8px] ${selectedBox?.floor === floorIndex && selectedBox?.room === roomIndex ? 'bg-green-700 text-white' : 'text-zinc-600'
                                        }`}
                                      onClick={() => handleClick(floorIndex, roomIndex)} style={abdulKalamRoom.includes(roomItem) ? { background: "#c0c0c0", cursor: 'not-allowed', color: 'white' } : {}}
                                    >
                                      {roomItem}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> : <></>
            }

            <button className='py-2 mt-2 px-4 w-[8rem] bg-black text-white rounded-md' onClick={handleRoomSubmit}>Submit</button>
          </div>


        </div> : <></>
      }
      {
        isPassBtnClicked ? <div className='w-[40vw] h-[70vh] bg-white rounded-md  fixed top-[10%] left-1/2 -translate-x-1/2 z-[150] shadow-2xl shadow-black border-2 border-zinc-200 p-4'>
          <MdCancel className='absolute text-[2.5rem] cursor-pointer text-zinc-600 -top-4 -right-4 bg-white rounded-full z-[100]' onClick={handlePassCancel} />
          <div className='w-full h-full card_bg rounded-md relative p-4'>
            <img src={card_bg} alt="" className='w-full h-full object-cover rounded-md absolute top-0 left-0 -z-[100]' />
            <div className='w-full h-full border-2 border-zinc-500 rounded-md p-4'>
              <div className='w-full min-h-[40px] flex justify-between'>
                <div className='w-1/2 h-full'>
                  <h1 className='text-[2rem] text-zinc-300 font-semibold text-nowrap'>{user.firstName} {user.lastName}</h1>
                  <p className='text-zinc-500 text-[0.9rem] -mt-[8px]'>CSE, 8th sem, <span className='uppercase'>{user.college}</span></p>
                </div>
                <div className='w-1/2 h-full mt-4 relative'>
                  <label htmlFor="dateInput" className=' text-zinc-300 bg-[#262044] p-1 text-nowrap absolute -top-4 left-[50%] text-[0.9rem] font-semibold -translate-x-1/2 pointer-events-none'>Choose Date</label>
                  <input type="date" name="date" id="dateInput" value={gatePass.date} onChange={handleGate} className='w-[75%] px-2 text-zinc-300 float-right h-[3rem] rounded-md bg-transparent border-zinc-300 border cursor-pointer' style={{ '--icon-color': 'gray' }} />
                </div>
              </div>
              <h2 className='capitalize text-zinc-300 mt-4 text-[1.1rem] font-medium'><span className='text-zinc-400'>Hostel:</span> {roomDetail.hostelName}</h2>
              <h2 className='capitalize text-zinc-300 text-[1.1rem] font-medium'><span className='text-zinc-400'>Room:</span> {roomDetail.roomNumber}</h2>
              <h2 className='capitalize text-zinc-300 text-[1.1rem] font-medium'><span className='text-zinc-400'>Reg No.:</span> {id}</h2>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': {
                    mt: 4,
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'lightgray', // Change border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'lightgray', // Change border color when focused
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'lightgray', // Change label color
                    },
                    '& .MuiInputBase-root': {
                      color: 'lightgray', // Change input text color
                    },
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Purpose of going"
                    multiline
                    maxRows={4}
                    name='purpose'
                    value={gatePass.purpose}
                    onChange={handleGate}
                  />
                </div>
              </Box>
              <button className=' py-[0.6rem] px-4 w-[10rem] font-semibold btnApply text-zinc-300 border-2 border-zinc-300 rounded-md bg-transparent transition-all absolute bottom-[2.5rem] right-[2rem] ' onClick={handleGatePassClick}>Apply</button>


            </div>
          </div>
        </div> : <></>
      }
      <div className='w-1/4 h-[91vh] border-2 bg-white border-zinc-200 rounded-lg relative'>
        <div className='w-full h-full profile_section absolute top-0 left-0'>
          {
            img ? <div className='w-full bg-white h-[55%] overflow-hidden flex justify-center items-center'>
              <img src={img} alt={`selected`} className='blur-sm brightness-75' />
            </div> : <div className='w-full h-[55%] overflow-hidden flex justify-center items-center'>
              <img src={back_default_profile} alt={`selected`} className='h-full object-cover' />
            </div>
          }

        </div>
        <div className='w-full h-[82.75vh] rounded-lg absolute top-[3.5rem] left-0 flex flex-col gap-4 items-center  z-50'>
          <div className="w-[8rem] relative h-[8rem] rounded-full bg-white flex justify-center items-center">
            <form onSubmit={handleSubmit}>
              <label htmlFor='selectFile' onClick={onFileInput} className='w-[3rem] h-[3rem] rounded-full bg-white flex justify-center items-center absolute bottom-2 -right-4 cursor-pointer'>
                <FaCirclePlus style={{ color: 'grey', fontSize: '2.4rem' }} />
                <input type="file" accept='image' style={{ display: 'none' }} onChange={handleFile} name="image" id="selectFile" ref={fileRef} />
              </label>
            </form>
            {
              img ? <div className='w-[7rem] h-[7rem] rounded-full overflow-hidden flex justify-center items-center'>
                <img src={img} alt={`selected`} />
              </div> : <div className='w-[7rem] h-[7rem] rounded-full overflow-hidden flex justify-center items-center'>
                <img src={default_profile} alt={`selected`} className='h-full w-full object-cover' />
              </div>
            }


          </div>
          <div className='w-full px-4'>
            <h1 className='text-[1.4rem] font-semibold text-white text-center'>{user.firstName} {user.lastName}</h1>
            <p className='text-white text-center uppercase'>{user.college}</p>
          </div>
        </div>
      </div>
      <div className='w-2/4 bg-white border-2 border-zinc-200 rounded-lg p-6 pb-8'>
        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-2 text-gray-900">
            Fee receipt
          </label>
          <div className="mt-2 flex flex-col items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center pb-6">
              <FaImage className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-2 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Choose a file</span>
                  <input id="file-upload" name="file-upload" onChange={handleReceipt} type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
            </div>
            <button className='py-[0.30rem] px-4 rounded-md bg-zinc-700 text-white text-[0.8rem]' onClick={handleUpload}>Upload Now</button>
          </div>
        </div>
        <div className='w-full mt-4'>
          <label className='block text-sm font-medium leading-2 text-gray-900'>Apply</label>
          <div className='w-full flex gap-4 justify-center mt-2'>
            <div className='w-1/2 h-[9rem] cursor-pointer rounded-md flex items-center gap-2 border-2 border-zinc-200 px-4' onClick={handleHostelClick}>
              <div className='w-1/3 h-full flex items-center justify-center'>
                <IoHome className="mx-auto h-[4.5rem] w-[4.5rem] text-gray-500" aria-hidden="true" />
              </div>
              <div className='2/3 h-full py-[2.3rem] '>
                <h1 className='font-semibold text-[1.1rem] '>Book A Hostel Room</h1>
                <p className='text-zinc-500 text-[0.95vmax]'>Book a hostel room according to your choice.</p>
              </div>
            </div>
            <div className='w-1/2 h-[9rem] cursor-pointer rounded-md flex items-center gap-2 border-2 border-zinc-200 px-4' onClick={handlePassClick}>
              <div className='w-1/3 h-full flex items-center justify-center'>
                {/* <IoHome className="mx-auto h-[4.5rem] w-[4.5rem] text-gray-500" aria-hidden="true" /> */}
                <img src={security_gate} alt="" className='h-[4.2rem]' />
              </div>
              <div className='2/3 h-full py-[2.3rem] '>
                <h1 className='font-semibold text-[1.1rem] '>Get a gate pass</h1>
                <p className='text-zinc-500 text-[0.95rem]'>Apply for gate pass to go somewhere. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile