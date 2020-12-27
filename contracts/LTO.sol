// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract LTO is ERC20Burnable {
    string public name = "Lotto";
    uint256 public game_ID;
    string public symbol = "LTO";
    uint256 public decimals = 0;
    uint256 public SUPPLY; 

    mapping (address => uint256) public balance;

    address public minter; //me

    //the supply amount is set by the ticket contract.
    constructor(uint256 supply, uint game_id) public {
        SUPPLY = supply;
        _mint(msg.sender, SUPPLY);   //I own the full supply
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

    //the number of tokens for the current game
    uint public total_supply;

    //we need to keep track of the current supply of coins.
    uint public current_supply;

    //owner (me)
    address public owner;

    LTO game_token;

    //constructor to generate a Game. This starts a game with a random supply of coins
    constructor() public{
        owner = msg.sender;
        total_supply = gen_random_supply(game_number); //generate the random total supply
        LTO tick  = new LTO(total_supply, game_number);
        game_token = tick;
        current_supply = 0; //currently there are no tokens that have been sent out.
    }

    function gen_random_supply(uint nonce) public view returns (uint256 val){
        uint number = uint(keccak256(abi.encodePacked(now, msg.sender,nonce))) % 100000; 
        return number; 
    }

    //running the ticket contract should have a method to initiate a transfer of some number of
    //tokens to the contract called address
    function generateTokens(address rx) public{
        uint nonce = 2;
        uint number = uint(keccak256(abi.encodePacked(now, msg.sender,nonce))) % 100;  //uniform dist [0,100]
        game_token.transferFrom(owner, rx, number);
        current_supply = current_supply+ number; //increment the existing coins

    }

    //allows a token owner to exchange 100 tokens for another lotto ticket.
    function exchangeTickets(address rx) public{
        game_token.burnFrom(rx, 100); //burn 100 tickets
        current_supply = current_supply - 100; //update the current supply

        generateTokens(rx); //run a lotto
    }

    function getToken() public returns (LTO t){
        return game_token;
    }


    //when the game is over, TODO, need to figure out the best way to do this.
    function endGame() public{
        game_number = game_number+1;
    }

}


