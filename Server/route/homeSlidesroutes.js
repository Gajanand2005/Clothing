import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { addHomeSlide, deleteMultipleSlides, getHomeSlides, getSlide, removeImageFromCloudinary, updateSlide, uploadImages, } from '../controllers/homeSlidercontroller.js';
const homeSlidesRouter = Router();

homeSlidesRouter.post('/uploadImages', auth,upload.array('images'),uploadImages);
homeSlidesRouter.post('/add', auth,addHomeSlide);
homeSlidesRouter.get('/', getHomeSlides);
homeSlidesRouter.get('/:id', getSlide);
homeSlidesRouter.delete('/deleteImage',auth, removeImageFromCloudinary);
homeSlidesRouter.delete('/:id',auth, deleteMultipleSlides);
homeSlidesRouter.put('/:id',auth, updateSlide);
homeSlidesRouter.post('/publish', auth, addHomeSlide);

export default homeSlidesRouter;