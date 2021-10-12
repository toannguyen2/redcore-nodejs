import homeController from "../app/http/controllers/HomeController";
import loginController from "../app/http/controllers/auth/LoginController";

import {routeWeb as route, Route} from "../system/core/router/Route";
import RouteRegistry from "../system/core/router/RouteRegistry";
import guest from "../app/http/middleware/Guest";
import authenticate from "../app/http/middleware/Authenticate";
import logoutController from "../app/http/controllers/auth/LogoutController";

export class Web implements RouteRegistry {
    registry() {
        route.get('/', homeController.home)

        route.middleware(guest.middleware)((route: Route) => {
            route.route('/login')
                .get(loginController.doGet)
                .post(loginController.doPost)
        })

        route.middleware(authenticate.middleware)((route: Route) => {
            route.route('/logout')
                .get(logoutController.doGet)
        })
    }
}

const web = new Web()
export default web;
