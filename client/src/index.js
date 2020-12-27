import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  //i dont think that this is needed but whatever, the tutorial uses it.
import App from './App';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "@drizzle/store";
import Game from "./contracts/Game.json"; //LTO contract is wrapped into the Game contract, i think this is ok to just import Game and it will bring all of the dependencies.


// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [Game], //again, i think LTO will be included since it is a dependency.
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));





