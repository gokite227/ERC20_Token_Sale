import React, { Component } from "react";

function TokenBuy({kycAddress, handleInputChange, handleKycSubmit}) {
    return (
        <div>
            <h1>Capuccino Token for StarDucks</h1>
            <h2>Enable your accoount</h2>
            Address to allow : <input tupe="text" name="kycAddress" value={kycAddress} onChange={handleInputChange}/>
            <button type="button" onClick={handleKycSubmit}>Add Address to Whitelist</button>
        </div>
    );
  }
  
  export default TokenBuy;