import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import DetectLottoClick from "./DetectLottoClick"; /*Needs to be upper case for some reason*/
import ReadString from "./ReadString";
import SetString from "./SetString";

class App extends React.Component{
  state = { loading: true, drizzleState: null };

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
          <span className="balance">200$</span>
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
          />
        </div>
      </section>
    </div>
  );
  }
}


export default App;
