import trimStrings from "./middleware/TrimStrings";
import cookieParser from "cookie-parser";
import auth from "../../system/core/auth/Auth";
import {RequestHandler} from "serve-static";
import csrf from "csurf";
import express from "express";
import expressLayouts from 'express-ejs-layouts'
import viewSupport from "./middleware/ViewSupport";

export const HTTP_CSRF = csrf({cookie: true})
export const HTTP_JSON_PARSER = express.json();
export const HTTP_URL_ENCODED_PARSER = express.urlencoded({extended: false});

class HttpKernel {
    // The application's global HTTP middleware stack
    middleware: RequestHandler<any>[] = [
        HTTP_JSON_PARSER,
    ]

    // The application's route middleware groups
    middlewareGroups = {
        web: [
            expressLayouts,
            cookieParser(),
            HTTP_URL_ENCODED_PARSER,
            auth.middleware,
            HTTP_CSRF,
            trimStrings.middleware,
            viewSupport.middleware
        ],
        api: [
            trimStrings.middleware
        ]
    }
}

const httpKernel = new HttpKernel()
export default httpKernel;
