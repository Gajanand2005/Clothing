// import { Button, Select, MenuItem, CircularProgress } from "@mui/material";
// import React, { useContext, useEffect, useState, useRef } from "react";
// import { MdOutlineEdit } from "react-icons/md";
// import { FcFullTrash } from "react-icons/fc";
// import { MyContext } from "../../App";
// import { editData, deleteData } from "../../../Utlis/Api";

// const EditCategory = (props) => {
//   const [editMode, setEditMode] = useState(false);
//   const [selectVal, setSelectVal] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const isSubmitting = useRef(false);

//   const [formFields, setFormFields] = useState({
//     name: "",
//     parentCatName: null,
//     parentId: null,
//   });

//   const context = useContext(MyContext);

//   useEffect(() => {
//     setFormFields({
//       name: props?.name || "",
//       parentCatName: props?.selectedCatName || null,
//       parentId: props?.selectedCat || null,
//     });
//     setSelectVal(props?.selectedCat || "");
//   }, [props?.name, props?.selectedCatName, props?.selectedCat]);

//   const onchangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormFields((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleChange = (event) => {
//     const value = event.target.value;
//     setSelectVal(value);
//     setFormFields((prev) => ({
//       ...prev,
//       parentId: value,
//     }));
//   };

//  const deleteCat = (id) =>{
//   deleteData(`/api/category/${id}`).then((res)=>{
//     context.getCat();
//   })
//  }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isLoading) return; // Prevent multiple submissions
//     setIsLoading(true);
//     if (formFields.name === "") {
//       context.alertBox("error", "Please enter category name");
//       setIsLoading(false);
//       return false;
//     }

//     try {
//       const res = await editData(`/api/category/${props?.id}`, formFields);
//       context.alertBox("success", res?.data?.message);
//       setEditMode(false); // Exit edit mode after success
//     } catch (error) {
//       context.alertBox("error", "Failed to update category");
//     } finally {
//       setIsLoading(false);
//     }
//   };

 

//   return (
//     <>
//       <form
//         action=""
//         className="w-100 flex items-center gap-3 p-0 px-4"
//         onSubmit={handleSubmit}
//       >
//         {editMode === true && (
//           <>
//             <div className="flex items-center justify-between py-2 gap-4 ">
//               <div className="w-[150px]">
//                 <Select
//                   style={{ zoom: "75%" }}
//                   className="w-full"
//                   size="small"
//                   value={selectVal}
//                   onChange={handleChange}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                 >
//                   {props?.catData?.length !== 0 &&
//                     props?.catData?.map((item, index) => {
//                       return (
//                         <MenuItem
//                           value={item?._id}
//                           key={index}
//                           onClick={() => {
//                             setFormFields((prev) => ({
//                               ...prev,
//                               parentCatName: item?.name,
//                             }));
//                           }}
//                         >
//                           {item?.name}
//                         </MenuItem>
//                       );
//                     })}
//                 </Select>
//               </div>
//               <input
//                 type="text"
//                 className="w-full h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0.4)] rounded-sm p-3 text-sm"
//                 name="name"
//                 value={formFields?.name}
//                 onChange={onchangeInput}
//               />
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="small"
//                   className="!bg-blue-500 !text-white"
//                   type="submit"
//                   variant="contained"
//                 >
//                   {isLoading === true ? (
//                     <CircularProgress color="inherit" />
//                   ) : (
//                     <>Edit</>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}

//         {editMode === false && (
//           <>
//             <span className="font-[500] text-[14px]">{props?.name}</span>
//             <div className="flex items-center ml-auto gap-2">
//               <Button
//                 className="!min-w-[35px] !w-[35px] !h-[35px] rounded-full !text-black"
//                 onClick={() => {
//                   setEditMode(true);
//                   setSelectVal(props.selectedCat);
//                 }}
//               >
//                 <MdOutlineEdit />
//               </Button>
//               <Button
//                 className="!min-w-[35px] !w-[35px] !h-[35px] rounded-full !text-black"
//                 onClick={() => deleteCat(props?.id)}
//               >
//                 <FcFullTrash />
//               </Button>
//             </div>
//           </>
//         )}
//       </form>
//     </>
//   );
// };

// export default EditCategory;


import { Button, Select, MenuItem, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FcFullTrash } from "react-icons/fc";
import { MyContext } from "../../App";
import { editData, deleteData } from "../../../Utlis/Api";

const EditSubCatBox = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(MyContext);

  // 🔁 Load props initially
  useEffect(() => {
    setFormFields({
      name: props?.name || "",
      parentCatName: props?.selectedCatName || null,
      parentId: props?.selectedCat || null,
    });
    setSelectVal(props?.selectedCat || "");
  }, [props?.name, props?.selectedCatName, props?.selectedCat]);

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectVal(value);
    setFormFields((prev) => ({
      ...prev,
      parentId: value,
    }));
  };

  const deleteCat = async (id) => {
    try {
      await deleteData(`/api/category/${id}`);
      context.alertBox("success", "Subcategory deleted successfully");
      context.getCat(); // refresh list
    } catch (err) {
      context.alertBox("error", "Failed to delete subcategory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (formFields.name.trim() === "") {
      context.alertBox("error", "Please enter subcategory name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await editData(`/api/category/${props?.id}`, formFields);
      context.alertBox("success", res?.data?.message);
      setEditMode(false);
      context.getCat(); // refresh category data
    } catch (error) {
      context.alertBox("error", "Failed to update subcategory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-1 px-4 border-b border-gray-200"
    >
      {editMode ? (
        <>
          <Select
            style={{ zoom: "75%" }}
            className="w-[150px]"
            size="small"
            value={selectVal}
            onChange={handleChange}
            displayEmpty
          >
            {props?.catData?.length !== 0 &&
              props?.catData?.map((item, i) => (
                <MenuItem
                  value={item?._id}
                  key={i}
                  onClick={() =>
                    setFormFields((prev) => ({
                      ...prev,
                      parentCatName: item?.name,
                    }))
                  }
                >
                  {item?.name}
                </MenuItem>
              ))}
          </Select>

          <input
            type="text"
            className="w-full h-[30px] border border-[rgba(0,0,0,0.2)] rounded-sm p-2 text-sm"
            name="name"
            value={formFields?.name}
            onChange={onchangeInput}
          />

          <Button
            size="small"
            className="!bg-blue-500 !text-white"
            type="submit"
            variant="contained"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save"}
          </Button>
        </>
      ) : (
        <>
          <span className="text-[14px] font-[500]">{props?.name}</span>

          <div className="flex items-center ml-auto gap-2">
            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] rounded-full !text-black"
              onClick={() => {
                setEditMode(true);
                setSelectVal(props.selectedCat);
              }}
            >
              <MdOutlineEdit />
            </Button>

            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] rounded-full !text-black"
              onClick={() => deleteCat(props?.id)}
            >
              <FcFullTrash />
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditSubCatBox;
