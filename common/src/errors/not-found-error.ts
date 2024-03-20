import httpStatus from "http-status";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = httpStatus.NOT_FOUND
    constructor() {
        super('Route not found')
    }
    serializeErrors() {
        return [{ message: 'Not Found' }]
    }
}