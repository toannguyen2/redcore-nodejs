import {Schema, model} from "mongoose";
import Phone from "../../entities/profile/Phone";

const schema = new Schema<Phone>({
    user_id: {type: String, required: true, index: true},
    phone: {type: String, required: true, unique: true},
});

export const PhoneModel = model<Phone>('Phone', schema);
