import {Router} from 'express';
import { addAddressController, deleteAddressController, getAddressController } from '../controllers/addresscontroller.js';
import auth from '../middleware/auth.js';


const addressRouter = Router();

addressRouter.post('/add',auth, addAddressController);
addressRouter.get('/get',auth, getAddressController);
addressRouter.delete('/:id',auth, deleteAddressController);
// addressRouter.put('/selectAddress/:id',auth, selectAddressController);


export default addressRouter;