// var HDWalletProvider = require("truffle-hdwallet-provider");
// var mnemonic = "clock pair pen style vague provide pelican taste assault planet razor tide";
// var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")


module.exports = {
    networks: {
        development: {

            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id

            // provider: function () {
            //    return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/", 0, 50);
            //    var nonceTracker = new NonceTrackerSubprovider()
            //    wallet.engine._providers.unshift(nonceTracker)
            //    nonceTracker.setEngine(wallet.engine)
            // },
            gas: 5555555 // MZ: changed from '9999999' because of migration error when deploying via truffle instead of in develop
        }
    },
    compilers: {
        solc: {
            version: "^0.5.11",
            // settings: {
                // evmVersion: 'petersburg'
            // }
        }
    }
};