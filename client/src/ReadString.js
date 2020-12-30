import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleStorage;

    // let drizzle know we want to watch the `storedString` method
    const dataKey = contract.methods["storedString"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { SimpleStorage } = this.props.drizzleState.contracts;

    // user address
    const myString = SimpleStorage.storedString[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My public Address is: {myString && myString.value}</p>;
  }
}

export default ReadString;