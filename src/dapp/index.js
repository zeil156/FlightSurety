
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async () => {

    let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error, result);
            display('Operational Status', 'Check if contract is operational', [{ label: 'Operational Status', error: error, value: result }]);
        });


        // User-submitted transaction
        DOM.elid('submit-oracle').addEventListener('click', () => {
            let flight = DOM.elid('flightlist').value;

            // Write transaction
            contract.fetchFlightStatus(flight, (error, result) => {
                display('Oracles', 'Trigger oracles', [{ label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp + ' ' + result.airline + ' ' + statusCode }]);
            });
        })

        // User-submitted transaction
        DOM.elid('register-flights').addEventListener('click', () => {
            contract.registerInitialFlights((error, result) => {
                display('Flights', 'Register initial flights', [{ label: 'Flights registered:', error: error, value: result.flight1 + ', ' + result.flight2 + ', ' + result.flight3 }]);
            });
        })

        DOM.elid('buy-insurance').addEventListener('click', () => {
            let flight = DOM.elid('flightlist').value;

            console.log('buy insurance');

            contract.buy(flight, (error, result) => {
                display('Flights', 'Buy insurance', [{ label: 'Buy Flight Insurance', error: error, value: (result.insuranceAmount / 1000000000000000000) + ' ether paid to insure flight ' + result.flightNumber + ' departing on ' + new Date(result.departureTime * 1000) }]);
            });
        })

        DOM.elid('withdraw-payouts').addEventListener('click', () => {

            console.log('withdraw-credits');

            contract.withdrawPayouts((error, result) => {
                display('Payouts', 'Withdraw payouts', [{ label: 'Withdraw Insurance Payouts', error: error, value: result }]);
            });
        })
    });
})();


function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({ className: 'row' }));
        row.appendChild(DOM.div({ className: 'col-sm-4 field' }, result.label));
        row.appendChild(DOM.div({ className: 'col-sm-8 field-value' }, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}





