import boot from "../../Boot";

abstract class Config {
    // tslint:disable-next-line:no-empty
    config(): void {
    }

    next() {
        boot.nextConfig()
    }
}

export default Config;
