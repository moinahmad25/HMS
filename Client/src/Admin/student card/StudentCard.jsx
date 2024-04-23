import React, { useState } from 'react'

// icons
import { FaSchool } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import EditStudent from '../EditStudent';
import { MdDelete } from "react-icons/md";
import { useAuth } from '../../store/auth';

const StudentCard = (props) => {

    const { isClicked } = useAuth();
    const { setIsClicked } = useAuth()

    // const [isDeleted, setIsDeleted] = useState(false)


    const handleClick = () => {
        setIsClicked(true)
    }

    const handleDelete = async () => {
        const registrationNumber = props.regNumber;

        try {
            const response = await fetch(`http://localhost:5000/api/admin/${props.regNumber}`,{
                method:"DELETE"
            });

            if(response.ok){
                console.log("Data deleted!!!")
            }
            else{
                console.log("Data already deleted!!!")
            }

            
        } catch (error) {
            
        }
    }



    return (
        <>
            <div className='w-[18rem] min-h-[8rem] relative border-zinc-200 border-2 rounded-md shadow-lg shadow-gray-200'>
                <div className='w-full h-full rounded-md p-4 flex flex-col gap-2'>
                    <h1 className='text-[1.5rem] text-center font-semibold'>{props.fname} {props.lname}</h1>
                    <div className='w-full flex justify-between'>
                        <div className='w-1/2 flex gap-2'>
                            <FaSchool style={{ color: 'gray' }} />
                            <p className='text-[0.8rem] font-semibold uppercase' style={{ color: 'gray' }}>{props.college}</p>
                        </div>
                        <div className='w-1/2'>
                            <p className='text-[0.8rem] text-right font-semibold' style={{ color: 'gray' }}>CSE, 8th sem</p>
                        </div>
                    </div>
                    <div className='w-full flex gap-2'>
                        <FaHouse style={{ color: 'gray' }} />
                        <p className='text-[0.8rem] text-right font-semibold' style={{ color: 'gray', textTransform:'capitalize' }}>{props.hostelName} (Room No: <span className='text-red-600'>{props.roomNumber}</span>)</p>
                    </div>
                    <div className='w-full flex gap-2'>
                        <MdEmail style={{ color: 'gray' }} />
                        <p className='text-[0.8rem] text-right font-semibold' style={{ color: 'gray' }}>{props.email}</p>
                    </div>
                    <div className='w-full flex gap-2'>
                        <IoCall style={{ color: 'gray' }} />
                        <p className='text-[0.8rem] text-right font-semibold' style={{ color: 'gray' }}>{props.phone}</p>
                    </div>
                </div>
                {
                    props.type === 'edit' ?
                        <button onClick={handleClick} className='absolute -right-6 -bottom-6 w-[3rem] h-[3rem] rounded-full flex justify-center items-center border-2 border-zinc-200 bg-white'>
                            <MdEdit style={{ fontSize: '1.5rem' }} />
                        </button> :
                        <button onClick={handleDelete} className='absolute -right-6 -bottom-6 w-[3rem] h-[3rem] rounded-full flex justify-center items-center border-2 border-zinc-200 bg-white'>
                            <MdDelete style={{ fontSize: '1.5rem' }} />
                        </button>
                }

            </div>
            {
                isClicked ?
                    <EditStudent fname={props.fname} lname={props.lname} college={props.college} email={props.email} phone={props.phone} regNumber={props.regNumber} permanentAddress={props.permanentAddress} /> :
                    <></>
            }

        </>
    )
}

export default StudentCard
