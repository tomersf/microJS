import { CustomError } from "./custom-error";

import httpStatus from "http-status";

export class NotAuthorizedError extends CustomError {
    statusCode = httpStatus.UNAUTHORIZED;

    constructor() {
        super('Not authorized');
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}