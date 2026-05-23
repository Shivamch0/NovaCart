import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        index : true,
        trim : true,
        unique : true,
        minlength : 3,
        maxlength : 30
    },
    fullName : {
        type : String,
        trim : true,
    },
    email : { 
        type : String,
        required : true,
        index : true,
        unique : true,
        trim : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 20
    },
    avatar : {
        type : String,
        default : ""
    },
    googleId : {
        type : String,
        default : null
    },
    authProvider : {
        type : String,
        enum : ["local" , "google"],
        default : "local",
    },
    role : {
        type : String,
        enum : ["user" , "admin"],
        defalut : "user"
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    refreshToken : {
        type : String,
        default : ""
    }
} , { timestamps : true});

userSchema.pre("save" , async function (){
    if(!this.isModified(this.password)) return ;

    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
};

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            userName : this.userName,
            fullName : this.fullName,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model("User" , userSchema);