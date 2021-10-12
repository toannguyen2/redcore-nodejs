import User from "../../../app/entities/profile/User";
import userProvider from "./UserProvider";
import Credentials from "./Credentials";
import {Request, Response} from "express-serve-static-core";
import str from "../../support/Str";
import sessionProvider from "./SessionProvider";

export const COOKIE_SESS_ID = 'sess_id'
export const COOKIE_UID_ID = 'uid'

class Guard {
    login(user: User, request: Request, response: Response): void {
        // @ts-ignore
        request.user = user;
        const session = Guard.ensureSessionIsSave(user, request);
        Guard.createRecallerCookie(user, session, response);
    }

    async attempt(cedentials: Credentials, request: Request, response: Response): Promise<User> {
        const user = await userProvider.retrieveByCredentials(cedentials)
        if (user) {
            this.login(user, request, response);
        }
        return user;
    }

    private static ensureSessionIsSave(user: User, request: Request): string {
        const session: string = str.random(60);
        sessionProvider.saveSession(user, request, session);
        return session;
    }

    private static createRecallerCookie(user: User, session: string, response: Response) {
        const opt = {
            path: '/',
            maxAge: 2592000000,
            httpOnly: true
        };
        response.cookie(COOKIE_SESS_ID, session, opt);
        response.cookie(COOKIE_UID_ID, user.id, opt);
    }
}

const guard = new Guard()
export default guard
