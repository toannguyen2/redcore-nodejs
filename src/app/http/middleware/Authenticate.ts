import {NextFunction, Request, Response} from "express-serve-static-core";

class Authenticate {
    middleware(req: Request, res: Response, next: NextFunction): void {
        // @ts-ignore
        if (!req.user) {
            res.redirect('/login')
        } else {
            next()
        }
    }
}

const authenticate = new Authenticate();
export default authenticate;
