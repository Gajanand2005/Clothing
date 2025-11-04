import React, { createContext, useEffect, useState } from "react";
import Header from "./Components/Header/Index.jsx";
import Footer from "./Components/Footer/Index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing/Index.jsx";
import Home from "./Pages/Home/Index.jsx";
import ProductDetails from "./Pages/ProductDetails/Index.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductZoom from "./Components/ProductZoom/Index.jsx";
import { IoClose } from "react-icons/io5";
import ProductDetailsComponent from "./Components/ProductDetails/Index.jsx";
import Login from "./Pages/Login/Index.jsx";
import Register from "./Pages/Register/index.jsx";
import CartPage from "./Pages/Cart/Index.jsx";

import toast, {Toaster} from 'react-hot-toast'; 
import ForgotPassword from './Pages/ForgotPassword/Index.jsx'
import CheckOut from "./Pages/CheckOut/Index.jsx";
import MyAccount from "./Pages/MyAccount/Index.jsx";
import MyList from "./Pages/MyList/Index.jsx";
import Order from "./Pages/Orders/Index.jsx";
import Whataap from "./Components/Whataap/Index.jsx";

import HelpCenter from "./Pages/HelpCenter/Index.jsx";
import OrderTracking from "./Pages/OrderTracking/Index.jsx";
import { fetchDataFromApi } from "./Utlis/Api.js";
import Verify from "./Pages/Verify/index.jsx";

 


const MyContext = createContext();

const App = () => {
  const [openProductDetailsModal, setOpenProductDetailsModel] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] =useState(false)
  const [isLogin, setIsLogin]= useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData]= useState(null);

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModel(false);
  };

  const toggleCartPanel = (newOpen)=>()=>{
    setOpenCartPanel(newOpen);
  }

  useEffect(()=>{
    const token= localStorage.getItem('accessToken');
    if(token!==undefined && token!==null && token !==""){
      setIsLogin(true)

      fetchDataFromApi(`/api/user/user-details`).then((res)=>{

        if(res?.error === true){
          if(res?.message === "You have not login"){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            alertBox("error","Your session is closed please login again")
            setIsLogin(false);
          }
        } else {
          setUserData(res.data);
        }
      }).catch((error) => {
        console.error("Error fetching user details:", error);
        alertBox("error", "Failed to fetch user details");
      });

    }else{
      setIsLogin(false)
    }
  },[]) // Remove [isLogin] to prevent infinite loop

  const alertBox = (status, msg)=>{

    if(status.toLowerCase()==="success"){
      toast.success(msg);
    }
    if(status.toLowerCase()==="error"){
      toast.error(msg);
    }

  }

  const value = {
    setOpenProductDetailsModel,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    alertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route
              path={"/productListing"}
              exact={true}
              element={<ProductListing />}
            />
            <Route
              path={"/product/:id"}
              exact={true}
              element={<ProductDetails />}
            />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/Verify"} exact={true} element={<Verify />} />
            <Route path={"/forgot-Password"} exact={true} element={<ForgotPassword />} />
            <Route path={"/checkout"} exact={true} element={<CheckOut />} />
             <Route path={"/my-account"} exact={true} element={<MyAccount />} />
              <Route path={"/my-list"} exact={true} element={<MyList />} />
              <Route path={"/my-order"} exact={true} element={<Order />} />
              <Route path={"/order-tracking"} exact={true} element={<OrderTracking />} />
               <Route path={"/help-center"} exact={true} element={<HelpCenter />} />
          </Routes>
          <Whataap/>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster/>
      <Dialog
        open={openProductDetailsModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex items-center w-full productDetailsModalContainer relative ">
            <Button
              className="!w-[40px] !h-[40px] min-w-[40px] !rounded-full !text-[#000] !absolute top-[0px] right-[0px] "
              onClick={handleCloseProductDetailsModal}
            >
              <IoClose className="text-[20px]" />
            </Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
     

    </>
  );
};

export default App;
export { MyContext };
