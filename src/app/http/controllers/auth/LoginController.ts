import {Request, Response} from "express-serve-static-core";
import guard from "../../../../system/core/auth/Guard";

class LoginController {
    async doGet(req: Request, res: Response) {
        res.render('auth/login')
    }

    async doPost(req: Request, res: Response): Promise<void> {
        if (req.body && req.body.username && req.body.password) {
            const user = await guard.attempt({
                username: req.body.username,
                password: req.body.password
            }, req, res)
            if (user) {
                res.redirect('/')
                return void 0;
            }
        }
        res.render('auth/login')
    }
}

const loginController = new LoginController()
export default loginController;
