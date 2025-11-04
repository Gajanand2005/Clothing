import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import AccountSidebar from "../../Components/AccountSidebar/index.jsx";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData } from "../../Utlis/Api.js";
import CircularProgress from "@mui/material/CircularProgress";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name || "",
        email: context?.userData?.email || "",
        mobile: context?.userData?.mobile ? String(context?.userData?.mobile) : "",
      })
    }
  }, [context?.userData]);

    const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      context.alertBox("error", "Please enter full name ");
      return false;
    }

    if (formFields.email === "") {
      context.alertBox("error", "Please enter email id ");
      return false;
    }

    if (formFields.mobile === "") {
      context.alertBox("error", "Please enter mobile number ");
      return false;
    }

    setIsLoading(true);

    editData(`/api/user/${userId}`, formFields)
      .then((res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.data?.message);
          localStorage.setItem("userEmail", formFields.email);
          setFormFields({
            name: res?.user?.name || formFields.name,
            email: res?.user?.email || formFields.email,
            mobile: res?.user?.mobile || formFields.mobile,
          });

          // Update context userData
          context.setUserData(res?.data?.user);

          context.setIsLogin(true);

          // Do not redirect, stay on the page
        } else {
          context.alertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        context.alertBox("error", "Login failed. Please try again.");
      });
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-full lg:w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md">
              <h2 className="text-[20px] font-[600] pb-3">My Profile</h2>
              <hr />

              <form action="" className="!mt-5" onSubmit={handleSubmit}>
                <div className="flex items-center gap-5 ">
                  <div className="w-[50%]">
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="name"
                      value={formFields.name}
                      disabled={isLoading === true ? true : false}
                      onChange={onchangeInput}
                    />
                  </div>

                  <div className="w-[50%]">
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="email"
                      value={formFields.email}
                      disabled={isLoading === true ? true : false}
                      onChange={onchangeInput}
                    />
                  </div>
                </div>
                <div className="flex items-center !mt-4 gap-5 ">
                  <div className="w-[50%]">
                    <TextField
                    type="number"
                      label="Number"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="mobile"
                      value={formFields.mobile}
                      disabled={isLoading === true ? true : false}
                      onChange={onchangeInput}
                    />
                  </div>
                </div>

                <br />

                <div className="flex items-center gap-4">
                  <Button className="!bg-orange-600 !text-white hover:!bg-black w-[150px]" type="submit" disabled={!valideValue}>
                    {isLoading === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;

