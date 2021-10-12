import {NextFunction, Response} from "express-serve-static-core";
import {RequestHandler} from "serve-static";

export abstract class Middleware {
    public middleware: RequestHandler<any>

    protected constructor() {
        this.middleware = this.middlewareHandle.bind(this)
    }

    abstract middlewareHandle(req: any, res: Response, next: NextFunction): void;
}