import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import no_data_found from '../../assets/illustration/no data found.svg';

const Home = () => {
    const [studentData, setStudentData] = useState([])

    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/total-students?page=${pageNo}`)
                const result = await response.json();

                console.log(result.students)
                setStudentData(result.students)

            } catch (error) {
                console.log("error found!!!", error)
            }
        }


        getData()

    }, [])
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/total-students?page=${pageNo}`)
                const result = await response.json();

                console.log(result.students)
                setStudentData(result.students)

            } catch (error) {
                console.log("error found!!!", error)
            }
        }


        getData()

    }, [pageNo])

    const handleNextPageClick = () => {
        setPageNo((prev) => prev + 1)
    }
    const handlePrevPageClick = () => {
        if (pageNo <= 1) {
            setPageNo(1)
        }
        else {
            setPageNo((prev) => prev - 1)
        }
    }



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
                <Card heading='Total Rooms' new={10} count={234} background='#E7F3FF' textColor='#0370D7' />
                <Card heading='Booked Rooms' new={1} count={90} background='#E7FFE8' textColor='#009A0F' />
                <Card heading='Empty Rooms' new={0} count={10} background='#FFE7E7' textColor='#B50000' />
                <Card heading='Pendings' new={2} count={10} background='#FFF6E7' textColor='#B36900' />
            </div>
            <div className='w-full px-4 mt-4 pb-8'>
                <h1 className='my-2 text-[1.5rem] font-semibold'>Applied for Rooms</h1>
                <div className='w-full flex h-[2.5rem] items-center bg-zinc-200 rounded-t'>
                    <div className='w-1/5'>
                        <h3 className='text-center font-bold'>Registration No.</h3>
                    </div>
                    <div className='w-1/5'>
                        <h3 className='text-center font-bold'>Name</h3>
                    </div>
                    <div className='w-1/5'>
                        <h3 className='text-center font-bold'>College</h3>
                    </div>
                    <div className='w-1/5'>
                        <h3 className='text-center font-bold'>Allocated</h3>
                    </div>
                    <div className='w-1/5'>
                        <h3 className='text-center font-bold'>Hostel</h3>
                    </div>
                </div>
                <div className='w-full min-h-[12rem]'>
                    {
                        studentData.length ? (
                            studentData.map((data, index) => (
                                <div key={index} className='w-full flex h-[2.5rem] items-center border border-zinc-200' style={(index + 1) % 5 === 0 ? { borderBottomLeftRadius: '0.25rem', borderBottomRightRadius: '0.25rem' } : { borderBottomLeftRadius: '0rem', borderBottomRightRadius: '0rem' }}>
                                    <div className='w-1/5'>
                                        <h3 className='text-center'>{data.registrationNumber}</h3>
                                    </div>
                                    <div className='w-1/5'>
                                        <h3 className='text-center capitalize'>{data.userName}</h3>
                                    </div>
                                    <div className='w-1/5'>
                                        <h3 className='text-center uppercase'>{data.college}</h3>
                                    </div>
                                    <div className='w-1/5'>
                                        <h3 className='text-center'>{data.isAllocated ? 'Allocated' : 'Not Allocated'}</h3>
                                    </div>
                                    <div className='w-1/5'>
                                        <h3 className='text-center capitalize'>{data.isAllocated ? `${data.hostelName}` : 'Not Allocated Yet!'}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                                <div className='text-center h-[12rem] flex flex-col items-center justify-center'>
                                <img src={no_data_found} alt="" className='h-[6rem] my-4' />
                                <h3 className='font-semibold text-zinc-500'>No more student data available</h3>
                            </div>
                        )
                    }

                    
                </div>
                    <div className='w-[12rem] h-[3rem] float-right my-6 flex gap-2'>
                        <button className='w-1/2 h-full rounded-md bg-black text-white font-medium' style={pageNo <= 1 ? { background: 'gray', pointerEvents: 'none' } : { background: 'black' }} onClick={handlePrevPageClick}>Prev</button>
                        <button className='w-1/2 h-full rounded-md bg-black text-white font-medium' style={studentData.length ? { background: 'black' } : { background: 'gray', pointerEvents: 'none' }} onClick={handleNextPageClick}>Next</button>
                    </div>
            </div>
            

        </div>
    )
}

export default Home
