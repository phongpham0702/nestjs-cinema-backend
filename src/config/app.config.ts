import { registerAs } from "@nestjs/config";
import { ConfigRegisterName } from "src/shared/constants/config-register-name.constant";

export default registerAs(ConfigRegisterName.app,() =>({
    
}))