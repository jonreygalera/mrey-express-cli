import IAppKernel from '../../bootstrap/types/appKernel.type';
import CorsMiddleware from '../middleware/cors.middleware';

export default class GlobalMiddlewareProvider {

  boot(appKernel: IAppKernel) {

    const middlewares : any[] = [
      (new CorsMiddleware(appKernel)).handle(),
    ];

    return middlewares.map((middleware) => appKernel.appExpress.use(middleware));
  }
  
  handle(appKernel: IAppKernel) : void {
    this.boot(appKernel);
  }
  
}