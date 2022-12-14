import React, { Component } from "react";

import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";
import TokenBuy from "./components/TokenBuy";
import AccountAdd from "./components/AccountAdd";

import "./App.css";
import "./components/style.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123...", tokenSaleAddress: "", tokenAddress: "", userTokens: 0, page: true };
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.myToken = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.myTokenSale = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );

      this.kycContract = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({ loaded: true, tokenSaleAddress: this.myTokenSale._address, tokenAddress: this.myToken._address }, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycSubmit = async () => {
    const { kycAddress } = this.state;
    await this.kycContract.methods.setKycCompleted(kycAddress).send({ from: this.accounts[0] });
    console.log(kycAddress);
    alert("Account " + kycAddress + " is now whitelisted");
  }

  handleBuyToken = async () => {
    await this.myTokenSale.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: 1000000000000000 });
  }

  updateUserTokens = async () => {
    let userTokens = await this.myToken.methods.balanceOf(this.accounts[0]).call();
    this.setState({ userTokens: userTokens });
  }

  listenToTokenTransfer = async () => {
    this.myToken.events.Transfer({ to: this.accounts[0] }).on("data", this.updateUserTokens);
  }

  

  render() {
    
    if (!this.state.loaded) {
      return (
        <div class="container">
          <h2>Loading Web3, accounts, and contract...</h2>
        </div>
      );
    }
    
    return (
      <div class="container1">
      <div class="container">
        <h1>Capuccino Token for StarDucks</h1>
        <div class="form">
          <div class="btn">
            {/* <button class="signUpBtn" onClick={changePageAdd}>ADD Address</button>
            <button class="loginBtn" onClick={changePageBuy}>BUY TOKEN</button> */}
          </div>
          <div id="page">
            <AccountAdd kycAddress={this.state.kycAddress} handleInputChange={this.handleInputChange} handleKycSubmit={this.handleKycSubmit} />
            <TokenBuy tokenAddress={this.state.tokenSaleAddress} userTokens={this.state.userTokens} handleBuyToken={this.handleBuyToken} />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
