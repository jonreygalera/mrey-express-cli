import RoutesProvider from "./routes.provider";
import SystemProvider from "./system.provider";

export default class RegisterProvider extends SystemProvider {

  handle() {
    (new RoutesProvider(this.appKernel)).handle();
  }
}