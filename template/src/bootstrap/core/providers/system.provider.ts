import GlobalMiddlewareProvider from "../../../app/providers/globalMiddleware.provider";
import IAppKernel from "../../types/appKernel.type";

export default abstract class SystemProvider {
  constructor(public appKernel: IAppKernel) {}

  register() {
    this.registerGlobalMiddleware();
    this.handle();
  }

  private registerGlobalMiddleware(): void {
    const globalMiddleware = (new GlobalMiddlewareProvider(this.appKernel)).handle();
    if (globalMiddleware.length > 0) {
      this.appKernel.appExpress.use(globalMiddleware);
    }
  }

  abstract handle() : void;
}