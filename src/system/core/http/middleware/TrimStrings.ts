import {NextFunction, Response} from "express-serve-static-core";
import str from "../../../support/Str";
import {Middleware} from "./Middleware";

export abstract class TrimStrings extends Middleware {
    protected fields: string[] = ["body", "params", "query"]
    protected except: string[];

    protected constructor() {
        super()
    }

    middlewareHandle(req: any, res: Response, next: NextFunction): void {
        this.fields.forEach((field) => {
            if (req[field]) {
                req[field] = str.trimString(req[field], this.except);
            }
        });
        next()
    }
}
