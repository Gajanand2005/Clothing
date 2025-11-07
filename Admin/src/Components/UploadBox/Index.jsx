import React, { useContext, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { uploadImage } from "../../../Utlis/Api";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";
const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const context = useContext(MyContext);

  let selectedImages = [];

  const formdata = new FormData();
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp" ||
            files[i].type === "image/gif" ||
            files[i].type === "image/png") 
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(props?.name, file);
          uploadImage(apiEndPoint, formdata).then((res) => {
            setUploading(false);
            props.setPreviews(res?.data?.images)
            
            setPreviews(res?.data?.images);
          });
        } else {
          setUploading(false);
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        {
          uploading === true ? <>
            <CircularProgress/>
            <h4 className="text-center">Uploading....</h4>
          </>:
          <>
            <IoIosImages className="text-[50px] opacity-50 pointer-events-none " />
        <h4 className="text-[14px] pointer-events-none">Image Upload</h4>

        <input
          type="file"
          accept="image/*"
          multiple={props.multiple !== undefined ? props.multiple : false}
          className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
          onChange={(e) => onChangeFile(e, props?.url)}
          name="images"
        />
          </>
        }
        
      </div>
    </>
  );
};

export default UploadBox;
