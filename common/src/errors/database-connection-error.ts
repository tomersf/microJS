import httpStatus from "http-status";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database'
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    constructor() {
        super('Error connection to database')
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}