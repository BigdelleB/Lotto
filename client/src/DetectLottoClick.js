import React from "react";

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