import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: process.env.JWT_EXPIRATION,
    refresh_secret: process.env.JWT_REFRESH,
    jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION,

    reset_password_secret: process.env.RESET_PASSWORD_SECRET,
    reset_password_expiration: process.env.RESET_PASSWORD_EXPIRATION,
    reset_password_link: process.env.RESET_PASSWORD_LINK,
  },

  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_APP_PASSWORD,
  },
};
