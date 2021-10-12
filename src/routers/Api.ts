import {routeApi as route, Route} from "../system/core/router/Route";
import loginController from "../app/http/controllers/auth/LoginController";
import RouteRegistry from "../system/core/router/RouteRegistry";

export class Api implements RouteRegistry{
    registry() {
        route.group('/api/v1')((route: Route) => {
            route.route('/login').post(loginController.doPost)
        })
    }
}

const api = new Api()
export default api;
