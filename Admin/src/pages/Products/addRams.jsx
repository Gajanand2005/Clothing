import { Button, Checkbox } from "@mui/material";
import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import TooltipMUI from "@mui/material/Tooltip";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddRams = () => {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Add Product Size</h2>
      </div>
      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form action="" className="form py-3 p-6">
          <div className="col mb-4">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              PRODUCT SIZE
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
            />
          </div>

          <Button className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px]" />
            Publish and View
          </Button>
        </form>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 pr-0 py-3 w-[10%]">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-0 py-3 whitespace-nowrap">
                  PRODUCT SIZE
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="odd:bg-white  border-b dark:border-gray-700">
              <td className="px-6 pr-0 py-3">
                <div className="w-[60px]">
                  <Checkbox {...label} size="small" />
                </div>
              </td>
              <td className="px-0 py-2">
                S
              </td>
              <td className="px-6 py-2">
                <div className="flex items-center gap-1">
                  <TooltipMUI title="Edit Product" placement="top">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
                      <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </TooltipMUI>
               
                  <TooltipMUI title="Remove Product" placement="top">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
                    </Button>
                  </TooltipMUI>
                </div>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddRams;
