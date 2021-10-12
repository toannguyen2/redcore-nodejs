import {RequestHandler} from "express-serve-static-core";
import {Options, Route} from "./Route";

export class RouteSingle {
    private readonly name: string
    private readonly path: string = ''
    private readonly middlewares: RequestHandler<any>[] = []

    constructor(options: Options, middlewares?: RequestHandler<any>[]) {
        this.name = options.name
        if (options.path !== void 0)
            this.path = options.path

        if (middlewares !== void 0)
            this.middlewares = middlewares
    }

    all(...handlers: RequestHandler<any>[]): RouteSingle {
        this.registry('all', ...handlers)
        return this
    }

    get(...handlers: RequestHandler<any>[]): RouteSingle {
        this.registry('get', ...handlers)
        return this
    }

    post(...handlers: RequestHandler<any>[]): RouteSingle {
        this.registry('post', ...handlers)
        return this
    }

    put(...handlers: RequestHandler<any>[]): RouteSingle {
        this.registry('put', ...handlers)
        return this
    }

    delete(...handlers: RequestHandler<any>[]): RouteSingle {
        this.registry('delete', ...handlers)
        return this
    }

    method(method: string) {
        this.registry(method)
        return this
    }

    registry(method: string, ...handlers: RequestHandler<any>[]) {
        const releasePath = Route.releasePath(this.path)
        Route.onRoute(method, releasePath, ...this.middlewares, ...handlers)
    }
}

export default RouteSingle;
