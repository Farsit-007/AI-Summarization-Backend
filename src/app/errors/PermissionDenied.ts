import { httpStatus } from "../utils/httpStatus";

class PermissionDenied extends Error {
    public statusCode: number;

    constructor(
        message = "You do not have permission to perform this action.",
        stack = ""
    ) {
        super(message);
        this.statusCode = httpStatus.FORBIDDEN;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default PermissionDenied;
