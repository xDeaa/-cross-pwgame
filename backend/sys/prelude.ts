import dotenv from 'dotenv'
import path from 'path'
import { existsSync } from 'fs'
import chalk from 'chalk'
import {isEmpty} from 'lodash'

export default function checkEnv() {
    const envPathName  = path.join(process.cwd(), '.env')    
    const neededValues = ['PORT']

    if (existsSync(envPathName)) {
        dotenv.config()

        const missingValues = neededValues.filter(
            (v: string): boolean => !process.env[v]
        )

        if (!isEmpty(missingValues)) {
            console.log(
                chalk.red.bold(
                    `Sorry [${missingValues.join('/')}] value(s) are missing on your .env file.`
                )
            );

            process.exit(42)
        }
    } else {
        console.log(chalk.red.bold("Sorry an .env is missing"));
        process.exit(42)
    }
}
