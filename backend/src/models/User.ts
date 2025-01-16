import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    handle: string,
    name: string,
    email: string,
    password: string,
    description: string,
    image: string
    links: string
}

const userSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowecase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowetcase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default: '',
        trim: true
    },
    links: {
        type: String,
        default: '[]',
        trim: true
    },
})

const User = mongoose.model<IUser>('User', userSchema)
export default User