var Web3 = require('web3');

var Registry = artifacts.require("./Registry.sol");

contract('Registry unit tests', function([owner, donor]){

    beforeEach('Set up contract for each test', async () => {
    	rg = await Registry.new();

    	accounts = await new Promise(function(resolve, reject) {
            web3.eth.getAccounts( function (err, accounts) { resolve(accounts) })
        });
    });

	it('Stake EOS then check if added', async() => {
		rg.stake("EOS", {from: donor, value: 2});

		const list = await rg.getTop10();

		assert("EOS", web3.toAscii(list[0]), "Registry does not contain symbol");
	});
});