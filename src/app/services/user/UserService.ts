import UserBaseService from "../../../system/core/auth/service/UserBaseService";
import User from "../../entities/profile/User";
import {UserModel} from "../../models/profile/UserModel";
import crypto from "crypto";

class UserService implements UserBaseService {
    async retrieveByUsername(username: string): Promise<User> {
        const user: User = await UserModel.findOne({username}, {}).exec()

        // if (!user) {
        //     const phone: Phone = await PhoneModel.findOne({phone: username}, {}).exec()
        //
        // }

        return user;
    }

    async getUserById(id: string): Promise<User> {
        return await UserModel.findOne({id}, {}).exec()
    }

    updateUser(id: string, update: User) {
        UserModel.updateOne({id}, {$set: update}).exec();
    }

    generatePassword(user: User, password: string) {
        user.salt = crypto.randomBytes(16).toString('hex');
        user.password = crypto.pbkdf2Sync(password, user.salt,
            1000, 64, 'sha512').toString('hex');
    };

    validPassword(user: User, password: string) {
        const validPassword = crypto.pbkdf2Sync(password, user.salt,
            1000, 64, 'sha512').toString('hex');
        return user.password === validPassword;
    };
}

const userService = new UserService();
export default userService;
