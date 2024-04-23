import React, { useEffect, useState } from 'react'
import './Navbar.css'
// import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";
import { MdMoveToInbox } from "react-icons/md";
import { LuUserCog } from "react-icons/lu";

const Navbar = () => {
    // const navigate = useNavigate();

    const [link, setLink] = useState("dashboard")

    // useEffect(() => {
    //     setLink("dashboard")
    // }, [])


    return (
        <div className='w-1/5 min-h-screen bg-black text-white py-8 flex flex-col items-center'>
            <h1 className='text-2xl font-medium'>Hostel Vibhag Logo.</h1>
            <div className='w-full h-full px-8 py-8'>

                <NavLink to='/admin' onClick={() => { setLink("dashboard") }} className={`dashboard w-full h-[2.5rem]  flex gap-4 items-center p-4 rounded-md mt-2  ${link === "dashboard" ? 'active' : 'inactive'}`} ><MdOutlineDashboard style={{ fontSize: '1.5rem' }} /> <span className='text-[1rem] font-normal'>Dashboard</span></NavLink>

                <NavLink to='/admin/add' onClick={() => { setLink("add") }} className={`add w-full h-[2.5rem] flex gap-4 items-center p-4 rounded-md mt-2   ${link === "add" ? 'active' : 'inactive'}`} ><FiUserPlus style={{ fontSize: '1.5rem' }} /> <span className='text-[1rem] font-normal'>Add Student</span></NavLink>

                <NavLink to='/admin/edit' onClick={() => { setLink("edit") }} className={`edit w-full h-[2.5rem] flex gap-4 items-center p-4 rounded-md mt-2 ${link === "add" ? 'active' : 'inactive'}`} ><LuUserCog style={{ fontSize: '1.5rem' }} /> <span className='text-[1rem] font-normal'>Edit Student</span></NavLink>

                <NavLink to='/admin/remove' onClick={() => { setLink("remove") }} className={`remove w-full h-[2.5rem] flex gap-4 items-center p-4 rounded-md mt-2 ${link === "add" ? 'active' : 'inactive'}`} ><FiUserMinus style={{ fontSize: '1.5rem' }} /> <span className='text-[1rem] font-normal'>Remove Student</span></NavLink>

                <NavLink to='/admin/messages' onClick={() => { setLink("inbox") }} className={`notification w-full h-[2.5rem] flex gap-4 items-center p-4 rounded-md mt-2  ${link === "add" ? 'active' : 'inactive'}`} ><MdMoveToInbox style={{ fontSize: '1.5rem' }} /> <span className='text-[1rem] font-normal'>Inbox</span></NavLink>
            </div>
        </div>
    )
}

export default Navbar
