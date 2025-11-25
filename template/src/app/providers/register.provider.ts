import SystemProvider from "../../bootstrap/core/providers/system.provider";
import RoutesProvider from "./routes.provider";

export default class RegisterProvider extends SystemProvider {

  handle() {
    (new RoutesProvider(this.appKernel)).handle();
  }
}