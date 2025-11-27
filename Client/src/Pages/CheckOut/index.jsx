import React, { useContext, useEffect, useState, useMemo } from "react";  
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MyContext } from "../../App";
import { PiPlusBold } from "react-icons/pi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const CheckOut = () => {

  const context = useContext(MyContext);
  const userData = context?.userData;
  const [isChecked, setIsChecked] = useState(0);

  const totalPrice = useMemo(() => {
    return context?.cartData?.reduce((acc, item) => acc + (item?.quantity * item?.price), 0) || 0;
  }, [context?.cartData]);


  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  }

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index)
    }
  }

  return (
    <>
      <section className="py-10 flex items-center justify-center">
        <div className="w-[70%] m-auto flex gap-5">

          {/* LEFT */}
          <div className="leftCol w-[60%] ">
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-[600]">Select Delivery Address</h1>
                <Button
                  className="!bg-orange-600 !text-white hover:!bg-black"
                  onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
                >
                  <PiPlusBold />
                  ADD NEW ADDRESS
                </Button>
              </div>
              <br />

              <RadioGroup>
                <div className="flex flex-col gap-4">

                  {/* Address List */}
                  {userData?.address_details?.length > 0 ? (
                    userData?.address_details?.map((address, index) => {
                      return (
                        <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked === index && 'bg-orange-200'}`} key={index}>
                          <div>
                            <Radio
                              size="small"
                              className="!text-orange-600"
                              onChange={(e) => handleChange(e, index)}
                              checked={isChecked === index}
                            />
                          </div>

                          <div className="info">
                            <span className="inline-block p-1 bg-[#f1f1f1] rounded-md">{address?.addressType}</span>
                            <h3 className="text-[20px] font-[600] capitalize">
                              {userData?.name}
                            </h3>

                            <p className="!mt-0 !mb-0 capitalize">
                              {address?.address_line1 + " " + address?.city + " " + address?.country + " " + address?.state + " " + address?.landmark}
                            </p>

                            <p className="!mt-0 !mb-0 capitalize font-[600]">
                              +{userData?.mobile}
                            </p>
                          </div>

                          <Button
                            variant="text"
                            className="top-[15px] right-[15px] !absolute !bg-orange-600 !text-white hover:!bg-black"
                            size="small"
                            onClick={() => editAddress(address?._id)}
                          >
                            EDIT
                          </Button>
                        </label>
                      );
                    })
                  ) : (
                    <>
                      <div className="flex items-center justify-between flex-col p-5">
                        <img src="/address.png" alt="" width="80px" />
                        <h2 className="text-center">No Addresses found</h2>
                        <p>Add a delivery address</p>
                        <Button className="!bg-orange-600 !text-white hover:!bg-black">Add Address</Button>
                      </div>
                    </>
                  )}

                </div>
              </RadioGroup>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rightCol w-[40%]">
            <div className="card shadow-md bg-white p-5 rounded-md">
              <h2 className="!mb-3 font-[600]">Your Order</h2>

              <div className="flex justify-between items-center py-3 border-t border-b border-[rgba(0,0,0,0.2)] ">
                <span className="text-[15px] font-[600]">Product</span>
                <span className="text-[15px] font-[600]">Subtotal</span>
              </div>

              {/* CART ITEMS */}
              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 !mb-5">
                {context?.cartData?.length > 0 &&
                  context?.cartData?.map((item, index) => {
                    return (
                      <div className="flex items-center justify-between py-2 " key={index}>
                        <div className="part1 flex items-center gap-3">

                          <div className="img w-[50px] h-[50px] overflow-hidden rounded-md group cursor-pointer">
                            <img
                              src={item?.image}
                              alt=""
                              className="w-full transition-all group-hover:scale-105"
                            />
                          </div>

                          <div className="info">
                            <h4 className="font-[600] text-[14px]" title={item?.productTitle}>
                              {item?.productTitle?.substr(0, 20) + "..."}
                            </h4>

                            <span className="text-[13px]">Qty : {item?.quantity}</span>
                          </div>
                        </div>

                        <span className="text-[14px] font-[600]">
                          {context.formatPrice(item?.quantity * item?.price)}
                        </span>
                      </div>
                    );
                  })}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center py-3 border-t border-[rgba(0,0,0,0.2)]">
                <span className="text-[16px] font-[600]">Total</span>

                <span className="text-[16px] font-[600]">
                  {context.formatPrice(totalPrice)}
                </span>
              </div>

              <Button className="!bg-orange-600 flex !text-white w-full items-center text-[19px] hover:!bg-black gap-2">
                Checkout
                <RiShoppingBag3Line className="text-[19px]" />
              </Button>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
