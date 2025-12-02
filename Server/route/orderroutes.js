import {Router} from 'express';
import { createOrderController, getOrdersDetailsController, updateOrderStatusController } from '../controllers/ordercontroller.js';
import auth from '../middleware/auth.js';

const orderRouter = Router();

orderRouter.post('/create', auth, createOrderController)
orderRouter.get("/order-list",auth, getOrdersDetailsController)
orderRouter.put("/order-status/:id",auth, updateOrderStatusController)



export default orderRouter;