const morgan = require("morgan");
const logger = require("../utils/logging_operation");

const stream = {
  // Use the http severity from winston logger
  write: (message) => logger.http(message),
};

const skip = () => {
  //TODO change node_env to prod when its in production
  const env = process.env.node_env || "dev";
  return env !== "dev";
};
const morganMiddleware = morgan(
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :response-time ms - :res[content-length]",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

module.exports = morganMiddleware;
