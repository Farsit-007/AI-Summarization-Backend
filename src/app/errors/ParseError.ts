import { httpStatus } from "../utils/httpStatus";

class ParseError extends Error {
    public statusCode: number;

    constructor(message = "Malformed request.", stack = "") {
        super(message);
        this.statusCode = httpStatus.BAD_REQUEST;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default ParseError;
