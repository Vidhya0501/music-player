import Auth from '../common/Auth.js'


const validate = async(req,res,next)=>{
    try {
        let token = req?.headers?.authorization?.split(" ")[1];

        if(token)
        {

            let decoded = await Auth.verifyToken(token)
            req.body.userId = decoded.userId
            next()
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message || 'Internal Server Error'
        })
    }
}

export default validate