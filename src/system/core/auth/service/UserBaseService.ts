import User from "../../../../app/entities/profile/User";
import {UserModel} from "../../../../app/models/profile/UserModel";

interface UserBaseService {
    retrieveByUsername(username: string): Promise<User>;
}

export default UserBaseService;
