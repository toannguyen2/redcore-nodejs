import {Request, Response} from "express-serve-static-core";
import auth from "../../../../system/core/auth/Auth";

class LogoutController {
    async doGet(req: Request, res: Response) {
        auth.logout(req, res)
        res.redirect('/')
    }
}

const logoutController = new LogoutController()
export default logoutController;
