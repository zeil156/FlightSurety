
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function (accounts) {

    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x43E295C7D6eED9688503E4D4B61b213b9c513D25",
        "0x4cDcEc8A501d04Ae0EDEe3dD7cB76322Cb155757",
        "0x4a8348E20D22A6b8d68247dd60251183273a88a3",
        "0x9b8758883d9a4bb06BEB148e4F814738b7098379",
        "0x09181698DA256F80B9012C76eC013C3CF11dC354",
        "0x7b196dA589fb5aee8917c8F2Ff161F9eEDA8F9fA",
        "0x5c3184268c5FEbc73dA01b868Cf7cEe134c90251",
        "0xca25D0EcDDd461b385267FfafA6e418F289dDCBb",
        "0x07935dEE2Ff779F43b54A1aC3163A2C89aa42085",
        "0x2E60D1Bc2825696A0AF155ba92B8Ed10eA3b1899",        
    ];


    let owner = accounts[0];
    let firstAirline = accounts[1];
    let secondAirline = accounts[2];
    let thirdAirline = accounts[3];
    let fourthAirline = accounts[4];

    let flightSuretyData = await FlightSuretyData.new();
    let flightSuretyApp = await FlightSuretyApp.new(flightSuretyData.address);


    return {
        owner: owner,
        firstAirline: firstAirline,
        secondAirline: secondAirline,
        thirdAirline: thirdAirline,
        fourthAirline: fourthAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
}

module.exports = {
    Config: Config
};