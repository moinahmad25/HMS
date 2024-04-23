import React, { useState } from 'react'
import './App.css'
import Hero from './Components/Hero/Hero'
import {Routes, Route} from 'react-router-dom'
import Form from './Components/form/Form'
import Admin from './Components/Admin'
import Add from './Admin/Add/Add'
import Remove from './Admin/Remove/Remove'
import Edit from './Admin/Edit/Edit'
// import Navbar from './Admin/navbar/Navbar'
import Messages from './Admin/Notification/Messages'
import { StrictMode } from 'react'
import Detail from './Components/Detail/Detail'
import Otp from './Components/otp/Otp'
import Profile from './Components/profile/Profile'

function App() {


  return (
    <StrictMode>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/form' element={<Form />} />
        <Route path='/form/detail/:id' element={<Detail />} />
        <Route path='/form/detail/:id/otp-verification' element={<Otp />} />
        <Route path='/user/profile/:id' element={<Profile />} />
        {/* <Route path='/admin' element={<Navbar />} /> */}
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/add' element={<Add />} />
        <Route path='/admin/edit' element={<Edit />} />
        <Route path='/admin/remove' element={<Remove />} />
        <Route path='/admin/messages' element={<Messages />} />
      </Routes>
    </StrictMode>
  )
}

export default App
