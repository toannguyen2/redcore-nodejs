import {UserModel} from "../../app/models/profile/UserModel";
import {Seeder} from "../DatabaseSeeder";
import User from "../../app/entities/profile/User";
import generateID from "../../system/support/GenerateID";
import userService from "../../app/services/user/UserService";

class UserSeeder implements Seeder {
    async see(): Promise<void> {
        const user: User = await UserModel.findOne({username: 'admin'}, {}).exec()
        if (!user) {
            const user = {
                id: generateID.generate(),
                username: 'admin',
                name: 'Red'
            };
            userService.generatePassword(user, 'Red123*1')
            await new UserModel(user).save();
        }
    }
}

const userSeeder = new UserSeeder()
export default userSeeder
