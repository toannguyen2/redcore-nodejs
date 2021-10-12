import {TrimStrings as TrimStringsBase} from "../../../system/core/http/middleware/TrimStrings";

class TrimStrings extends TrimStringsBase {
    protected except = [
        'password',
        'password_confirmation',
    ]

    constructor() {
        super();
    }
}

const trimStrings = new TrimStrings();
export default trimStrings;
