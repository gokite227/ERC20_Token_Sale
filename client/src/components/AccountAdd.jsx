import React, { Component } from "react";
import "./style.css";

function TokenBuy({ kycAddress, handleInputChange, handleKycSubmit }) {
  return (
    <div style={{padding:"6%"}}>
      {/* Address to allow : <input tupe="text" name="kycAddress" value={kycAddress} onChange={handleInputChange}/>
            <button type="button" onClick={handleKycSubmit}>Add Address to Whitelist</button> */}

      <form class="signUp" action="" method="get">
        <div class="formGroup">
          <p class="p1">Enable your accoount</p>
        </div>
        <div class="formGroup">
          <p class="p2">Address to allow</p>
        </div>
        <div class="formGroup">
          <input
            type="text"
            name="kycAddress"
            value={kycAddress}
            onChange={handleInputChange}
            required
            autocomplete="off"
          />
        </div>
        
        <div class="formGroup">
          <button type="button" class="btn2" onClick={handleKycSubmit} >
            Add Address to Whitelist
          </button>
        </div>
      </form>
    </div>
  );
}

export default TokenBuy;
