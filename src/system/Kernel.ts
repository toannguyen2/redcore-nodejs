import express from "express";
// import * as core from "express-serve-static-core";

class Kernel {
    expressApp

    constructor() {
        this.expressApp = express()
    }
}

const kernel = new Kernel();
export default kernel
