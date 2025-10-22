import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <section className="section py-10">
        <div className="container ">
          <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-5 px-4 md:px-10 ">
            <h3 className="text-center text-[20px] text-black font-[500]">
              Register with a new account
            </h3>
            <form action="" className="w-full !mt-5">
               <div className="form-group w-full !mb-5">
                <TextField
                  type="text"
                  id="email"
                  label="Full Name "
                  variant="outlined"
                  className="w-full"
                />
              </div>
              <div className="form-group w-full !mb-5">
                <TextField
                  type="email"
                  id="email"
                  label="Email id"
                  variant="outlined"
                  className="w-full"
                />
              </div>
              <div className="form-group w-full !mb-5 relative">
                <TextField
                  id="password"
                  type={isShowPassword=== false ? 'password' : 'text'}
                  label="Password "
                  variant="outlined"
                  className="w-full"
                />
                <Button
                  className="!absolute !top-[5px] !right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === false ? (
                    <TbEyeglass2 className="text-[40px] opacity-75" />
                  ) : (
                    <TbEyeglassOff className="text-[40px] opacity-75" />
                  )}
                </Button>
              </div>

            
                
            <div className="flex items-center w-full !mt-3">
                <Button className=" !text-white !bg-orange-600 hover:!bg-black w-full !text-[18px] !p-3">Register</Button>
            </div>

            <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600] text-orange-600" to='/login'>Sign in</Link></p>

            <p className="text-center font-[500]">Or continue with social account</p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] !text-[18px] !p-3  "><FcGoogle className="text-[20px]" />Login with Google</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
