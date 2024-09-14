import { registerAs } from '@nestjs/config';
import { ConfigRegisterName } from 'src/shared/constants/config-register-name.constant';

export default registerAs(ConfigRegisterName.database, () => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_POST),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC,
    autoLoadEntities: process.env.DB_AUTOLOAD,
}));
