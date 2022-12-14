const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MytokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async function(accounts) {
    const [deployerAccount, recipient, anotherAccount] = accounts;
    

    it("there shouldnt be any coins in my account", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all coins should be in the tokensale smart contract", async () => {
        let instance = await Token.deployed();
        let blalnceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(blalnceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy tokens", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let KycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await KycInstance.setKycCompleted(deployerAccount, {from: deployerAccount}); //화이트 리스트 설정
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1","wei")})).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    });

});
