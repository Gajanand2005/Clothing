import React, { useContext } from 'react'
import "../Productitem/style.css"
import {Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { FaHeart } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { MyContext } from '../../App';




function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function ProductItem(props) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const context= useContext(MyContext);

  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-2  border-[rgba(0,0,0,0.1)] '>
      <div className='group imgWrapper w-[100%] overflow-hidden rounded-md relative'>
        <Link to={`/products/${props?.item?._id}`}>
        <div className='img h-[180px] sm:h-[200px] md:h-[250px] overflow-hidden'>
        <img src={props?.item?.images[0]} alt=""  className='w-full'/>
        <img src={props?.item?.images[1]} alt=""  className='w-full'/>
      
        </div>
      </Link>
      <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-500 text-white rounded-full p-1 text-[10px] md:text-[12px] font-[500]  '> {props?.item?.discount}</span>


      <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[35px] sm:w-[40px] md:w-[50px] transition-all duration-300 group-hover:top-[10px] opacity-0 group-hover:opacity-100'>
        <Tooltip title="Heart" placement="left-start">
      <Button className='!w-[28px] !h-[28px] sm:!w-[30px] sm:!h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[28px] sm:!min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white group'><FaHeart  className='text-[14px] sm:text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white'/> </Button></Tooltip>
    
      <Tooltip title="View Product Details" placement="left-start">
      <Button className='!w-[28px] !h-[28px] sm:!w-[30px] sm:!h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[28px] sm:!min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white'onClick={()=>context.handleOpenProductDetailsModal(true,props?.item)}>< MdZoomOutMap className='text-[14px] sm:text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white' /> </Button></Tooltip>

      </div>
      </div>

      <div className='info p-2 md:p-3 py-3 '>
        <h6 className='text-[11px] sm:text-[12px] md:text-[14px]'><span  className='link transition-all'>{props?.item?.brand}</span></h6>
         <h3 className='text-[13px] sm:text-[14px] md:text-[16px] title mt-1 font-[500] text-[#000]' ><Link to={`/products/${props?.item?._id}`} className='link transition-all'>{props?.item?.name}</Link></h3>
        <div className='py-1'>
        
        </div>

    <div className='flex items-center gap-3 sm:gap-4 py-1'>
      <span className='oldPrice line-through text-gray-500 text-[12px] sm:text-[14px] md:text-[16px] font-[500]'>  &#x20b9; ${props?.item?.price}</span>
      <span className='oldPrice text-orange-600 font-bold text-[12px] sm:text-[14px] md:text-[16px]'>  &#x20b9; ${props?.item?.oldPrice}</span>
    </div>
      </div>

    </div>
  );
}

export default ProductItem
