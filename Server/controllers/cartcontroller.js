import CartProductModel from '../models/cartProductModel.js';

export const addToCartItemController = async(req, res)=>{
    try {
        const userId = req.userId;
        const {productTitle,image,price,quantity,subTotal,productId,countInStock}= req.body;

        if(!productId){
            return res.status(400).json({
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
           productTitle:productTitle,
            image:image,
            price:price,
            quantity:quantity,
            subTotal:subTotal,
            productId:productId,
            countInStock:countInStock,
            userId:userId

        })

        const save = await cartItems.save();

        

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
        const cartItems = await CartProductModel.find({userId : userId});

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
        const {_id, qty,subTotal}= req.body;

         if(!_id || !qty){
            return res.status(400).json({
                message : "Provide _id, qty"
            })
         }

         const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
         },{
            quantity : qty,
            subTotal: subTotal
         },{new:true}
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
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                message : "Provide_id",
                error : true,
                success: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            _id : id,
            userId : userId
        })

        if(!deleteCartItem){
          return res.status(404).json({
              message :"The product in the cart is not found",
            error : true,
            success: false
          })
        }

        return res.json({
            message : "Item removed",
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