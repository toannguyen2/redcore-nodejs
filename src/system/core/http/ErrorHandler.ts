import {NextFunction, Request, Response} from "express-serve-static-core";
import kernel from "../../Kernel";
import Message from "../../../app/http/response/Message";
import {MessageStatus} from "../../../app/http/response/MessageStatus";
import logger from "../../support/Logging";
import RouteRegistry from "../router/RouteRegistry";

class ErrorHandler implements RouteRegistry {
    registry() {
        const expressApp = kernel.expressApp
        expressApp.use(this.handleNotFound)
        expressApp.use(this.handleError)
    }

    handleNotFound(req: Request, res: Response, next: NextFunction) {
        res.status(404);

        const contentType = req.headers['content-type'];

        if (contentType && contentType.includes('application/json')) {
            const message = new Message(MessageStatus.FAIL, 'Page Not Found')
            res.json(message)
        } else {
            const data = {
                title: 'Page Not Found',
                code: 404,
                message: 'Page Not Found',
                url: req.url
            }
            res.render('errors/error', data)
        }
    }

    handleError(err: any, req: Request, res: Response, next: NextFunction) {
        logger.error(err)
        const data = {
            title: 'Server Error',
            code: 500,
            message: 'Server Error',
            url: req.url
        }
        res.status(500)
        if (err.code === 'EBADCSRFTOKEN') {
            res.status(403)
        }
        res.render('errors/error', data)
    }
}

const error = new ErrorHandler()
export default error
