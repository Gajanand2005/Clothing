import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from './../models/usermodel.js';
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import sendEmailFun from "../config/sendEmail.js";
import generatedAccessToken from "../utils/generatedAcessToken.js";
import generatedRefreshToken from "../utils/generatedRefresToken.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { error } from "console";


cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});
//register User
export async function registerUserController(request, response) {
  try {
    let user;

    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email: email });

    if (user) {
      return response.json({
        message: "User already registered with this email!",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new UserModel({
      email: email,
      password: hashPassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    });

    await user.save();

    //send verification email
    const verifyEmail = await sendEmailFun({
      sendTo: email,
      subject: "Verify email from smalcouture",
      text: "",
      html: VerificationEmail(name, verifyCode),
    });

    //Create a JWT token for verification purposes
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return response.status(200).json({
      success: true,
      error: false,
      message: "User Registered successfully! Please verify your email.",
      token: token, // Optional: include this if needed for verification.s
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//verify email
export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return response.status(400).json({ error: true, success: false, message: "User not found" });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return response.status(200).json({ error: false, success: true, message: "Email verified successfully" });
        } else if (!isCodeValid) {
            return response.status(400).json({ error: true, success: false, message: "Invalid OTP" });
        } else {
            return response.status(400).json({ error: true, success: false, message: "OTP Expired" });
        }


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//login user
export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false
            })
        }

        if (user.verify_email !== true) {
            return res.status(400).json({
                message: "Your Email.is not verify yet please verify your email first",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your password",
                error: true,
                success: false
            })
        }


        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })


        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken', accessToken, cookiesOption);
        res.cookie('refreshToken', refreshToken, cookiesOption);


        return res.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// logout controller 
export async function logoutController(request, res) {
    try {
        const userid = request.userId;  //middleware

        const cokkiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie('accessToken', cokkiesOption);
        res.clearCookie('refreshToken', cokkiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return res.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//image upload
var imagesArr = [];
export async function userAvatarController(request, response) {
    try {
        imagesArr = [];

        const userId = request.userId; // auth middleware
        const image = request.files;

        if (!image || image.length === 0) {
            return response.status(400).json({
                message: "No image file provided",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // first remove image from cloudinary if exists
        if (user.avatar) {
            const imgUrl = user.avatar;
            const urlArr = imgUrl.split("/");
            const avatar_image = urlArr[urlArr.length - 1];
            const imageName = avatar_image.split(".")[0];

            if (imageName) {
                await cloudinary.uploader.destroy(imageName);
            }
        }

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(image[i].path, options);
            imagesArr.push(result.secure_url);
            fs.unlinkSync(image[i].path);
        }

        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avatar: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// remove image
export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error,res)
            }
        );

        if (res) {
            response.status(200).send(res);
        }
    }
}

// update user details
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId //auth middleware 
        const { name, email, mobile, password } = request.body;
        const userExist = await UserModel.findById(userId);
        if (!userExist)
            return response.status(400).send('The user cannot be Updated!');

        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }
        let hashPassword = ""

        if (password) {
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)
        } else {
            hashPassword = userExist.password;
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email,
                verify_email: email !== userExist.email ? false : true,
                password: hashPassword,
                otp: verifyCode !== "" ? verifyCode : null,
                otpExpires: verifyCode !== "" ? Date.now() + 600000 : ''
            },
            { new: true }
        )

        if (email !== userExist.email) {
            //send verification email
            await sendEmailFun({
                sendTo: email,
                subject: "Verrify email from smalcouture App",
                text: "",
                html: VerificationEmail(name, verifyCode)
            })
        }

        return response.json({
            message: "User Updated successfully",
            error: false,
            success: true,
            user: {
                name:updateUser?.name,
                _id:updateUser?._id,
                email:updateUser?.email,
                mobile:updateUser?.mobile, 
                avatar:updateUser?.avatar,
                
            }
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

//forgot password
export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }
        else {

            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp = verifyCode;
            user.otpExpires = Date.now() + 600000;
            await user.save();



            await sendEmailFun({
                sendTo: email,

                subject: "Verify email from SmalCouture ",
                subject: "Verify OTP from SmalCouture ",
                text: "",
                html: VerificationEmail(user.name, verifyCode)
            })

            return response.json({
                message: "Otp sent to  your email",
                error: false,
                success: true
            })

        }



    } catch (error) {

    }
}

//verify forgot password
export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body;

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide required fields: email, otp.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        if (otp !== user.otp) {
            return response.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        const currentTime = new Date();
        if (user.otpExpires < currentTime) {
            return response.status(400).json({
                message: "OTP is expired",
                error: true,
                success: false
            });
        }

        // Reset OTP fields after successful verification
        user.otp = "";
        user.otpExpires = "";

        await user.save();

        return response.status(200).json({
            message: "Verify OTP successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// reset password
export async function resetPassword(request, response) {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = request.body;

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Provide required fields: email, oldPassword, newPassword, confirmPassword"
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "Email is not available",
        error: true,
        success: false
      });
    }

    if (!user.password) {
      return response.status(400).json({
        message: "No password found for this user.",
        error: true,
        success: false
      });
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) {
      return response.status(400).json({
        message: "Your old password is wrong",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "New password and confirm password must be same.",
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(confirmPassword, salt);

    user.password = hashPassword;
    await user.save();

    return response.json({
      message: "Password updated successfully.",
      error: false,
      success: true
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

//refresh Token
export async function refreshToken(request, response) {
    try {

        const refreshToken = request.cookies.refreshToken // bear token

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        if (!verifyToken) {
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id
        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', newAccessToken, cookiesOption)

        return response.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get login user details
export async function userDetails(request, response) {
    try {
        const userId = request.userId
        console.log(userId)
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        // Prevent caching to avoid 304 responses
        response.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.set('Pragma', 'no-cache');
        response.set('Expires', '0');

        return response.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}