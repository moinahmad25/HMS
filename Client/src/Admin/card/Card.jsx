import React from 'react'

const Card = (props) => {
    return (
        <>
            <div className='w-[24%] h-[10rem] rounded-md p-4' style={{background: props.background}}>
                <div className='w-full flex items-end justify-between'>
                    <h1 className='text-[1.3rem] font-semibold' style={{color: props.textColor}} >{props.heading}</h1>
                </div>
                <div className='w-full h-[85%] flex justify-center items-center'>
                    <h1 className='text-5xl' style={{color: props.textColor}} >{props.count ? (props.count): '0'} <span className='text-[1rem] font-semibold'>rooms</span></h1>
                </div>
            </div>
        </>
    )
}

export default Card
