import React, { createContext, useEffect, useState } from "react";
import Header from "./Components/Header/Index.jsx";
import Footer from "./Components/Footer/Index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing/Index.jsx";
import ProductDetails from "./Pages/ProductDetails/index.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import ProductDetailsComponent from "./Components/ProductDetails/Index.jsx";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import CartPage from "./Pages/Cart/Index.jsx";

import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword/Index.jsx";
import CheckOut from "./Pages/CheckOut/Index.jsx";
import MyAccount from "./Pages/MyAccount/index.jsx";
import MyList from "./Pages/MyList/Index.jsx";
import Order from "./Pages/Orders/Index.jsx";
import Whataap from "./Components/Whataap/Index.jsx";

import HelpCenter from "./Pages/HelpCenter/Index.jsx";
import OrderTracking from "./Pages/OrderTracking/Index.jsx";
import { fetchDataFromApi, postData, editData } from "./Utlis/Api.js";
import Verify from "./Pages/Verify/index.jsx";
import Address from "./Pages/MyAccount/Address.jsx";
import Home from "./Pages/Home/Index.jsx";

import Size from "./Pages/SizeGuide/Index.jsx";

const MyContext = createContext();

const App = () => {
  const [openProductDetailsModal, setOpenProductDetailsModel] = useState({
    open: false,
    item: {},
  });
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });
  const [cartData, setCartData] = useState([]);

  const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModel({
      open: status,
      item: item,
    });
  };
  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModel({
      open: false,
      item: {},
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`)
        .then((res) => {
          if (res?.success) {
            setUserData(res?.data);
          } else if (
            res?.message === "You have not login" ||
            res?.message === "jwt expired" ||
            res?.message === "Invalid token"
          ) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            alertBox("error", "Your session is closed please login again");
            window.location.href = "/login";
            setIsLogin(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          alertBox("error", "Failed to fetch user details");
        });

      getCartItems();
    } else {
      setIsLogin(false);
    }
  }, []); // Remove [isLogin] to prevent infinite loop

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
  }, []);

  const alertBox = (status, msg) => {
    if (status.toLowerCase() === "success") {
      toast.success(msg);
    }
    if (status.toLowerCase() === "error") {
      toast.error(msg);
    }
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      alertBox("error", "you are not login please login first");
      return false;
    }

    const data = {
      productTitle: product?.name,
      image: product?.image,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      countInStock: product?.countInStock,
      productId: product?._id,
      subTotal: parseInt(product?.price * quantity),
      userId: userId,
      brand: product?.brand,
      size: product?.size,
    };

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        alertBox("success", res?.message);

        getCartItems();
      } else {
        alertBox("error", res?.message);
      }
    });
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };

  const updateCartSize = (_id, size) => {
    const data = {
      _id: _id,
      size: size,
    };

    editData("/api/cart/update-size", data).then((res) => {
      if (res?.error === false) {
        alertBox("success", "Size updated successfully");
        getCartItems();
      } else {
        alertBox("error", res?.message);
      }
    });
  };

  const value = {
    setOpenProductDetailsModel,
    openProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    maxWidth,
    fullWidth,
    setMaxWidth,
    setFullWidth,
    alertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    setCatData,
    catData,
    setIsOpenFullScreenPanel,
    isOpenFullScreenPanel,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
    updateCartSize,
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
            <Route
              path={"/forgot-Password"}
              exact={true}
              element={<ForgotPassword />}
            />
            <Route path={"/checkout"} exact={true} element={<CheckOut />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-order"} exact={true} element={<Order />} />
            <Route
              path={"/order-tracking"}
              exact={true}
              element={<OrderTracking />}
            />
            <Route
              path={"/help-center"}
              exact={true}
              element={<HelpCenter />}
            />
            <Route path={"/address"} exact={true} element={<Address />} />
            <Route path={"/size"} exact={true} element={<Size />} />
          </Routes>
          <Whataap />
          <Footer />
          
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
export { MyContext };
