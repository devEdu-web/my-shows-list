import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)
export default User