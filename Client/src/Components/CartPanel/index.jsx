import Button from '@mui/material/Button';
import React, { useContext } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { deleteData } from '../../Utlis/Api';

const CartPanel = (props) => {
  const context = useContext(MyContext);
  const removeItem =(id)=>{
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res)=>{
      context.alertBox("success","item Removed");
      context?.getCartItems();
    })
  }

  return (
    <>
       <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4" >
      {
        props?.data?.map((item, index)=>{
          return(
                <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.2)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to={`/product/${item?.productId}`} className='block group'>
            <img src={item?.image} alt="" className="w-full group-hover:scale-105"/>
            </Link>
          </div>
          <div className="info w-[75%] py-5 relative">
           <Link to={`/product/${item?.productId}`} className='link transition-all'><h4>{item?.productTitle?.substr(0,40)+'...'} </h4></Link>
            <p className='flex items-center gap-5 !mt-2 !mb-2'> Qty: <span>{item?.quantity}</span>
            <span className='text-orange-600 font-bold'>Price : ₹{item?.price}</span></p>
            <MdOutlineDeleteForever className='absolute top-[10px] right-[10px] cursor-pointer text-[21px] link transition-all' onClick={()=>removeItem(item?._id)} />
          </div>
        </div>
               
          )
        })
      }

      
        
      </div> 
      <br />
      <div className='bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5'>
      <div className='bottomInfo w-full border-t px-4 border-[rgba(0,0,0,0.2)] py-3 flex items-center justify-between flex-col'>
       <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>{context?.cartData?.length} items</span>
        <span className='text-orange-600 font-bold'>{
          (context.cartData?.length !==0 ?
              context.cartData?.map(item => parseInt(item.price)* item.quantity).reduce((total, value)=> total+ value, 0) :0)?.toLocaleString('en-Us',{style: 'currency', currency: 'INR'})
          }
          
        </span>
       </div>
        {/* <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>Shipping</span>
        <span className='text-orange-600 font-bold'>$8.00</span>
       </div> */}
      </div>
       <div className='bottomInfo w-full border-t px-4 border-[rgba(0,0,0,0.2)] py-3 flex items-center justify-between flex-col'>
       <div className='flex items-center justify-between w-full'>
         <span className='text-[14px] font-[600]'>Total (tax excl.)</span>
        <span className='text-orange-600 font-bold'>{
          (context.cartData?.length !==0 ?
              context.cartData?.map(item => parseInt(item.price)* item.quantity).reduce((total, value)=> total+ value, 0) :0)?.toLocaleString('en-Us',{style: 'currency', currency: 'INR'})
          }</span>
       </div>
        
        <br />

        <div className='flex items-center justify-between w-full gap-2'>
          <Link to='/Cart' className='w-[50%] d-block'><Button className='!bg-orange-600 !text-white hover:!bg-black w-full'onClick={context?.toggleCartPanel(false)}>View Cart</Button></Link>
            <Link to='/CheckOut' className='w-[50%] d-block'><Button className='!bg-orange-600 !text-white hover:!bg-black w-full'>CheckOut </Button></Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default CartPanel
