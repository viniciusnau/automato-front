import { localEnvironment } from "./local.environment";
import { devEnvironment } from "./dev.environment";
import {prodEnvironment} from "./prod.environment";

export const environment = prodEnvironment.apiUrl;
