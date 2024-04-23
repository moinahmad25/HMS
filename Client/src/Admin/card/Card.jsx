import React from 'react'

const Card = (props) => {
    return (
        <>
            <div className='w-[24%] h-[10rem] rounded-md p-4' style={{background: props.background}}>
                <div className='w-full flex items-end justify-between'>
                    <h1 className='text-[1.3rem] font-semibold' >{props.heading}</h1>
                    {
                        props.new !== 0 ? <p className='font-extrabold text-[0.6rem] text-red-700'><span style={{ textShadow: '0px 0px 5px red' }}>+</span> {props.new} newly added</p> : <></>
                    }
                    
                </div>
                <div className='w-full h-[85%] flex justify-center items-center'>
                    <h1 className='text-5xl' >{props.count} <span className='text-[1rem] font-semibold'>students</span></h1>
                </div>
            </div>
        </>
    )
}

export default Card
