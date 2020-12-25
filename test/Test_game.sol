pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LTO.sol";

contract Test_game {


	Game game1  = new Game();

	LTO token;

	function test_token_parameters() public returns (uint256){
		token = game1.getToken();
		return token.totalSupply();

	}

	function test_tokenTransfer() public{
		address buyer =  0x7208563F4d24b13cc32C2011A9945D1CEBc99491;
		game1.generateTokens(buyer);

		Assert.equal(token.balanceOf(buyer),  100, "The wrong transfer was made");
	}

}
