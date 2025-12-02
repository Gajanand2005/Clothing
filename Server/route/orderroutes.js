import {Router} from 'express';
import { createOrderController, getOrdersDetailsController } from '../controllers/ordercontroller.js';
import auth from '../middleware/auth.js';

const orderRouter = Router();

orderRouter.post('/create', auth, createOrderController)
orderRouter.get("/order-list",auth, getOrdersDetailsController)



export default orderRouter;