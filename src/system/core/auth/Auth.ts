import User from "../../../app/entities/profile/User";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {COOKIE_SESS_ID, COOKIE_UID_ID} from "./Guard";
import Recaller from "./Recaller";
import userProvider from "./UserProvider";

class Auth {
    readonly middleware: any

    constructor() {
        this.middleware = this.middlewareHandle.bind(this)
    }

    async middlewareHandle(req: Request, res: Response, next: NextFunction) {
        const recaller = this.getRecaller(req)
        if (recaller) {
            const user = await this.getUserFromRecaller(recaller)
            if (user) {
                // @ts-ignore
                req.user = user
            }
        }
        next()
    }

    async getUserFromRecaller(recaller: Recaller): Promise<User> {
        return await userProvider.retrieveBySession(recaller.id, recaller.session);
    }

    getRecaller(request: Request): any {
        const cookies = request.cookies

        if (!cookies || !cookies[COOKIE_UID_ID] || !cookies[COOKIE_SESS_ID])
            return void 0;

        return new Recaller(cookies[COOKIE_UID_ID], cookies[COOKIE_SESS_ID]);
    }

    logout(request: Request, response: Response) {
        const opt = {
            path: '/',
            maxAge: 0,
            httpOnly: true
        };
        response.cookie(COOKIE_SESS_ID, '', opt);
        response.cookie(COOKIE_UID_ID, '', opt);
    }
}

const auth = new Auth();
export default auth;
