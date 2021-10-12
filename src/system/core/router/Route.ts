import {RequestHandler} from "express-serve-static-core";
import kernel from "../../Kernel";
import RouteSingle from "./RouteSingle";
import httpKernel from "../../../app/http/HttpKernel";

export const REGISTRY: Map<string, Set<string>> = new Map<string, Set<string>>()

export interface Options {
    name: string
    path?: string
}

export class Route {
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

    all(path: string, ...handlers: RequestHandler<any>[]): Route {
        this.registry('all', path, ...handlers)
        return this
    }

    get(path: string, ...handlers: RequestHandler<any>[]): Route {
        this.registry('get', path, ...handlers)
        return this
    }

    post(path: string, ...handlers: RequestHandler<any>[]): Route {
        this.registry('post', path, ...handlers)
        return this
    }

    put(path: string, ...handlers: RequestHandler<any>[]): Route {
        this.registry('put', path, ...handlers)
        return this
    }

    delete(path: string, ...handlers: RequestHandler<any>[]): Route {
        this.registry('delete', path, ...handlers)
        return this
    }

    method(method: string, path: string, ...handlers: RequestHandler<any>[]): Route {
        this.registry(method, path, ...handlers)
        return this
    }

    route(path: string, ...handlers: RequestHandler<any>[]): RouteSingle {
        const releasePath = Route.releasePath(this.path, path)
        const middlewares = [...this.middlewares, ...handlers]

        return new RouteSingle({name: this.name, path: releasePath}, middlewares)
    }

    group(path: string, ...handlers: RequestHandler<any>[]) {
        const releasePath = Route.releasePath(this.path, path)
        const middlewares = [...this.middlewares, ...handlers]

        const route = new Route({name: this.name, path: releasePath}, middlewares)
        return route.handleCallback.bind(route)
    }

    middleware(...handlers: RequestHandler<any>[]) {
        const middlewares = [...this.middlewares, ...handlers]
        const route = new Route({name: this.name, path: this.path}, middlewares)
        return route.handleCallback.bind(route)
    }

    handleCallback(callback: any) {
        callback(this)
    }

    static releasePath(path1: string, path2: string = ''): string {
        let releasePath = path1 + path2
        if (path1.slice(path1.length - 1) !== '/' && path2.slice(0, 1) !== '/')
            releasePath = path1 + '/' + path2

        return releasePath;
    }

    registry(method: string, path: string, ...handlers: RequestHandler<any>[]) {
        const releasePath = Route.releasePath(this.path, path)

        Route.onRoute(method, releasePath, ...this.middlewares, ...handlers)
    }

    public static onRoute(method: string, path: string, ...handlers: RequestHandler<any>[]) {
        // @ts-ignore
        kernel.expressApp[method.toLowerCase()](path, ...handlers);

        if (REGISTRY.has(path)) {
            const PATH_REGISTRY = REGISTRY.get(path)
            PATH_REGISTRY.add(method.toUpperCase())
        } else {
            const set = new Set<string>()
            set.add(method.toUpperCase())
            REGISTRY.set(path, set)
        }
    }
}

// Stateless
export const routeApi: Route = new Route(
    {name: 'API'},
    httpKernel.middlewareGroups.api)

// Statefull
export const routeWeb: Route = new Route(
    {name: 'WEB'},
    httpKernel.middlewareGroups.web)
