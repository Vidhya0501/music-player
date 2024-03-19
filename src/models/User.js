import mongoose from './index.js'

const validateEmail = (value)=>{
    return String(value)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const userSchema=new mongoose.Schema({
    username: {
		type: String,
		required: true,
		unique: true,
	},
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validateEmail,
            message:props=>`${props.value} is Invalid Email`
        }
    },
	password: {
		type: String,
		required: true,
	},
	favorites: {
		type: Array,
		default: [],
	},
	playlists: {
		type: Array,
		default: [],
	}
},
{timestamps:true}
)

const User=mongoose.model("users",userSchema)

export default User