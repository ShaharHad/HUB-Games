const app = require("./app");
const logger = require("./utils/logging_operation");

require("dotenv").config();

const PORT = process.env.PORT || "4000";
const server_name = process.env.server || "localhost";

const server = app.listen(PORT, () => {
  logger.debug(`Server listen on http://${server_name}:${PORT}`);
});
