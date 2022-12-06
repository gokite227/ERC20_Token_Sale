import React, { Component } from "react";

function TokenBuy({tokenAddress, userTokens, handleBuyToken}) {
    return (
        <div>
            <h2>Buy Cappucino-Tokens</h2>
            <p>Send Ether to this address: {tokenAddress}</p>
            <p>You have : {userTokens}</p>
            <button type="button" onClick={handleBuyToken}>Buy more tokens</button>
        </div>
    );
  }
  
  export default TokenBuy;