import jwt from 'jsonwebtoken';

const auth = async(req,res,next) => {
    try{
<<<<<<< HEAD
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
=======
        var token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]

        if(!token){
            token = req.query.token;
        }

>>>>>>> d8f2562b69d0e4cd6621ad29612b6617aeb9b60d

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
        return res.status(500).json({
            message: "You have not login",  //error.message || error,
            error : true,
            success : false
        })
    }
}

export default auth ;