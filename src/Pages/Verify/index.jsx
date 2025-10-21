import React, { useState } from 'react'
import thief from '../../assets/thief.png'
import OtpBox from '../../components/OtpBox/Index';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const verify = () => {
    const [otp, setOtp]= useState('');
    const handleOtpChange = (value) =>{
        setOtp(value);
    };

    const verifyOTP = (e)=>{
        e.preventDefault();
    }

  return (
    <>
         <section className="section py-10 pl-90">
        <div className="container ">
          <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10 ">
            <div className='text-center flex items-center justify-center '>
                <img src={thief} alt="" className='w-[80px]' />
            </div>
            <h3 className="text-center text-[20px] text-black font-[500] !mt-4">
          Verify OTP
            </h3>
            <p className='text-center !mt-0 !mb-4'>OTP send to <span className='text-orange-600 font-bold'>smalcouture@gmail.com</span></p>
            <OtpBox length={6} onChange={handleOtpChange}/>

            <form action="" onSubmit={verifyOTP}>
                <div className='flex items-center justify-center !mt-3 px-3'>
                <Link to='/forgot-password' className='w-full'><Button type="submit" className='w-full !bg-orange-600 !text-white hover:!bg-black'>Verify OTP</Button>
                </Link>

            </div>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default verify
