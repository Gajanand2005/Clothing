import mongoose from 'mongoose' ;


const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
<<<<<<< HEAD
        ref: 'product'
=======
        ref: 'Product'
>>>>>>> d8f2562b69d0e4cd6621ad29612b6617aeb9b60d
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)

const  CartProductModel = mongoose.model('cartProduct', cartProductSchema);
export default CartProductModel ;