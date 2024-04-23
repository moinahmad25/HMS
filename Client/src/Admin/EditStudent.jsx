import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import './EditStudent.css'

import { MdCancel } from "react-icons/md";

const EditStudent = (props) => {

    const [updateDetail, setUpdateDetail] = useState({
        firstName: props.fname,
        lastName: props.lname,
        email: props.email,
        phone: props.phone,
        college: props.college,
        permanentAddress: props.permanentAddress,
    })

    const { setIsClicked } = useAuth()
    const { isClicked } = useAuth()


    console.log(isClicked)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUpdateDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value
        }))

    }

    const handleClick = () => {
        setIsClicked(false)
    }

    const handleUpdate = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/update-detail/${props.regNumber}`, {
                method: 'PATCH',
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateDetail)
            })

            setIsClicked(false)

            console.log(updateDetail)

            const result = await response.json();
            console.log(result)

        } catch (error) {
            console.log("Error!!! Something mistaken in code!!!", error)
        }
    }




    return (
        <>
            {
                isClicked ?
                    <div className='w-[40rem] h-[70vh] bg-white border-2 border-gray-300 shadow-2xl rounded-md absolute top-[20%] left-1/2 -translate-x-1/2 p-6 overflow-y-scroll scroller'>
                        {/* <button  className='text-white'>x</button> */}
                        <MdCancel onClick={handleClick} className='cursor-pointer text-2xl absolute right-4 top-4' />
                        <div class=" pb-12">
                            <h2 class="text-2xl font-semibold leading-7 text-gray-900 text-center">Personal Information</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600 text-center">Use a permanent address where you can receive mail.</p>

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                    <div class="mt-2">
                                        <input onChange={handleChange} type="text" name="firstName" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  defaultValue={props.fname} />
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                    <div class="mt-2">
                                        <input onChange={handleChange} type="text" name="lastName" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  defaultValue={props.lname} />
                                    </div>
                                </div>

                                <div class="sm:col-span-4">
                                    <label for="r-number" class="block text-sm font-medium leading-6 text-gray-900">Registration Number</label>
                                    <div class="mt-2">
                                        <input id="r-number" name="registrationNumber" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 cursor-not-allowed" defaultValue={props.regNumber} disabled />
                                    </div>
                                </div>

                                <div class="sm:col-span-4">
                                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    <div class="mt-2">
                                        <input onChange={handleChange} id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" defaultValue={props.email}  />
                                    </div>
                                </div>
                                <div class="sm:col-span-4">
                                    <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                                    <div class="mt-2">
                                        <input onChange={handleChange} id="phone" name="phone" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  defaultValue={props.phone} />
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">College</label>
                                    <div class="mt-2">
                                        <select onChange={handleChange} id="country" name="college" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"  defaultValue={props.college}>
                                            <option value=""></option>
                                            <option value="brcmcet">BRCMCET</option>
                                            <option value="gdc">GDC Memorial</option>
                                            <option value="brcmlaw">BRCM Law</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='sm:col-span-6'>
                                    <label htmlFor="permanentAddress" className='font-semibold text-[0.9rem]'>Permanent Address</label>
                                    <textarea onChange={handleChange} type="text" className="min-h-6 px-2 py-2 w-full rounded-md bg-transparent mt-2 border border-zinc-200 resize-none shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600" name='permanentAddress' defaultValue={props.permanentAddress} />

                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[2rem] flex justify-center items-center'>
                        <button className='bg-black rounded-md py-2 px-6 text-white font-semibold ' onClick={handleUpdate}>Update</button>
                        </div>

                    </div>
                    :
                    <></>
            }

        </>
    )
}

export default EditStudent
