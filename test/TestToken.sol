pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LTO.sol";

contract TestTutorialToken {
 // The address of the adoption contract to be tested

//LTO tok = LTO(DeployedAddresses.LTO());
LTO tok  = new LTO(1000, 1);

string abbrev = "LTO";

function testgetName() public {
  string memory expectedabbrev = tok.getName();

  Assert.equal(expectedabbrev, abbrev, "Name is correct.");
}

function test_supply() public{
	uint supply = tok.totalSupply();
	Assert.equal(supply, 1000, "the Count is wrong ");
}


function test_balance_transfer() public{
	address myaddress = tok.getMinter();
	address ganache = 0x8AEEDafE0e6E032126853A918e321766709Fa4E7;

	Assert.equal(tok.balanceOf(myaddress), 1000, "Count is Wrong");

	tok.approve(myaddress, 200);
	
	tok.transferFrom(myaddress, ganache, 100);
	Assert.equal(tok.balanceOf(ganache),100, "Transfer succeeded");
	Assert.equal(tok.balanceOf(myaddress),900, "Transfer succeeded");

}

}