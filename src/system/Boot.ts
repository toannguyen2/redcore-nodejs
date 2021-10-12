import httpConfig from "../config/HttpConfig";
import web from "../routers/Web";
import api from "../routers/Api";
import databaseConfig from "../config/DatabaseConfig";
import applicationConfig from "../config/ApplicationConfig";
import application from "../Application";
import logger from "./support/Logging";
import error from "./core/http/ErrorHandler";
import {REGISTRY} from "./core/router/Route";
import Config from "./core/config/Config";
import RouteRegistry from "./core/router/RouteRegistry";

export class Boot {
    stepConfig: number = 0

    config: Config[] = [
        databaseConfig,
        httpConfig,
        applicationConfig,
    ]

    routers: RouteRegistry[] = [
        web,
        api,
        error
    ]

    start() {
        this.nextConfig()
    }

    async registerRoute() {
        this.routers.forEach(routers => {
            routers.registry()
        })
        this.routeComplete()
    }

    routeComplete() {
        REGISTRY.forEach((value, key) => {
            const methods: string[] = []
            value.forEach((value) => {
                methods.push(value)
            })
            logger.info('(Mapper) "' + key + '" [' + methods + ']')
        })
    }

    async nextConfig() {
        const nextConfig = this.stepConfig++;
        if (this.config[nextConfig]) {
            this.config[nextConfig].config()
        } else {
            application.onReady()
        }
    }

    stop() {
        logger.info('Stop application.')
        process.exit(0)
    }
}

const boot = new Boot()
export default boot;
