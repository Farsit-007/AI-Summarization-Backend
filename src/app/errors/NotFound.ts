import { httpStatus } from "../utils/httpStatus";

class NotFound extends Error {
    public statusCode: number;

    constructor(message = "Not found.", stack = "") {
        super(message);
        this.statusCode = httpStatus.NOT_FOUND;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default NotFound;
