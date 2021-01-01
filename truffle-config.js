const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};

//When i want to test, change the "client/src/contracts" to ".\build\contracts"
