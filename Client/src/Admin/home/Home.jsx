import React from 'react'
import Card from '../card/Card'

const Home = () => {
    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-[6rem] flex justify-between items-center px-4 border-b-[1.5px] border-zinc-200'>
                <div className='w-3/4 h-full flex justify-between items-center '>
                    <h1 className='text-3xl font-medium'>Admin Dashboard</h1>
                    <input type="text" placeholder='Search name' className=' h-[3rem] bg-zinc-200 py-2 px-4 rounded-md outline-zinc-400 outline-1' />
                </div>
                <div className='w-1/4 h-full justify-end flex items-center '>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-black cursor-pointer'></div>
                </div>
            </div>
            <div className='w-full px-4 py-8 flex gap-4 justify-between'>
                <Card heading='Total Students' new={10} count={110} background='#E7F3FF' textColor='#0370D7' />
                <Card heading='Booked Rooms' new={1} count={90} background='#E7FFE8' textColor='#009A0F' />
                <Card heading='Empty Rooms' new={0} count={10} background='#FFE7E7' textColor='#B50000' />
                <Card heading='Pendings' new={2} count={10} background='#FFF6E7' textColor='#B36900' />
            </div>
        </div>
    )
}

export default Home
