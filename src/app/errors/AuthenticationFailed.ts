import { httpStatus } from "../utils/httpStatus";

class AuthenticationFailed extends Error {
    public statusCode: number;

    constructor(message = "Incorrect authentication credentials.", stack = "") {
        super(message);
        this.statusCode = httpStatus.UNAUTHORIZED;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default AuthenticationFailed;
