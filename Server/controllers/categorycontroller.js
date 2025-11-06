import CategoryModel from './../models/categorymodel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true, 
});

var imagesArr = [];
export async function uploadImages(request, response) {
    try {
        imagesArr = [];

        const image = request.files;
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        const uploadPromises = image.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    file.path,
                    options,
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (result && result.secure_url) {
                                imagesArr.push(result.secure_url);
                            } else {
                                console.error("Upload failed: no secure_url", result);
                            }
                            // Delete from local uploads folder
                            try {
                                fs.unlinkSync(file.path);
                            } catch (unlinkError) {
                                console.error("Error deleting file:", unlinkError);
                            }
                            resolve();
                        }
                    }
                );
            });
        });

        await Promise.all(uploadPromises);

        return response.status(200).json({
            images: imagesArr
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// create category
export async function createCategory(request, response) {
    try {
        let category = new CategoryModel ({
            name : request.body.name,
            images : imagesArr,
            parentId : request.body.parentId,
            parentCatName : request.body.parentCatName,
        });

        if (!category) {
            return response.status(500).json({
            message: "category not created",
            error: true,
            success: false
        })
    }

    category =  await category.save();

    imagesArr = [];

    return response.status(201).json({
            message: "category created",
            error: false,
            success: true,
            category : category
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get category 
export async function getCategories(request, response) {
    try {
        const categories = await CategoryModel.find();
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap[cat._id] = { ...cat._doc, children : [] };
        });

        const rootCategories = [];

        categories.forEach(cat => {
            if (cat.parentId) {
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);
            }
        });

        response.set('Cache-Control', 'no-store');
        return response.status(200).json({
            error: false,
            success: true,
            data : rootCategories
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//get category count
export async function getCategoriesCount(request, response) {
    try {
        const categoryCount = await CategoryModel.countDocuments({parentId:undefined});
        if (!categoryCount) {
            response.status(500).json({ success : false, error: true });
        }
        else {
            response.send({
                categoryCount : categoryCount,
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//get subcategory count
export async function getSubCategoriesCount(request, response) {
    try {
        const categories = await CategoryModel.find();
        if (!categories) {
            response.status(500).json({ success : false, error: true });
        }
        else {
            const subCatList = [];
            for (let cat of categories) {
                if (cat.parentId!==undefined){
                    subCatList.push(cat);
            }
        }

        response.send({
            subCategoryCount : subCatList.length,
        });

    }  

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//get single category
export async function getCategory(request, response) {
    try {
        const category = await CategoryModel.findById(request.params.id);

        if (!category) {
            response.status(500)
                .json(
                    { 
                        message : "The category with the given ID was not found.",
                        error : true,
                        success : false
                    }
                );
        }

        return response.status(200).json ({
            error : false,
            success : true,
            category : category
        })


    } catch (error) {
         return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// Delete images
export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;

        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            const result = await cloudinary.uploader.destroy(imageName);

            if (result.result === 'ok') {
                return response.status(200).json({
                    success: true,
                    message: 'Image deleted successfully'
                });
            } else {
                return response.status(400).json({
                    success: false,
                    message: 'Failed to delete image'
                });
            }
        } else {
            return response.status(400).json({
                success: false,
                message: 'Invalid image URL'
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// Delete category
export async function deleteCategory(request, response) {
    const category = await CategoryModel.findById(request.params.id);
    const images = category.images;
    let img = "";
    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if(imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {
            //console.log (error, result);
        });
        }  
    }
    
    const subCategory = await CategoryModel.find({
        parentId : request.params.id
    });

    for (let i = 0; i < subCategory.length; i++) {
        // console.log(subCategory[i]._id);

        const thirdSubCategory = await CategoryModel.find({
            parentId : subCategory[i]._id
        });

        for (let i = 0; i < thirdSubCategory.length; i++) {
            const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdSubCategory[i]._id);
        }
        const deletedSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
    }

    const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    if (!deletedCat) {
        response.status(404).json({
            message : "Category not found!",
            success : false,
            error : true
        });
    }

    response.status(200).json({
        success : true,
        error : false,
        message : "Category deleted!",
    })
}


// Update category
export async function updatedCategory(request, response) {
    // console.log(imagesArr);

    const body = request.body || {};
    const updateData = {};

    if (body.name !== undefined) {
        updateData.name = body.name;
    }
    if (imagesArr.length > 0) {
        updateData.images = imagesArr;
    } else if (body.images !== undefined) {
        updateData.images = body.images;
    }
    if (body.parentId !== undefined) {
        updateData.parentId = body.parentId;
    }
    if (body.parentCatName !== undefined) {
        updateData.parentCatName = body.parentCatName;
    }

    if (Object.keys(updateData).length === 0) {
        return response.status(400).json({
            message: "No valid fields provided for update",
            error: true,
            success: false
        });
    }

    const category = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        updateData,
        { new: true }
    );

    if (!category) {
        return response.status(404).json({
            message: "Category not found or cannot be updated!",
            success: false,
            error: true
        });
    }

    imagesArr = [];

    response.status(200).json({
        error: false,
        success: true,
        category: category
    });
}