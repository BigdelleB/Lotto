import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  //i dont think that this is needed but whatever, the tutorial uses it.
import App from './App';

//import drizzle functions and contract artifact
import { Drizzle, generateStore } from "@drizzle/store";
import Game from "./contracts/Game.json";
import LTO from "./contracts/LTO.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [ Game, LTO ], //adding all necessary contracts
  syncAlways:true,
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





