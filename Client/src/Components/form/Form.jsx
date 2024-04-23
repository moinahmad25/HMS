import React, { useEffect, useState } from 'react'
import './Form.css'
// import { space } from 'postcss/lib/list';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth';
// import detail from '../../Forms';



const Form = () => {
  const [regNumber, setRegNumber] = useState({ registrationNumber: '' })
  const [regError, setRegError] = useState('')
  const [btnNext, setBtnNext] = useState(false)
  const navigate = useNavigate()

  const { storeTokenToLocal } = useAuth()
  // const { storeEmailToLocal } = useAuth()
  // const [error, setError] = useState()

  let roomNumber = [];
  for (let i = 1; i <= 39; i++) {
    roomNumber.push(i);
  }


  const handleRegister = (e) => {
    setRegNumber({ registrationNumber: e.target.value })
    setRegError('')
    // console.log(regNumber)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (regNumber.registrationNumber.length !== 0) {
      if (regNumber.registrationNumber.length !== 10) {
        if (regNumber.registrationNumber.length < 10) {
          setRegError("registration number is shorter!!!")
        }
        else {
          setRegError("registration number is longer!!!")
        }
      }
      else {
        setRegError('')
      }
    }
    else {
      setRegError('please enter your registration number!!!')
    }


    // post operation to verify with DB
    try {
      const response = await fetch(`http://localhost:5000/api/form/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regNumber),
      })

      if (response.ok) {
        const result = await response.json();
        console.log("getting response: ", result)

        // storing the data to local storage
        storeTokenToLocal(result.token)
        // storeEmailToLocal(result.email)
        setBtnNext(true)
      }

    } catch (error) {
      console.log("error on login, ", error)
    }
  }

  const getDetail = () => {
    navigate(`/form/detail/${regNumber.registrationNumber}`)
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-center item-center pt-8 bg-[#0a0b19] form'>
      <div className="w-[30vw] h-[40vh] flex flex-col justify-center items-center mx-auto my-4 p-4 ">
        <h1 className='text-2xl font-bold mb-4'>Registration Verification</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <div className='relative w-full mt-8 h-[4rem]'>
            <label htmlFor="registrationNumber" className='absolute -top-6 left-2 border bg-[#0a0b19] border-zinc-50 rounded-md p-1 text-[0.8rem]'>registration number</label>
            <input onChange={handleRegister} name='registrationNumber' value={regNumber.registrationNumber} type="number" id='regNo' className="h-12 w-full rounded-md border bg-transparent border-zinc-300 regInput" autoFocus />
            {
              regError.length ? <span className='text-red-300 text-[0.8rem] mt-4'>{regError}</span> : <></>
            }
            <div className='w-full h-12 gap-4 flex justify-between mt-2'>
              <button type="submit" className=" w-1/2 h-full text-[0.8rem] text-zinc-50 rounded-md py-1 px-4 float-right mt-2" style={btnNext ? { background: "#005eff8c" } : { background: "dodgerblue" }}>Verify</button>
              <button onClick={getDetail} className="  w-1/2 h-full text-[0.8rem] text-zinc-50 rounded-md py-1 px-4 float-right mt-2 submitBtn" style={btnNext ? { pointerEvents: "all", background: "dodgerblue" } : { pointerEvents: "none", background: "gray" }}>Next</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Form
