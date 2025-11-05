import {Router} from 'express';
import { addAddressController } from '../controllers/addresscontroller.js';
import auth from '../middleware/auth.js';


const addressRouter = Router();

addressRouter.post('/add',auth, addAddressController);

export default addressRouter;