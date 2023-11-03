import { localEnvironment } from "./local.environment";
import {prodEnvironment} from "./prod.environment";

export const environment = prodEnvironment.apiUrl;
