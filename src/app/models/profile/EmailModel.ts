import {Schema, model} from "mongoose";
import Email from "../../entities/profile/Email";

const schema = new Schema<Email>({
    user_id: {type: String, required: true, index: true},
    email: {type: String, required: true, unique: true},
});

export const PhoneModel = model<Email>('Phone', schema);
