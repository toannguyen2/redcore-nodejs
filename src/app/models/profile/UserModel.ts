import {Schema, model} from "mongoose";
import User from "../../entities/profile/User";

const schema = new Schema<User>({
    id: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, hide: true},
    name: {type: String, required: true},
    salt: {type: String, required: true, hide: true},
    last_login: {type: Date, default: Date.now},
    create_at: {type: Date, default: Date.now},
    fail: {type: Number, default: 0},
});

export const UserModel = model<User>('User', schema);
