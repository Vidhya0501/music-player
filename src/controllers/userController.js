import User from "../models/User.js";
import Song from "../models/Song.js";
import Auth from "../common/Auth.js"




const create = async(req,res)=>{
    try {
        let {username,email,password} = req.body
        let user = await User.findOne({email:email})

        if(!user)
        {
            password = await Auth.hashPassword(password)
            await User.create({username,email,password})

            res.status(200).send({
                message:"User Created Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:`User with ${email} already exists`
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}

const login = async(req,res)=>{
    try {
        //validate if the email and password are valid
        let {email,password} = req.body
        let user = await User.findOne({email:email})

        if(user)
        {
            if(await Auth.hashCompare(password,user.password))
            {
                let token = await Auth.createToken({
                    email,
                    userId:user._id
                })

                res.status(200).send({
                    message:"Login Successful",
                    success:true,
                    data:token
                    
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:"User Does Not Exists"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}

const getUserById=async(req,res)=>{
try {
    const user=await User.findById(req.body.userId,{password:0})
    res.status(200).send({
        message:"User data fetched successfully",
        success:true,
        data:user
    })
} catch (error) {
    res.status(500).send({
        message: error.message || 'Internal Server Error'  
    })
}
}


const getAllUsers = async(req,res)=>{
    try {
        let users = await User.find({password:0})
        res.status(200).send({
            message:"User Data Fetch Successful",
            data:users
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}



const deleteUser = async(req,res)=>{
    try {
        let userId = req.params.id
        let user = await User.findById(userId)
        if(user)
        {
            await User.deleteOne({_id:userId})
            res.status(200).send({
                message:"User Deleted Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid User"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}



const getUserFavoriteSongs = async (req, res) => {
    try {
        const { id } = req.user;
	const user = await User.findById(id);

	if (!user) {
		return res.status(404).send({ message: "User not found!" });
	}

	const userFavorites = await Promise.all(
		user.favorites.map((id) => Song.findById(id))
	);

	if (!userFavorites) {
		return res.status(404).send({ message: "Not found!" });
	}

	res.status(200).send(userFavorites);
}
     catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
	
}

export default {
    create,
    login,
    getUserById,
    getAllUsers,
    deleteUser,
    getUserFavoriteSongs
}