import mongoose from "mongoose";


// Defining Schema 

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, trim:true},
    password:{type:String, required:true, trim:true}
})

const usermodel = mongoose.model('user', userSchema)

export default usermodel