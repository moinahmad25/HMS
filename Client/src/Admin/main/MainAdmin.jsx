import React from 'react'
import Home from '../home/Home'
import Navbar from '../navbar/Navbar'

const MainAdmin = () => {
  return (
    <div className='w-full min-h-screen flex'>
        <Navbar />
        <div className='w-4/5 min-h-screen pr-4'>
          <Home />
        </div>
    </div>
  )
}

export default MainAdmin
