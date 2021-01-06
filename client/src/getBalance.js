import React from "react";

class GetBalance extends React.Component{

	state = {balance: null }; //any update on this will trigger a re-rendering


	componentDidMount() {
 		const { drizzle } = this.props;  //props is passed in from App.js
    	const Game_contract = drizzle.contracts.Game; //get the game contract

		const bal = Game_contract.methods["getBalance"].cacheCall(); //get the GetBalance method

  
    	this.setState({balance:bal}); //now react will update every time balance updates
	}


	  render(){
	  	/*const { Game } = this.props.drizzleState.contracts;
	  	const address = this.props.gambler;

    	// user address
    	const bal = Game.getBalance[address];*/
	   
	    return( <p>{100}</p>);
	  }
  
}


export default GetBalance;