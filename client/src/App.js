import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import DetectLottoClick from "./DetectLottoClick"; /*Needs to be upper case for some reason*/
import ReadString from "./ReadString";
import SetString from "./SetString";
import GetBalance from "./GetBalance";

class App extends React.Component{
  state = { loading: true, drizzleState: null, gambler: null, gamblerBalance: null}; //the states that I care about
  
constructor () {
    super();
    this.handleGamblerChange = this.handleGamblerChange.bind(this);
  }

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  handleGamblerChange(value){
    const g = value;
    this.setState({ gambler : g });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render(){
    if (this.state.loading) return "Loading Drizzle...";

    return (
    <div className="_container">
      <section className="upper d-flex justify-content-md-end justify-content-center">
        <div className="balance_box">
          <span className="balance_label">Current Balance</span>
          <span className="balance"> 
            <GetBalance
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            />
          </span>
        </div>
      </section>
      <section className="lower">
        <div className="lower_section">
          <DetectLottoClick/>  
          <ReadString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            
          />
          <SetString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            handleGamblerChange = {this.handleGamblerChange}
          />
        </div>
      </section>
    </div>
  );
  }
}


export default App;
