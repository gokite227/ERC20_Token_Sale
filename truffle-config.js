const path = require("path");
require('dotenv').config({path:'./.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 8545,
      host : "127.0.0.1",
      network_id : 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetaMaskAccountIndex )
      },
      network_id: 1337,
    },
    goerli_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/3876509ed81a411488549089b765ec18", MetaMaskAccountIndex)
      },
      network_id: 5,
    }
  },
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  }
};
