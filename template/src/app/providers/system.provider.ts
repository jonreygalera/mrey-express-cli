import IAppKernel from "../../bootstrap/types/appKernel.type";
import GlobalMiddlewareProvider from "./globalMiddleware.provider";

export default abstract class SystemProvider {
  constructor(public appKernel: IAppKernel) {}

  register() {
    (new GlobalMiddlewareProvider).handle(this.appKernel);
    this.handle();
  }

  middleware(): Array<any> {
    return [];
  }

  abstract handle() : void;
}