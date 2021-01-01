import React from "react";

class getBalance extends React.Component{





getGamblerBalance(){
    const { Game } = this.props.drizzleState.contracts;

    // let drizzle know we want to watch the `getBalance` method
    const balance = Game.methods["getBalance"].cacheCall();
    return balance;

  }


}