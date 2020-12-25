// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LTO is ERC20 {
    string public name = "Lotto";
    uint256 public game_ID;
    string public symbol = "LTO";
    uint256 public decimals = 0;
    uint256 public INITIAL_SUPPLY; //gets initialized to the number of 

    mapping (address => uint256) public balance;

    address public minter;

    //the supply amount is set by the ticket contract.
    constructor(uint256 supply, uint game_id) public {
        INITIAL_SUPPLY = supply;
        _mint(msg.sender, INITIAL_SUPPLY);
        minter = msg.sender;
        game_ID = game_id;
    }

    function getName() public view returns(string memory){
    	return symbol;
    }

    function getMinter() public view returns(address add){
        return minter;
    }
    
}

contract Game {
    //the game number that the coin was born into.
    uint public game_number;

    //the number of coins spawned
    uint public ticket_num;

    //owner (me)
    address public owner;

    LTO game_token;

    //constructor to generate a Game. This starts a game with a random supply of coins
    constructor() public{
        owner = msg.sender;
        game_number = 0;
        LTO tick  = new LTO(gen_random_supply(), game_number);
        game_token = tick;
    }

    function gen_random_supply() public view returns (uint256 val){
        uint nonce = 3;
        uint number = uint(keccak256(abi.encodePacked(now, msg.sender,nonce))) % 100000; 
        return number; //again, will change eventually
    }

    //running the ticket contract should have a method to initiate a transfer of some number of
    //tokens to the contract called address
    function generateTokens(address rx) public{
        uint nonce = 2;
        uint number = uint(keccak256(abi.encodePacked(now, msg.sender,nonce))) % 100; 
        game_token.transfer(rx, number);

    }

    function getToken() public returns (LTO t){
        return game_token;
    }

}


