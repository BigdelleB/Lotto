// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";


//because of the way this game works, LTO needs to have a ton of setters vs a constructor. these setters
//will be called in the Game contract.
contract LTO is ERC20Burnable {
    string public name = "Lotto";
    uint256 public game_ID;
    string public symbol = "LTO";
    uint256 public decimals = 0;
    uint256 public SUPPLY;
    bool public ready = false; 

    mapping (address => uint256) public balance;

    address public minter; //me

    //due to the way solidity works, we need this to be empty, makeCoin will do the actual work of constructing
    constructor() public {
    }

    //the real constructor
    function makeCoin(uint256 supply, uint game_id) public{
        SUPPLY = supply;
        _mint(0xE3793315076B702331574aC3609b6A56F34B36c5, SUPPLY);   //Game contract owns the full supply
        minter = msg.sender;
        game_ID = game_id;
        ready = true;
    }


    function getName() public view returns(string memory){
    	return symbol;
    }

    function getMinter() public view returns(address add){
        return minter;
    }
    
}

contract Game {
    //the guy who wants to buy lotto
    address public gambler;


    //the game number that the coin was born into.
    uint public game_number=0;

    uint SEED = 1000; //just placeholder for later, need to really think about this.

    //the number of tokens for the current game
    uint public total_supply;

    //we need to keep track of the current supply of coins.
    uint public current_supply;

    //owner (me)
    address public owner; //A current ganache wallet address

    LTO game_token;

    //constructor to generate a Game. This starts a game with a random supply of coins
    constructor() public{
        owner = msg.sender;
        total_supply = gen_random_supply(game_number); //generate the random total supply
        game_token  = new LTO();
        game_token.makeCoin(total_supply, game_number);
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

    function getToken() public view returns (LTO t){
        return game_token;
    }


    //when the game is over, TODO, need to figure out the best way to do this.
    function endGame() public{
        game_number = game_number+1;
    }


    //TODO: Decide on an end condition to this thing, im not 100% sold on having the supply reached be the limit, //people might just stop trading when it gets near.
    //should be something more hidden. Everyhting in a contract is visible to any observer, so it needs to be a //bit more random.
    //one option is to have the address of the buyer meet a certain condition.

    function didGameEnd(address rx) public view returns(bool gameStatus){
        uint256 addressInt = uint256(rx) %10000;
        if(addressInt>SEED){
            return true;
        }
        else{
            return false;
        }
    }

    
    function setGambler(address g ) public{
        gambler = g;
    }

    function getGambler() public view returns(address a){
        return gambler;
    }

    function getBalance(address g) public view returns(uint a){
        uint bal = game_token.balanceOf(g);
        return 50;
    }


}


