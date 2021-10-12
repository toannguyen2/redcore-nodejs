import {Schema, model} from "mongoose";
import Session from "../../entities/session/Session";

const schema = new Schema<Session>({
    id: {type: String, required: true, unique: true},
    user_id: {type: String, required: true, index: true},
    agent: {type: String, required: true},
    create_at: {type: Date, expires: '30d', default: Date.now},
});

export const SessionModel = model<Session>('Session', schema);
