import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

import httpStatus from "http-status";

export class RequestValidationError extends CustomError {
    statusCode = httpStatus.BAD_REQUEST;
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
    }

    serializeErrors() {
        return this.errors.map((err) => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}