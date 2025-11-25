import Middleware from "../app/middleware/middleware";

export const appMiddleware = (middleware: Middleware | Middleware[], callback: () => void) => {
  const middlewares = Array.isArray(middleware) ? middleware : [middleware];
  
  middlewares.forEach((mw) => {
    const _middlewareValue = mw.handle();
    if(Array.isArray(_middlewareValue)) {
      _middlewareValue.forEach((innerMw) => {
        mw.appKernel.appExpress.use(innerMw);
      });
    } else {
      mw.appKernel.appExpress.use(_middlewareValue);
    }
  });

  callback();
}