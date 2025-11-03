import CartProductModel from '../models/cartProductModel.js';
import UserModel from '../models/usermodel.js';

export const addToCartItemController = async(req, res)=>{
    try {
        const userId = req.userId;
        const {productId}= req.body;

        if(!productId){
            return res.status(402).json({
                message :"Provide productId",
                error : true,
                success: false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return res.status(400).json({
                message: "items already in cart" 
            })
        }

        const cartItems = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItems.save();

        const updateCartUser= await UserModel.updateOne({_id : userId},{
            $push : {
                shopping_cart : productId
            }
        })

        return res.status(200).json({
            data : save,
            message : 'item add to cart successfully',
            error : false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        });
    }
}

export const getCartItemsController= async(req,res)=>{
    try {
        
        const userId = req.userId;
        const cartItems = await CartProductModel.find({userId : userId}).populate('productId');

        return res.json({
            data : cartItems,
            error : false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const updateCartItemQtyController = async(req,res)=>{
    try {
        const userId = req.userId;
        const {_id, qty}= req.body;

         if(!_id || !qty){
            return res.status(400).json({
                message : "Provide _id, qty"
            })
         }

         const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
         },{
            quantity : qty
         }
         );

         return res.json({
            message : "update Cart",
            success : true,
            error : false,
            data : updateCartitem

         })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const deleteCartItemQtyController = async (req,res)=>{
    try {
        const userId = req.userId;
        const {_id, productId} = req.body;

        if(!_id){
            return res.status(400).json({
                message : "Provide_id",
                error : true,
                success: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            id : _id,
            userId : userId
        })

        if(!deleteCartItem){
          return res.status(404).json({
              message :"The product in the cart is not found",
            error : true,
            success: false
          })
        }

       const user = await UserModel.findOne({
        _id: userId
        })

        const cartItems = user?.shopping_cart; 
        
        const updatedUserCart = [...cartItems.slice(0, cartItems.indexOf(productId)), ...cartItems.slice(cartItems.indexOf(productId)+1)];

        user.shopping_cart = updatedUserCart;
        await user.save();

        return res.json({
            message : "Item remove",
            error : false,
            success: true,
            data : deleteCartItem
        })

    } catch (error) {
       return res.status(500).json({
        message: error.message || error,
        error : true,
        success: false
       }) 
    }
}