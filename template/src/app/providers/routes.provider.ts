import SystemProvider from "./system.provider";
import apiRouter from '../../routes/api.routes';
import authRouter from '../../routes/auth.routes';
import ApiMiddleware from "../middleware/api.middleware";
import { appMiddleware } from "../../utils/appMiddleware";
import AuthMiddleware from "../middleware/auth.middleware";

export default class RoutesProvider extends SystemProvider {

  handle() : void {
    appMiddleware(new ApiMiddleware(this.appKernel), () => {
      this.appKernel.appExpress.use('/api', apiRouter);

      // Authenticated routes
      appMiddleware(new AuthMiddleware(this.appKernel), () => {
        this.appKernel.appExpress.use('/api/auth', authRouter);
      });

    });
  }
  
}