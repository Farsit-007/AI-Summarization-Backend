import { httpStatus } from "../utils/httpStatus";

class MethodNotAllowed extends Error {
    public statusCode: number;

    constructor(message = `Method not allowed.`, stack = "") {
        super(message);
        this.statusCode = httpStatus.METHOD_NOT_ALLOWED;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default MethodNotAllowed;
