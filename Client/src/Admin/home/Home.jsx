import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import no_data_found from '../../assets/illustration/no data found.svg';
import './Home.css'

const Home = () => {
    const [studentData, setStudentData] = useState([])
    const [dataLength, setDataLength] = useState(0)
    let maxData = 5;
    const [loading, setLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [count, setCount] = useState(0);
    const [nonAllocatedCount, setNonAllocatedCount] = useState(0);

    useEffect(() => {
        const getData = async () => {
            // setLoading(true)
            try {
                const response = await fetch(`http://localhost:5000/api/admin/total-students?page=${pageNo}`)
                const result = await response.json();

                setDataLength(result.length)
                setStudentData(result.students)
                setCount(result.count)
                setNonAllocatedCount(result.nonAllocated)

            } catch (error) {
                console.log("error found!!!", error)
            }
        }

        // console.log(dataLength - (studentData.length * pageNo))

        getData()

    }, [])
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:5000/api/admin/total-students?page=${pageNo}`)
                const result = await response.json();

                console.log(result.students)
                setStudentData(result.students)

            } catch (error) {
                console.log("error found!!!", error)
            }
            finally{
                setLoading(false)
            }
        }


        getData()

    }, [pageNo])


    


    console.log(count)

    
    // console.log(count)

    // let setLength = dataLength - (studentData.length * pageNo);

    const handleNextPageClick = () => {
        setPageNo((prev) => prev + 1)
        // console.log(dataLength - (studentData.length * pageNo))
    }
    const handlePrevPageClick = () => {
        if (pageNo <= 1) {
            setPageNo(1)
        }
        else {
            setPageNo((prev) => prev - 1)
        }
    }

    const totalLength = (dataLength.length > pageNo * maxData)



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
                <Card heading='Total Rooms' new={10} count={234} background='#E7F3FF' textColor='#0362c0' />
                <Card heading='Booked Rooms' new={1} count={count} background='#E7FFE8' textColor='#009A0F' />
                <Card heading='Empty Rooms' new={0} count={234 - count} background='#FFE7E7' textColor='#B50000' />
                <Card heading='Pending' new={2} count={nonAllocatedCount} background='#FFF6E7' textColor='#B36900' />
            </div>
            <div className='w-full px-4 mt-4 pb-8'>
                <h1 className='my-2 text-[1.5rem] font-semibold ml-2'>Applied for Rooms</h1>
                <div className='w-full flex h-[2.5rem] items-center bg-zinc-200 rounded-t'>
                    <div className='w-[20%]'>
                        <h3 className='text-center font-bold'>Registration No.</h3>
                    </div>
                    <div className='w-[20%]'>
                        <h3 className='text-center font-bold'>Name</h3>
                    </div>
                    <div className='w-[20%]'>
                        <h3 className='text-center font-bold'>College</h3>
                    </div>
                    <div className='w-[20%]'>
                        <h3 className='text-center font-bold'>Allocated</h3>
                    </div>
                    <div className='w-[20%]'>
                        <h3 className='text-center font-bold'>Hostel</h3>
                    </div>
                    <div className='w-[20%]'>
                        <h3 className='text-center font-bold'>Room No.</h3>
                    </div>
                </div>
                <div className='w-full min-h-[12rem]'>
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
                        studentData.length ? (
                            studentData.map((data, index) => (
                                <div key={index} className='w-full flex h-[2.5rem] items-center border border-zinc-200' style={(index + 1) % 5 === 0 ? { borderBottomLeftRadius: '0.25rem', borderBottomRightRadius: '0.25rem' } : { borderBottomLeftRadius: '0rem', borderBottomRightRadius: '0rem' }}>
                                    <div className='w-[20%]'>
                                        <h3 className='text-center'>{data.registrationNumber}</h3>
                                    </div>
                                    <div className='w-[20%]'>
                                        <h3 className='text-center capitalize'>{data.userName}</h3>
                                    </div>
                                    <div className='w-[20%]'>
                                        <h3 className='text-center uppercase'>{data.college}</h3>
                                    </div>
                                    <div className='w-[20%] flex justify-center'>
                                        {
                                            data.isAllocated ? <h3 className='font-semibold w-[5.5rem] text-center text-[0.8rem] bg-green-200 border border-green-300 text-green-800 rounded-full'>Allocated</h3> : <h3 className='font-semibold w-[6rem] text-center text-[0.8rem] bg-red-200 border border-red-300 text-red-800 rounded-full'>Not Allocated</h3>
                                        }
                                        <h3 className='text-center'>{data.isAllocated ? '' : ''}</h3>
                                    </div>
                                    <div className='w-[20%]'>
                                        <h3 className='text-center capitalize'>{data.isAllocated ? `${data.hostelName}` : 'Not Allocated Yet!'}</h3>
                                    </div>
                                    <div className='w-[20%]'>
                                        <h3 className='text-center capitalize'>{data.isAllocated ? `${data.roomNumber}` : 'Not Allocated Yet!'}</h3>
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
                    <button className='w-1/2 h-full rounded-md bg-black text-white font-medium' style={totalLength ? { background: 'black' } : { background: 'gray', pointerEvents: 'none' }} onClick={handleNextPageClick}>Next</button>
                    </div>
            </div>
            

        </div>
    )
}

export default Home
