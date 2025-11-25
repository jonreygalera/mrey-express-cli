const env = (key: string, defaultValue:any = null) => {
  return process.env[key] ?? defaultValue;
}

export default env;