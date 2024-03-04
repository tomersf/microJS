import mongoose from "mongoose";
import { Password } from "../utils/password";

interface UserAttributes {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attributes: UserAttributes): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})
userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }