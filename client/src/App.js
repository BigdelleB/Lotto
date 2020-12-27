import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
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
          <a href="/" className="buy_btn">
            Buy Lotto
          </a>
          <div class="form-group">
            <input
              type="street"
              class="form-control"
              id="inputStreet"
              placeholder="Street"
            />

            <input
              type="city"
              class="form-control"
              id="inputCity"
              placeholder="City"
            />

            <input
              type="state"
              class="form-control"
              id="inputState"
              placeholder="State"
            />

            <input
              type="zip"
              class="form-control"
              id="inputZip"
              placeholder="Zip"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;





