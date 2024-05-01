import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Otp.css'

const Otp = () => {
    const { id } = useParams()
    // console.log(id)
    const [btnNext, setBtnNext] = useState(false)
    const [otpInp, setOtpInp] = useState({ otp: '' })
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const [secEmail, setSecEmail] = useState('')
    const [msg, setMsg] = useState({
        status:'',
        message:''
    })

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const studentDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/form/${id}`)
                const result = await response.json()


                // mixing the email with star
                const email = result.isRegistrationValid.email;
                let protectedEmail = "";

                for (let i = 0; i < email.length; i++) {
                    if (i >= 4 && i <= 8) {
                        protectedEmail += '*';
                    } else {
                        protectedEmail += email[i];
                    }
                }

                // setting the protected email to useState
                setSecEmail(protectedEmail)

            } catch (error) {
                console.log("error found in get details", error)
            }
        }

        studentDetail();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await fetch(`http://localhost:5000/api/form/${id}/otp-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(otpInp)
            })

            const result = await response.json();
            if (response.ok) {
                setMsg({
                    status: result.status,
                    message: result.msg
                })
                setBtnNext(true)

                setTimeout(() => {
                    setMsg({
                        status: '',
                        message: ''
                    })
                }, 3000)
            }
            else{
                setMsg({
                    status: result.status,
                    message: result.msg
                })
                setBtnNext(false)

                setTimeout(() => {
                    setMsg({
                        status: '',
                        message: ''
                    })
                }, 3000)
            }

        } catch (error) {
            console.log("error on login, ", error)
        }
        finally{
            setLoading(false)
        }
    }

    const handleInput = (e) => {
        setOtpInp({ otp: e.target.value })
        if (otpInp.otp.length === 5) {
            inputRef.current.blur()
        }
    }

    const getLogin = () => {
        navigate(`/user/profile/${id}`)
    }

    const handleReset = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/api/form/${id}/resend-otp`,{
                method:'POST'
            })

            const result = await response.json()
            if(response.ok){
                console.log(result)
                setMsg({
                    status: result.status,
                    message: result.msg
                })

                setTimeout(() => {
                    setMsg({
                        status: '',
                        message: ''
                    })
                }, 3000)
            }
            else{
                console.log(result)
            }
            
        } catch (error) {
            console.log("error on login, ", error)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div className='w-full min-h-screen flex flex-col justify-center item-center pt-8 bg-[#0a0b19] form relative'>
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
                msg.status === 'verified' ? <div className='py-2 px-2 bg-green-500 text-green-50 rounded-md absolute z-[180] top-[4rem] left-1/2 -translate-x-1/2 -translate-y-1/2 capitalize text-center'>{msg.message}</div> : msg.status === 'failed' ? <div className='py-2 px-2 text-center bg-red-500 text-red-50 rounded-md absolute z-[180] top-[4rem] left-1/2 -translate-x-1/2 -translate-y-1/2 capitalize'>{msg.message}</div> : <></>
            }
            <div className='w-[30vw] min-h-[40vh] mx-auto my-4 p-4 flex items-center flex-col'>
                <h1 className='text-[2.2rem] font-bold text-center'>OTP Verification</h1>
                <p className='text-white text-center'>Enter otp code sent to <span style={{letterSpacing:'1px'}}>{secEmail}</span></p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
                    <div className='relative w-full mt-8 h-[4rem]'>
                        <label htmlFor="registrationNumber" className='absolute -top-6 left-2 border bg-[#0a0b19] border-zinc-50 rounded-md p-1 text-[0.8rem]'>enter your 6-digit OTP</label>
                        <input onChange={handleInput} name='registrationNumber' value={otpInp.otp} type="number" id='regNo' className="h-12 w-full rounded-md border bg-transparent border-zinc-300 regInput" autoFocus ref={inputRef} />

                        <div className='w-full flex flex-col items-center justify-center h-[4rem] mt-2'>
                            <h2 className='text-[1rem] font-medium'>Didn't receive OTP code?</h2>
                            <button onClick={handleReset} className='text-[dodgerblue] font-semibold'>Resend OTP</button>
                        </div>
                        <div className='w-full h-12 gap-4 flex justify-between mt-4'>
                            <button type="submit" className=" w-1/2 h-full text-[0.8rem] text-zinc-50 rounded-md py-1 px-4 float-right mt-2" style={btnNext ? { background: "#005eff8c" } : { background: "dodgerblue" }}>Verify</button>
                            <button onClick={getLogin} className="  w-1/2 h-full text-[0.8rem] text-zinc-50 rounded-md py-1 px-4 float-right mt-2 submitBtn" style={btnNext ? { pointerEvents: "all", background: "dodgerblue" } : { pointerEvents: "none", background: "gray" }}>Go to profile</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Otp
