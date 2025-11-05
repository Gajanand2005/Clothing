import AddressModel from "../models/adressmodel.js";
import UserModel from "../models/usermodel.js";




export async function addAddressController (request, response) {

try {
    const {address_line1, city, state, pincode, country, mobile, status } = request.body;
    const userId = request.userId;  
if(!address_line1 || !city || !state || !pincode || !country || !mobile ){
     return response.status(500).json({
      message: " All fields are required",
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
    status,
    userId
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