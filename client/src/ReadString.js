import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Game;

    // let drizzle know we want to watch the `getGambler` method
    const gambler = contract.methods["getGambler"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ gambler });
  }


  render() {
    // get the contract state from drizzleState
    const { Game } = this.props.drizzleState.contracts;

    // user address
    const myString = Game.getGambler[this.state.gambler];


    // if it exists, then we display its value
    return <p>My public Address is: {myString && myString.value}</p>;
  
  }
}

export default ReadString;