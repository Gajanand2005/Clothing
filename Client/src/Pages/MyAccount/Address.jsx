import React, { useEffect, useState } from "react";
import AccountSidebar from "../../Components/AccountSidebar";
import Radio from "@mui/material/Radio";
import { useContext } from "react";
import { MyContext } from "../../App";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { deleteData, fetchDataFromApi, postData } from "../../Utlis/Api";
import { FaRegTrashAlt } from "react-icons/fa";

const label = { inputProps: { "aria-label": "Radio demo" } };

const Address = () => {
  const [address, setAddress] = useState([]);
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModel, setisOpenModel] = useState(false);

  const context = useContext(MyContext);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: context?.userdata?._id,
    selected: false,
  });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.alertBox("error", "Address Line 1 is required");
      return false;
    }

    if (formFields.city === "") {
      context.alertBox("error", "City is required");

      return false;
    }

    if (formFields.state === "") {
      context.alertBox("error", "State is required");

      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "Pincode is required");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "Country is required");

      return false;
    }

    if (phone === "") {
      context.alertBox("error", "Mobile No is required");
      return false;
    }

    postData(`/api/address/add`, formFields).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.message);

      

        setisOpenModel(false);

        fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
          (res) => {
            setAddress(res.data);
          }
        );
      } else {
        context.alertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const handleClose = () => {
    setisOpenModel(false);
  };

  useEffect(() => {
    if (context?.userData?._id) {
      fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
        (res) => {
          setAddress(res.data);
        }
      );
    }
  }, [context?.userData]);

// const removeAddress = (id) => {
//   deleteData(`/api/address/${id}`).then((res) => {

//       fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
//         (res) => {
//           setAddress(res.data);
//         }
//       );
//     });
// };

const removeAddress = async (id) => {
  try {
    const res = await deleteData(`/api/address/${id}`);
    if (res?.success) {
      // 1️⃣ UI se turant hata do
      setAddress((prev) => prev.filter((item) => item._id !== id));

      // 2️⃣ Optional: background me fresh data le aao
      fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then(
        (res) => {
          setAddress(res.data);
        }
      );

      context.alertBox("success", "Address removed successfully");
    } else {
      context.alertBox("error", res?.message || "Failed to remove address");
    }
  } catch (error) {
    console.log(error);
    context.alertBox("error", "Something went wrong while removing address");
  }
};



  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-full lg:w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md !mb-5">
              <div className="flex items-center pb-3">
                <h2 className="text-[20px] font-[600] pb-0">Address</h2>
              </div>
              <hr />

              <div
                className="flex !mt-4 items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer hover:bg-[#e1f1ff]"
                onClick={() => setisOpenModel(true)}
              >
                <span className="text-[14px] font-[500]">Add Address </span>
              </div>
              <div className="flex gap-2 flex-col mt-4 ">
                {address?.address_line1}
                {address?.length > 0 &&
                  address.map((address, index) => {
                    return (
                      <div
                        key={index}
                        className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer border border-dashed border-[rgba(0,0,0,0.2)] relative group "
                        onClick={() =>
                          handleChange({
                            target: { value: address?._id },
                          })
                        }
                      >
                        <div className="!mr-auto">
                        <Radio
                         
                          name="address"
                          value={address?._id}
                          onChange={handleChange}
                          checked={selectedValue === address?._id}
                         
                        />
                        <span className="text-[12px]">
                          {address?.address_line1 +
                            " " +
                            address?.country +
                            " " +
                            address?.city +
                            " " +
                            address?.state +
                            " " +
                            address?.pincode}
                        </span>
 </div>
                        <span onClick={()=> removeAddress(address?._id)}  className="hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white  !ml-auto z-50 "><FaRegTrashAlt/>  </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModel}>
        <DialogTitle>Add Address </DialogTitle>
        <form className="p-8 py-3 pb-8 " onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 pt-2 pb-5">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="address Line 1"
                variant="outlined"
                size="small"
                name="address_line1"
                onChange={onchangeInput}
                value={formFields.address_line1}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pt-2 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                size="small"
                name="city"
                onChange={onchangeInput}
                value={formFields.city}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="State"
                variant="outlined"
                size="small"
                name="state"
                onChange={onchangeInput}
                value={formFields.state}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pt-2 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Pincode"
                variant="outlined"
                size="small"
                name="pincode"
                onChange={onchangeInput}
                value={formFields.pincode}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                size="small"
                name="country"
                onChange={onchangeInput}
                value={formFields.country}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pt-2 pb-5">
            <div className="col w-[50%]">
              <PhoneInput
                defaultCountry="in"
                value={formFields?.mobile}
                disabled={isLoading}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields((prev) => ({
                    ...prev,
                    mobile: phone,
                  }));
                }}
              />
            </div>

            <div className="col w-[50%]">
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex  items-center gap-5 ">
            <Button
              className="!bg-orange-600 flex !text-white w-full items-center text-[19px] hover:!bg-black gap-2"
              type="submit"
            >
              Save{" "}
            </Button>

            <Button
              className="btn-border btn-lg !bg-orange-600  !text-white  flex  w-full items-center text-[19px] hover:!bg-black gap-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
