import userSeeder from "./seeder/UserSeeder";
import logger from "../system/support/Logging";

export interface Seeder {
    see(): Promise<void>
}

class DatabaseSeeder {
    listSeeder: Seeder[] = [
        userSeeder
    ]

    async run() {
        if (this.listSeeder.length > 0) {
            logger.info('sync database: START...')
            for (const seeder of this.listSeeder) {
                await seeder.see()
            }
            logger.info('sync database: DONE')
        }
    }
}

const databaseSeeder = new DatabaseSeeder()
export default databaseSeeder;
