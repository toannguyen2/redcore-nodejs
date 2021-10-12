import User from "../../../app/entities/profile/User";
import {Request} from "express-serve-static-core";
import sessionService from "../../../app/services/session/SessionService";
import Session from "../../../app/entities/session/Session";

class SessionProvider {
    saveSession(user: User, request: Request, session: string) {
        const sessionEntity = new Session(session, user.id, request.headers['user-agent'])
        sessionService.save(sessionEntity)
    }
}

const sessionProvider = new SessionProvider()
export default sessionProvider;
