const logger = (request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  next();
};

export default logger;
