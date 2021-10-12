import {NextFunction, Request, Response} from "express-serve-static-core";

class ViewSupport {
    middleware(req: Request, res: Response, next: NextFunction): void {
        // @ts-ignore
        res.locals.user = req.user
        res.locals.body = req.body
        res.locals.params = req.params
        res.locals.csrfToken = req.csrfToken()
        next()
    }
}

const viewSupport = new ViewSupport();
export default viewSupport;
