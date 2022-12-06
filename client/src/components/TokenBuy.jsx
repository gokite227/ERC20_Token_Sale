import React, { Component } from "react";
import "./style.css";

function TokenBuy({tokenAddress, userTokens, handleBuyToken}) {
    return (
      <div>
        <form class="signUp" action="" method="get">
          <div class="formGroup">
            <p class="p1">Buy Cappucino-Tokens</p>
          </div>
          <div class="formGroup">
            <p class="p3">Send Ether to this address: {tokenAddress}</p>
          </div>
          <div class="formGroup">
            <p class="p2">You have : 10</p>
          </div>
          
          <div class="formGroup">
            <button type="button" class="btn2" onClick={handleBuyToken}>
            Buy more tokens
            </button>
          </div>
        </form>
        {/* <h2>Buy Cappucino-Tokens</h2>
        <p>Send Ether to this address: {tokenAddress}</p>
        <p>You have : {userTokens}</p>
        <button type="button" onClick={handleBuyToken}>
          Buy more tokens
        </button> */}
      </div>
    );
  }
  
  export default TokenBuy;