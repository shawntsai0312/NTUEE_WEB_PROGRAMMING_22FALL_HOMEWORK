import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        following: [{ type: Object }],
        merchandise: [{ type: Object }]
    }
)

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
