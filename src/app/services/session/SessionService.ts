import Session from "../../entities/session/Session";
import {SessionModel} from "../../models/Session/SessionModel";
import SessionBaseService from "../../../system/core/auth/service/SessionBaseService";

class SessionService implements SessionBaseService {
    async getSessionById(id: string): Promise<Session> {
        return await SessionModel.findOne({id}, {}).exec()
    }

    save(entity: Session) {
        const sessionModel = new SessionModel(entity);
        sessionModel.save();
    }
}

const sessionService = new SessionService();
export default sessionService;
