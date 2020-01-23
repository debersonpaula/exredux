// tslint:disable: no-console
const logger = {
  error: (message?: any, ...optionalParams: any[]) => console.error(message, ...optionalParams),
  debug: (message?: any, ...optionalParams: any[]) => console.debug(message, ...optionalParams),
};

export default logger;
