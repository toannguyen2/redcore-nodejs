import Session from "../../../../app/entities/session/Session";

interface SessionBaseService {
    getSessionById(id: string): Promise<Session>
}

export default SessionBaseService;
