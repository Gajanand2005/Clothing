import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox/Index";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../../Utlis/Api";

const AddSubCategory = () => {
  const [productSubCat, setProductSubCat] = useState("");
  const [productSubCat2, setProductSubCat2] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [isLoading2, setIsLoading2] = useState();

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = productSubCat;
    setProductSubCat(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeInput2 = (e) => {
    const { name, value } = e.target;

    const catId = productSubCat2;
    setProductSubCat2(catId);

    setFormFields2(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const context = useContext(MyContext);

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handleChangeProductSubCat2 = (event) => {
    setProductSubCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };

  const selectedCatFun = (catName) => {
    formFields.parentCatName = catName;
  };

  const selectedCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "please enter category name ");
      setIsLoading(false);
      return false;
    }

    if (productSubCat?.length === 0) {
      context.alertBox("error", "please select parent category  ");
      setIsLoading(false);
      return false;
    }
    postData("/api/category/create", formFields).then((res) => {
      setIsLoading(false);
      context.setIsOpenFullScreenPanel({
        open: false,
      });
    });
  };

   const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsLoading2 (true);

    if (formFields2.name === "") {
      context.alertBox("error", "please enter category name ");
      setIsLoading2(false);
      return false;
    }

    if (productSubCat2?.length === 0) {
      context.alertBox("error", "please select parent category  ");
      setIsLoading2(false);
      return false;
    }
    postData("/api/category/create", formFields2).then((res) => {
      setIsLoading2(false);
      context.setIsOpenFullScreenPanel2({
        open: false,
      });
    });
  };

  return (
    <>
      <section className="p-5 bg-gray-50 mt-3 grid grid-cols-1 ">
        <form className="form py-3 p-8 " onSubmit={handleSubmit}>
          <h4 className="text-[20px] font-[600] text-gray-800">
            Add Sub Category
          </h4>
          <div className="scroll max-h-72vh] ">
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col w-[25%]">
                <div className="col">
                  <h3 className="text-[14px] font-[500] !mb-2">
                    Product Sub Category
                  </h3>
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productSubCat}
                    label="Category"
                    onChange={handleChangeProductSubCat}
                  >
                    {context?.catData?.length !== 0 &&
                      context?.catData?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item._id}
                            onClick={selectedCatFun(item.name)}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
              </div>

              <br />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">
                Sub Category Name
              </h3>
              <input
                type="text"
                className="w-[25%] h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                name="name"
                onChange={onChangeInput}
                value={formFields.name}
              />
            </div>
          </div>
          <hr />
          <br />
          <Button
            type="submit"
            className="btn-blue btn-lg w-[250px] flex gap-4"
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px]" />
                Publish and View
              </>
            )}
          </Button>
        </form>
        <form className="form py-3 p-8 " onSubmit={handleSubmit2}>
          <div className="scroll max-h-72vh] ">
            <h4 className="text-[20px] font-[600] text-gray-800">
              Add Third Level Category
            </h4>
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col w-[25%]">
                <div className="col">
                  <h3 className="text-[14px] font-[500] !mb-2">
                    Product Sub Category
                  </h3>
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productSubCat2}
                    label="Category"
                    onChange={handleChangeProductSubCat2}
                  >
                    {context?.catData?.length !== 0 &&
                      context?.catData?.map((item, index) => {
                      return(
                          item?.children?.length!==0 && item?.children.map((item2,index)=>{
                          return (
                          <MenuItem
                            key={index}
                            value={item2._id}
                            onClick={selectedCatFun2(item2.name)}
                          >
                            {item2.name}
                          </MenuItem>
                        );
                        })
                      )
                        
                      })}
                  </Select>
                </div>
              </div>

              <br />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">
                Sub Category Name
              </h3>
              <input
                type="text"
                className="w-[25%] h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                name="name"
                onChange={onChangeInput2}
                value={formFields2.name}
              />
            </div>
          </div>
          <hr />
          <br />
          <Button
            type="submit"
            className="btn-blue btn-lg w-[250px] flex gap-4"
          >
             {isLoading2  === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px]" />
                Publish and View
              </>
            )}
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddSubCategory;
