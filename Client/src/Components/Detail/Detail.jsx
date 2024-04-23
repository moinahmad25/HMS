import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Detail = () => {

    const [detail, setDetail] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            college: '',
            permanentAddress: '', // Assuming this is also a property in the fetched data
        }
    )
    const [btnNext, setBtnNext] = useState(false)

    const {id} = useParams()
    const navigate = useNavigate()
    // console.log(id)

    useEffect(() => {
        const studentDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/form/${id}`)
                const result = await response.json()
                // console.log(result)
                setDetail(result.isRegistrationValid)
                setBtnNext(true)
                // console.log(detail)
    
            } catch (error) {
                console.log("error found in get details", error)
            }
        }

        studentDetail();
    }, [])




    const handleDetail = async (e) => {
        e.preventDefault();

          
    }


    const handleClick =async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/form/${id}/generate-otp`, {
                method: "POST"
            })

            if (response.ok) {
                const result = await response.json()
                navigate(`/form/detail/${id}/otp-verification`)
            }

        } catch (error) {
            console.log("error on login, ", error)
        }
    }

    return (
        <div>
            <div className='w-full min-h-screen flex flex-col justify-center item-center pt-8 bg-[#0a0b19] form'>
                <div className="w-[30vw] min-h-[40vh] mx-auto my-4 p-4 flex items-center flex-col">
                    <h1 className='text-2xl font-bold mb-4'>Personal Detail Content</h1>
                    <form className='w-full' onSubmit={handleDetail}>
                        <div className='w-full flex gap-2'>
                            <input type="text" className="h-12 px-2 w-1/2 rounded-md bg-transparent mt-2 border border-zinc-300" placeholder='first name' disabled value={detail.firstName}/>
                            <input type="text" className="h-12 px-2 w-1/2 rounded-md bg-transparent mt-2 border border-zinc-300" placeholder='last name' disabled value={detail.lastName} />
                        </div>
                        <input type="email" className="h-12 px-2 w-full rounded-md bg-transparent mt-2 border border-zinc-300" placeholder='email' disabled value={detail.email} />
                        <input name='phone' type="number" className="h-12 w-full rounded-md border bg-transparent border-zinc-300 regInput mt-2" placeholder='phone' disabled value={detail.phone} />
                        <select name="" id="" className='w-full mt-2 bg-transparent border border-[#d4d4d8] h-12 rounded-md text-[#89a3af] px-2' disabled value={detail.college}>
                            <option value="">college</option>
                            <option value="brcmcet">BRCMCET</option>
                            <option value="gdc">GDC Memorial</option>
                            <option value="brcmlaw">BRCM Law</option>
                        </select>
                        <textarea type="text" className="min-h-6 px-2 py-2 w-full rounded-md bg-transparent mt-2 border border-zinc-300 resize-none" placeholder='permanent address' disabled value={detail.permanentAddress}></textarea>
                    </form>
                    <button onClick={handleClick} className="  w-full h-12 text-[0.8rem] text-zinc-50 rounded-md py-1 px-4 float-right mt-2 submitBtn" style={btnNext ? {pointerEvents:"all", background:"dodgerblue"}:{pointerEvents:"none", background:"gray"}}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Detail
