import * as Joi from 'joi';

export default Joi.object({
  /**
   * App Env Validation
   */
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'test', 'staging')
    .default('development'),

  SERVER_PORT: Joi.number().port().default(3000),

  /**
   * Database Env Validation
   */

  DB_PORT: Joi.number().port().default(5432),

  DB_HOST:Joi.string().required(),
  
  DB_USER: Joi.string().required(),

  DB_PASSWORD: Joi.string().required(),

  DB_NAME: Joi.string().required(),

  DB_SYNC: Joi.boolean().default(false),

  DB_AUTOLOAD: Joi.boolean().default(false),
});
