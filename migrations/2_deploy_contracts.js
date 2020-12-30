const SimpleStorage = artifacts.require("SimpleStorage");
const LTO = artifacts.require("LTO");
const ComplexStorage = artifacts.require("ComplexStorage");
const Game = artifacts.require("Game");


//lesson learned, if things get funny with the migration, just delete the artifacts files and run a migrate --reset
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage); 
  deployer.deploy(LTO);
  deployer.deploy(Game);

  //need to rewrite LTO so that it doesnt need a constructor, just has set and get methods.
};
