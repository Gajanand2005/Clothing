import {Router} from 'express';
import { addToCartItemController, deleteCartItemQtyController, getCartItemsController, updateCartItemQtyController } from '../controllers/cartcontroller.js';
import auth from '../middleware/auth.js';

const cartRouter = Router();

cartRouter.post('/add',auth,addToCartItemController)
cartRouter.get ('/get',auth,getCartItemsController)
cartRouter.put ('/update-qty',auth,updateCartItemQtyController)
cartRouter.delete ('/delete-cart-item',auth,deleteCartItemQtyController)
export default cartRouter;