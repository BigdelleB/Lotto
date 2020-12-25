const SimpleStorage = artifacts.require("SimpleStorage");
const LTO = artifacts.require("LTO");
const ComplexStorage = artifacts.require("ComplexStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(LTO, 1000, 1);
  deployer.deploy(ComplexStorage);
};
