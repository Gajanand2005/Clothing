import React from "react";
import AccountSidebar from "../../Components/AccountSidebar";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const Address = () => {
  const [address, setAddress] = useState([]);
  const context = useContext(MyContext);
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
                onClick={() =>
                  context.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Address",
                  })
                }
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
                        className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer border border-dashed border-[rgba(0,0,0,0.2)] "
                        onClick={() =>
                          handleChange({
                            target: { value: address?._id },
                          })
                        }
                      >
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
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

        <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disablePadding key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>          

    </>
  );
};

export default Address;
