import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database'
    statusCode = 500;
    constructor() {
        super('Error connection to database')
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}