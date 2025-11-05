import mongoose from "mongoose";
import AddressModel from "../models/adressmodel.js";
import UserModel from "../models/usermodel.js";




export async function addAddressController (request, response) {

try {
    const {address_line1, city, state, pincode, country, mobile, status, Selection } = request.body;
    const userId = request.userId;  
if(!address_line1 || !city || !state || !pincode || !country || !mobile ){
     return response.status(400).json({
      message: "All fields are required",
      error: true,
      success: false,
    });
}
    
const address = new AddressModel({
    address_line1,
    city,
    state,
    pincode,
    country,
    mobile,
    status: status === 'true' || status === true ? true : false,
    userId,
    Selection
});

 const savedAddress = await address.save();


 const updateUserAddress = await UserModel.updateOne({_id : userId},{
    $push : {
        address_details : savedAddress?._id
    }
 }) 

   return response.status(200).json({
            data : savedAddress,
            message : 'Address added successfully',
            error : false,
            success: true
        });
    
} catch (error) {
     return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
}


}

export async function getAddressController (request, response) {
   try {
     const userId = request.userId;
     const address = await AddressModel.find({userId: userId});

        if(!address || address.length === 0){
            return response.status(404).json({
                error: true,
                 success: false,
                 message :"Address not found"
            })
        }

       return response.status(200).json({
                error: false,
                 success: true,
                 data: address
            })

   } catch (error) {
    return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    })
   }
}

// export async function selectAddressController (request, response) {
//         try {
//             const addressId = request.params.id;
//             const userId = request.userId;

//             if (!mongoose.Types.ObjectId.isValid(addressId)) {
//                 return response.status(400).json({
//                     message: "Invalid address ID",
//                     error: true,
//                     success: false
//                 });
//             }

//             const address = await AddressModel.findOne({
//                 _id: addressId,
//                 userId: userId
//             });

//             if(!address){
//                 return response.status(404).json({
//                 message: "Address not found",
//                 error: true,
//                 success: false
//             });
//             }

//             // Deselect all addresses for the user
//             await AddressModel.updateMany(
//                 { userId: userId },
//                 { selected: false }
//             );

//             // Select the specified address
//             const updateAddress = await AddressModel.findByIdAndUpdate(
//                 addressId,
//                 { selected: true },
//                 { new: true }
//             );

//             return response.status(200).json({
//                 error: false,
//                 success: true,
//                 address: updateAddress
//             });

//         } catch (error) {
//             return response.status(500).json({
//                 message: error.message || error,
//                 error: true,
//                 success: false
//             });
//         }
// }