import mongoose, {ConnectOptions} from 'mongoose';
import mongooseLong from 'mongoose-long';
import logger from "../system/support/Logging";
import boot from "../system/Boot";
import databaseSeeder from "../database/DatabaseSeeder";
import Config from "../system/core/config/Config";

mongooseLong(mongoose);

class DatabaseConfig extends Config {
    private readonly uri: string = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017'

    constructor() {
        super()
    }

    config() {
        const options: ConnectOptions = {
            'dbName': process.env.DATABASE_DATABASE || 'data'
        }

        if (!!process.env.DATABASE_USER) {
            options.user = process.env.DATABASE_USER
            options.pass = process.env.DATABASE_PASS
        }

        mongoose.set('autoCreate', true);
        mongoose.set('autoIndex', true);

        logger.info('Connecting to the database: ' + this.uri)

        // Connect
        mongoose.connect(this.uri, options).then(async connection => {
            logger.info('Successful connection to the database: ' + this.uri)
            await databaseSeeder.run();
            this.next()
        }).catch(error => {
            logger.error('Connection failed to database: ' + this.uri)
            logger.error(error)
            boot.stop()
        })
    }
}

const databaseConfig = new DatabaseConfig()
export default databaseConfig;
