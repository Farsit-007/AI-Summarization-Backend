import { httpStatus } from "../utils/httpStatus";

class NotAcceptable extends Error {
    public statusCode: number;

    constructor(
        message = "Could not satisfy the request Accept header.",
        stack = ""
    ) {
        super(message);
        this.statusCode = httpStatus.NOT_ACCEPTABLE;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default NotAcceptable;
