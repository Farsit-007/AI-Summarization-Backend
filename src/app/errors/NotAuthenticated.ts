import { httpStatus } from "../utils/httpStatus";

class NotAuthenticated extends Error {
    public statusCode: number;

    constructor(
        message = "Authentication credentials were not provided.",
        stack = ""
    ) {
        super(message);
        this.statusCode = httpStatus.UNAUTHORIZED;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default NotAuthenticated;
