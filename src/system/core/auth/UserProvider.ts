import Credentials from "./Credentials";
import User from "../../../app/entities/profile/User";
import userService from "../../../app/services/user/UserService";
import Session from "../../../app/entities/session/Session";
import sessionService from "../../../app/services/session/SessionService";

class UserProvider {
    async retrieveByCredentials(cedentials: Credentials): Promise<User> {
        const user = await userService.retrieveByUsername(cedentials.username)
        if (userService.validPassword(user, cedentials.password)) {
            userService.updateUser(user.id, {fail: 0, last_login: Date.now()})
            return user;
        }
        return void 0;
    }

    async retrieveBySession(id: string, s: string): Promise<User> {
        const session: Session = await sessionService.getSessionById(s)
        if (session) {
            // if (session.agent === request.headers['user-agent'])
            const user: User = await userService.getUserById(id)
            if (user)
                userService.updateUser(user.id, {last_login: Date.now()})
            return user;
        }
        return null;
    }
}

const userProvider = new UserProvider()
export default userProvider;
