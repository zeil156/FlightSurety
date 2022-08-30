import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';
import "babel-polyfill";


let config = Config['localhost'];
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
let fee = web3.utils.toWei("1", "ether");
let oracles = [];


async function initializeOracles() {

    let oracleAccounts = await web3.eth.getAccounts(); //first 10 are used in the testing already, atleast 21 more are needed

    for (let i = 0; i < oracleAccounts.length; i++) {   //oracleAccounts.length
        let oracleAddress = oracleAccounts[i];

        try {
            await flightSuretyApp.methods.registerOracle().send({ "from": oracleAddress, "value": fee, "gas": 4712388, "gasPrice": 100000000000});
        } catch (e) {
            console.log('Error in oracle registration' + e);
        }

        oracles.push(oracleAddress) //persisted in memory

    }
}

initializeOracles();

flightSuretyApp.events.OracleRequest({
    fromBlock: 0
}, function (error, event) {
    if (error) console.log(error)
    let statusCode = Math.floor(Math.random() * 6) * 10;

    oracles.forEach((oracle) => {
        oracle.indexes.forEach((index) => {
            flightSuretyApp.methods.submitOracleResponse(
                index,
                result.airline,
                result.flight,
                result.timestamp,
                statusCode
            ).send(
                { from: oracle.address, gas: 3000000 }
            ).then(res => {
                console.log(`OracleResponse: address(${oracle.address}) index(${index}) accepted[${statusCode}]`)
            }).catch(err => {
                console.log(`OracleResponse: address(${oracle.address}) index(${index}) rejected[${statusCode}]`)
            });
        });
    });   
});

const app = express();
app.get('/api', (req, res) => {
    res.send({
        message: 'An API for use with your Dapp!'
    })
})

export default app;
