import React from 'react'
import './Owner.css'
import amit_photo from '../../assets/Amit Sir.jpg'
import principal_photo from '../../assets/BABA8490.jpg'

const Owner = () => {
  return (
    <div className='w-full min-h-[30rem] bg-white pb-4'>
      <div className="about_heading flex justify-center max-h-[6rem]">
        <h1 className='text-[3.2rem] px-8'><span className='font-extrabold'>Message</span> <span className='font-extrabold bg-zinc-700 text-zinc-50 rounded-md px-4 pb-2'>from the desk</span></h1>
      </div>
      <div className="about-us " id="footerr">
        <div className="card-container">
          <div className="card">
            <img src={principal_photo} alt="" className="card-img" />
              <div className="info-box">
                <h2 className="name">Dr. Anuj Kumar Sharma</h2>
                <p className="small">(PRINCIPAL)</p>
                <p className="thought"><span>"</span> We believe that for better education students needs a
                  better place where they find their competitor's and a best environment. <span>"</span>
                </p>
              </div>
              <h2 className="name1">Dr. Anuj Kumar Sharma</h2>
          </div>
          <div className="card">
            <img src={amit_photo} alt="" className="card-img" />
              <div className="info-box">
                <h2 className="name">Mr. Amit Ranjan</h2>
                <p className="small">(HOSTEL WARDEN)</p>
                <p className="thought"><span>"</span>We provide secure environment, Parents not need to worry.
                  Leave everything on us we will take care of your child. <span>"</span></p>
              </div>
              <h2 className="name1">Mr. Amit Ranjan</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Owner
