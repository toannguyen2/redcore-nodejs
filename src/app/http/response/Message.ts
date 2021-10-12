import MessageData from "./MessageData";
import {MessageStatus} from "./MessageStatus";

class Message {
    status: MessageStatus
    code: string
    message: string
    data: MessageData

    constructor(status?: MessageStatus, message?: string, code?: string, data?: MessageData) {
        this.status = status
        this.message = message

        if (code)
            this.code = code

        if (data)
            this.data = data
    }
}

export default Message;
