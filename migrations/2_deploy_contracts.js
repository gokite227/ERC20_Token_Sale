var MyToken = artifacts.require("./MyToken.sol");
var MyRokenSales = artifacts.require("./MyTokenSale.sol");
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyRokenSales, 1, addr[0], MyToken.address);
  let tokenInstance = await MyToken.deployed();
  await tokenInstance.transfer(MyRokenSales.address, process.env.INITIAL_TOKENS)
};
