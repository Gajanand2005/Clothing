import jwt from 'jsonwebtoken';
import generatedAccessToken from '../utils/generatedAcessToken.js';
import generatedRefreshToken from '../utils/generatedRefresToken.js';
import UserModel from '../models/usermodel.js';

const auth = async(req,res,next) => {
    try{

        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]

        if(!token){
            token = req.query.token;
        }

        if(!token) {
            return res.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
        if(!decode) {
            return res.status(401).json({
                message : "Unauthorized access",
                error : true,
                success : false
            })
        }

        req.userId = decode.id
        next()


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Try to refresh the token
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    return res.status(401).json({
                        message: "Refresh token not provided",
                        error: true,
                        success: false
                    });
                }

                const refreshDecode = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
                if (!refreshDecode) {
                    return res.status(401).json({
                        message: "Invalid refresh token",
                        error: true,
                        success: false
                    });
                }

                const userId = refreshDecode.id;
                const user = await UserModel.findById(userId);
                if (!user || user.refresh_token !== refreshToken) {
                    return res.status(401).json({
                        message: "Refresh token mismatch",
                        error: true,
                        success: false
                    });
                }

                // Generate new access token
                const newAccessToken = await generatedAccessToken(userId);

                const cookiesOption = {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None"
                };

                res.cookie('accessToken', newAccessToken, cookiesOption);

                req.userId = userId;
                next();
            } catch (refreshError) {
                return res.status(401).json({
                    message: "Token refresh failed",
                    error: true,
                    success: false
                });
            }
        } else {
            return res.status(500).json({
                message: "You have not login",  //error.message || error,
                error : true,
                success : false
            })
        }
    }
}

export default auth ;