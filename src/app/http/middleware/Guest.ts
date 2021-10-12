import {NextFunction, Request, Response} from "express-serve-static-core";

class Guest {
    middleware(req: Request, res: Response, next: NextFunction): void {
        // @ts-ignore
        if (!req.user) {
            next()
        } else {
            res.redirect('/')
        }
    }
}

const guest = new Guest();
export default guest;
