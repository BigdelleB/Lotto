import React from "react";

/*
When the Buy Lotto button is clicked, a generateTokens method should be invoked that sends out 
tokens to the address saved.
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
