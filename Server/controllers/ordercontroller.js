import OrderModel from "../models/ordermodel.js";
import ProductModel from'../models/productmodel.js';

export const createOrderController = async (req, res)=>{
    try {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        let order = new OrderModel({
            userId: req.body.userId,
            orderId: orderId,
            products: req.body.products,
            paymentId: req.body.paymentId,
            payment_status: req.body.payment_status,
            delivery_address: req.body.delivery_address,
            totalAmt: req.body.totalAmt
        });

        // Update product stock
        for(let i = 0; i < req.body.products.length; i++){
            await ProductModel.findByIdAndUpdate(req.body.products[i].productId,
                {
                    $inc: { countInStock: -req.body.products[i].quantity }
                },
                {new: true}
            );
        }

        order = await order.save();

        return res.status(200).json({
            error: false,
            success: true,
            message: "Order created successfully",
            orderId: orderId
        });

    } catch (error) {
         return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const getOrdersDetailsController = async (req, res)=>{
    try {
        const userId = req.userId;

        const orderlist = await OrderModel.find({userId: userId}).sort({createdAt: -1}).populate('delivery_address userId products.productId')

        return res.json({
            message: "Order list fetched successfully",
            data: orderlist,
            error: false,
            success: true,
        })

    } catch (error) {
         return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

export const updateOrderStatusController = async (req, res)=>{
    const { id } = req.params;
    const { order_status } = req.body;


   try {
     const updateOrder = await OrderModel.findByIdAndUpdate(
        id,
        {
            order_status: order_status

        },
        { new: true }
    )
     return res.json({
        message: "Order status updated successfully",
        data: updateOrder,
        error: false,
        success: true,
    })
   } catch (error) {
    return res.status(500).json({
        message: error.message || error,
        error : true,
        success: false
    })
   }

}