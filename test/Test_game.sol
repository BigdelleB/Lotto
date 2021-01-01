pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LTO.sol";


contract Test_game {


	Game game1  = new Game(); 

	function test_tokenTransfer() public{
		Assert.equal(game1.getBalance(),  50, "The wrong transfer was made");
	}

}
