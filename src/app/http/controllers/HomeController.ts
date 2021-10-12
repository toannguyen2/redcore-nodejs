import {Request, Response} from "express-serve-static-core";

class HomeController {
    home(req: Request, res: Response) {
        // render the inde template
        res.render("index");
    }
}

const homeController = new HomeController();
export default homeController;
