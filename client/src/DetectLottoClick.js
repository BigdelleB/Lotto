import React from "react";

/*
When the Buy Lotto button is clicked, the method Game.generateTokens should be invoked
*/

function DetectLottoClick(){

  function ackClick(){
    alert("Clicked");
  }

  return(
    <div>
      <button onClick={ackClick}>Buy Lotto</button>
    </div>
    );
}
export default DetectLottoClick;
