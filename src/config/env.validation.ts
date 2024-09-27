import * as Joi from 'joi';

export default Joi.object({
  /**
   * App Validation
   */
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'test', 'staging')
    .default('development'),

  SERVER_PORT: Joi.number().port().default(3000),

  /**
   * Database Validation
   */

  DB_PORT: Joi.number().port().default(5432),

  DB_HOST: Joi.string().required(),

  DB_USER: Joi.string().required(),

  DB_PASSWORD: Joi.string().required(),

  DB_NAME: Joi.string().required(),

  DB_SYNC: Joi.boolean().default(false),

  DB_AUTOLOAD: Joi.boolean().default(false),

  /**
   * Google Storage Credential Validation
   */
  TYPE: Joi.required(),

  PROJECT_ID: Joi.required(),

  PRIVATE_KEY_ID: Joi.required(),

  PRIVATE_KEY: Joi.required(),

  CLIENT_EMAIL: Joi.required(),

  CLIENT_ID: Joi.required(),

  AUTH_URI: Joi.required(),

  TOKEN_URI: Joi.required(),

  AUTH_PROVIDER_X509_CERT_URL: Joi.required(),

  CLIENT_X509_CERT_URL: Joi.required(),

  UNIVERSE_DOMAIN: Joi.required(),
});
