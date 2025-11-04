import React from 'react'
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';


const AddAdress = () => {
  return (
    <>
     <section className="p-5 bg-gray-50 mt-3 ">
        <form className="form py-3 p-8 ">
          <div className="scroll max-h-72vh] ">
            <div className="grid grid-cols-3 mb-3 gap-4 ">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] !mb-2">
            Address Line 1
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] !mb-2">
           City
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] !mb-2">
           State
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] !mb-2">
            Pincode
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] !mb-2">
          Country
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>


          </div>
          <br />
        
              
          </div>

           <br />
         <br />
        <Button type="button"  className="btn-blue btn-lg w-[250px] flex gap-4"><FaCloudUploadAlt className="text-[25px]" />Publish and View</Button>

          </form>
          </section>
    </>
  )
}

export default AddAdress
