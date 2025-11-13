import React, { useContext, useEffect, useState } from "react";
import "../Productitem/style.css";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../Utlis/Api";

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function ProductItem(props) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  const context = useContext(MyContext);

  const addToCart = (product, userId, quantity) => {
    context?.addToCart(product, userId, quantity);
    setIsAdded(true);
  };

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem.productId.includes(props?.item?._id)
    );

    if (item?.length !== 0) {
      setIsAdded(true);
      setCartItem(item);
    }
  }, [context?.cartData]);

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      deleteData(`api/cart/delete-cart-item/${cartItem[0]?._id}`).then(
        (res) => {
          setIsAdded(false);
          context.alertBox("success", "Item Removed from cart");
        }
      );
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity,
        subTotal: props?.item?.price * quantity,
      };
      editData(`/api/cart/update-qty`, obj).then((res = {}));
    }
  };

  const addQty = () => {
    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity,
      subTotal: props?.item?.price * quantity,
    };
    editData(`/api/cart/update-qty`, obj).then((res = {}));
  };

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-2  border-[rgba(0,0,0,0.1)] ">
      <div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img  overflow-hidden">
            <img src={props?.item?.images[0]} alt="" className="w-full" />
            <img src={props?.item?.images[1]} alt="" className="w-full" />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-500 text-white rounded-full p-1 text-[10px] md:text-[12px] font-[500]  ">
          {" "}
          {props?.item?.discount}%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[35px] sm:w-[40px] md:w-[50px] transition-all duration-300 group-hover:top-[10px] opacity-0 group-hover:opacity-100">
          <Tooltip title="Heart" placement="left-start">
            <Button className="!w-[28px] !h-[28px] sm:!w-[30px] sm:!h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[28px] sm:!min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white group">
              <FaHeart className="text-[14px] sm:text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white" />{" "}
            </Button>
          </Tooltip>

          <Tooltip title="View Product Details" placement="left-start">
            <Button
              className="!w-[28px] !h-[28px] sm:!w-[30px] sm:!h-[30px] md:!w-[35px] md:!h-[35px] !min-w-[28px] sm:!min-w-[30px] md:!min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-orange-500 hover:!text-white"
              onClick={() =>
                context.handleOpenProductDetailsModal(true, props?.item)
              }
            >
              <MdZoomOutMap className="text-[14px] sm:text-[16px] md:text-[18px] !text-black group-!hover:text-white hover:!text-white" />{" "}
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="info p-2 md:p-3 py-3 relative pb-[50px] h-[190px] ">
        <h6 className="text-[11px] sm:text-[12px] md:text-[14px]">
          <span className="link transition-all">{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[13px] sm:text-[14px] md:text-[16px] title mt-1 font-[500] text-[#000]">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.name?.substr(0, 30) + "...."}
          </Link>
        </h3>
        <div className="py-1"></div>

        <div className="flex items-center gap-3 sm:gap-4 py-1">
          <span className="oldPrice line-through text-gray-500 text-[12px] sm:text-[14px] md:text-[16px] font-[500]">
            {" "}
            &#x20b9;{props?.item?.price}
          </span>
          <span className="oldPrice text-orange-600 font-bold text-[12px] sm:text-[14px] md:text-[16px]">
            {" "}
            &#x20b9; {props?.item?.oldPrice}
          </span>
        </div>
        <div className="w-full !absolute bottom-[15px] left-0 pl-3 pr-3">
          {isAdded === false ? (
            <Button
              className="btn-org btn-border flex w-full btn-sm gap-2"
              size="small"
              onClick={() =>
                addToCart(props?.item, context?.userData?._id, quantity)
              }
            >
              <MdOutlineShoppingCart className="text-[18px]" /> Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] ">
              <Button
                className="!min-w-[30px] !w-[30px] !h-[30px] !bg-[#f1f1f1] !rounded-none "
                onClick={minusQty}
              >
                <FaMinus className="text-[rgba(0,0,0,0.7)]" />
              </Button>
              <span>{quantity}</span>
              <Button
                className="!min-w-[30px] !w-[30px] !h-[30px] !bg-orange-600 !rounded-none "
                onClick={addQty}
              >
                <FaPlus className="text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
