import kernel from "../system/Kernel";
import path from "path";
import {GLABAL_ROOT} from "./constans/application";
import express from "express";
import httpKernel from "../app/http/HttpKernel";
import Config from "../system/core/config/Config";
import boot from "../system/Boot";

class HttpConfig extends Config {
    constructor() {
        super()
    }

    config() {
        const expressApp = kernel.expressApp
        // Configure Express to serve static files in the public folder
        expressApp.use(express.static(path.join(GLABAL_ROOT, "public")));

        // Configure Express to use EJS
        expressApp.set("views", path.join(GLABAL_ROOT, "resources", "views"));
        expressApp.set("view engine", "ejs");

        expressApp.use(...httpKernel.middleware);

        boot.registerRoute()
        this.next()
    }
}

const httpConfig = new HttpConfig();
export default httpConfig;
