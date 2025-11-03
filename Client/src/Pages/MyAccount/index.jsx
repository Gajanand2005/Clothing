import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";

import TextField from '@mui/material/TextField';
import AccountSidebar from "../../components/AccountSidebar/Index";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const context=useContext(MyContext);
  const history=useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if(token===null){
    history('/');
  }

  }, [context?.isLogin]);

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-full lg:w-[20%]">
           <AccountSidebar/>
          </div>

        <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md">
                 <h2 className="text-[20px] font-[600] pb-3">My Profile</h2>
                 <hr />

            <form action="" className="!mt-5">
                 <div className="flex items-center gap-5 ">
                    <div className="w-[50%]">
                    <TextField  label="Full Name" variant="outlined" size="small" className="w-full" />
                    </div>
                    
                    <div className="w-[50%]">
                    <TextField  label="Email" variant="outlined" size="small" className="w-full" />
                    </div>
                   
                 </div>
                    <div className="flex items-center !mt-4 gap-5 ">
                    <div className="w-[50%]">
                    <TextField  label="Number " variant="outlined" size="small" className="w-full" />
                    </div>
                    
                    
                   
                 </div>

                    <br />

                <div className="flex items-center gap-4">
                    <Button className="!bg-orange-600 !text-white hover:!bg-black w-[100px]">Save</Button>
                    <Button className="!bg-orange-600 !text-white hover:!bg-black w-[100px]">Cancel</Button>

                </div>

            </form>

            </div>
        </div>

        </div>
      </section>
    </>
  );
};

export default MyAccount;
