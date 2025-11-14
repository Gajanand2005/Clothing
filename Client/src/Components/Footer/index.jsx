import React, { useContext } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
  FaRegCommentDots,
} from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiPaypal,
} from "react-icons/si";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnBold } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { TfiGift } from "react-icons/tfi";
import { BiSupport } from "react-icons/bi";
import Drawer from "@mui/material/Drawer";
import CartPanel from "../CartPanel/Index.jsx";
import { MyContext } from "../../App.jsx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ProductZoom from "../ProductZoom/Index.jsx";
import ProductDetailsComponent from "../ProductDetails/Index.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Footer = () => {
  const context = useContext(MyContext);

  return (
    <>
      <footer className="py-6 bg-red-200">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="col flex items-center justify-center flex-col group w-full sm:w-[15%]">
              <LiaShippingFastSolid className="text-[40px] sm:text-[50px] transition-all duration-300 group-hover:text-red-600 group-hover:-translate-y-1" />
              <h3 className="text-[14px] sm:text-[16px] font-[600]">Free Shipping </h3>
              <p className="text-[11px] sm:text-[12px] font-[500]">Only in India</p>
            </div>

            <div className="col flex items-center justify-center flex-col group w-full sm:w-[15%]">
              <BsWallet2 className="text-[40px] sm:text-[50px] transition-all duration-300 group-hover:text-red-600 group-hover:-translate-y-1" />
              <h3 className="text-[14px] sm:text-[16px] font-[600] mt-3">Secured Payment </h3>
              <p className="text-[11px] sm:text-[12px] font-[500]">All type of payment</p>
            </div>

            <div className="col flex items-center justify-center flex-col group w-full sm:w-[15%]">
              <BiSupport className="text-[40px] sm:text-[50px] transition-all duration-300 group-hover:text-red-600 group-hover:-translate-y-1" />
              <h3 className="text-[14px] sm:text-[16px] font-[600] mt-3">Support 24/7 </h3>
              <p className="text-[11px] sm:text-[12px] font-[500]">Contact us Anytime</p>
            </div>
          </div>
        </div>
      </footer>
      <footer className="bg-white border-t border-gray-200  ">
        <div className="container mx-auto py-6 md:py-10 footer-flex px-4 gap-2 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-300 pb-6 md:pb-8">
            {/* Contact us */}
            <div>
              <h3 className="text-base font-semibold mb-3">Contact us</h3>
              <p className="mb-1 text-sm">S-Mal Couture</p>

              <p className="mb-1 text-sm">
                Pull Bazar, Near Shiv Mandir Narnaul Haryana Pincode:- 123001
              </p>

              <p className="mb-1 text-sm">smalcouture@gmail.com</p>
              <p className="text-red-500 font-bold mb-3 text-base">
               8199985004
              </p>
              <div className="flex items-center gap-2 text-red-500 font-semibold cursor-pointer text-sm">
                <FaRegCommentDots size={20} />
                <span></span>
              </div>
              <p className="font-semibold text-sm">Get Expert Help</p>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-base font-semibold mb-3">Products</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>Ethnic</li>
                <li>Western Wear</li>
                <li>Co-Ords</li>
              </ul>
            </div>

            {/* Our company */}
            <div>
              <h3 className="text-base font-semibold mb-3">Support</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>Delivery</li>
                <li>Privacy Policy</li>
                <li>Terms and conditions of use</li>
                <li>About us</li>
                <li>Secure payment</li>
                <li>Login</li>
              </ul>
            </div>

            {/* Subscribe to newsletter */}
            <div>
              <h3 className="text-base font-semibold mb-3">
                Join S-Mal Couture{" "}
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Subscribe to our latest trendy collection to get special
                discounts
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition text-sm"
                >
                  SUBSCRIBE
                </button>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" />I agree to the terms and conditions
                  and the privacy policy
                </label>
              </form>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6 pt-4 md:pt-6 gap-4">
            {/* Social media icons */}
            <div className="flex gap-3 md:gap-4 text-gray-600 text-lg md:text-xl">
              <a href='https://www.instagram.com/smalcouture?igsh=MmtxYjlwb3prajdi' target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-red-500 cursor-pointer" />
              </a>
              <a href='https://www.instagram.com/smal_west?igsh=MXBwZTFzOW9vbXlwZA==' target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-red-500 cursor-pointer" />
              </a>
            </div>
            {/* Copyright */}
            <div className="text-gray-500 text-xs md:text-sm">
              © 2025 - Ecommerce Template
            </div>

            {/* Payment icons */}
            <div className="flex gap-3 md:gap-4 text-xl md:text-2xl">
              <SiVisa className="text-blue-600" title="Visa" />
              <SiMastercard className="text-yellow-400" title="MasterCard" />
              <SiAmericanexpress
                className="text-blue-600"
                title="American Express"
              />
              <SiPaypal className="text-blue-600" title="PayPal" />
            </div>
          </div>
        </div>
        {/* cart panel */}
        <Drawer
          open={context?.openCartPanel}
          onClick={context?.toggleCartPanel(false)}
          anchor={"right"}
          className="cartPanel"
        >
          <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[#000]">
            <h4>Shopping Cart ({context?.cartData?.length})</h4>
            <IoClose
              className="text-[20px] cursor-pointer"
              onClick={context?.toggleCartPanel(false)}
            />
          </div>

        {
          context?.cartData?.length!==0 ? <CartPanel data={context?.cartData} /> :
          <>
       <div className="flex items-center justify-center flex-col pt-[200px] ">
           <img src="/bag.png" alt="" className="!w-[150px]"/>
           <h4 className="!mt-5 text-[20px] font-[600] text-blue-300">Your Cart is Currently empty</h4>
           <Button className="!bg-orange-600 !text-white hover:!bg-black !mt-5" onClick={context?.toggleCartPanel(false)}>Continue Shopping</Button>
       </div>
          </>
        }
          
        </Drawer>
      </footer>



      <Dialog
            open={context?.openProductDetailsModal.open}
            fullWidth={context?.fullWidth}
            maxWidth={context?.maxWidth}
            onClose={context?.handleCloseProductDetailsModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="productDetailsModal"
          >
            <DialogTitle id="alert-dialog-title">
              Product Details
              <Button
                className="!w-[40px] !h-[40px] min-w-[40px] !rounded-full !text-[#000] !absolute top-[10px] right-[10px] "
                onClick={context?.handleCloseProductDetailsModal}
              >
                <IoClose className="text-[20px]" />
              </Button>
            </DialogTitle>
            <DialogContent>
              {
              context?.openProductDetailsModal?.item?.length !== 0 && (
                <div className="flex items-center w-full productDetailsModalContainer relative">
                  <div className="col1 w-[40%] px-3 h-[70vh]">
                    <ProductZoom images={ context?.openProductDetailsModal?.item?.images} />
                  </div>

                  <div className="col2 w-[60%] py-8 px-8">
                    <ProductDetailsComponent
                      item={ context?.openProductDetailsModal?.item}
                    />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
    </>
  );
};

export default Footer;
