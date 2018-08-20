var Web3 = require('web3');

var Registry = artifacts.require("./Registry.sol");

contract('Registry unit tests', function([owner, donor]){

    beforeEach('Set up contract for each test', async () => {
    	rg = await Registry.new();

    	accounts = await new Promise(function(resolve, reject) {
            web3.eth.getAccounts( function (err, accounts) { resolve(accounts) })
        });
    });

	it('Stake one entry then check if added', async() => {
		await rg.stake("EOS", {from: donor, value: 2});

		const list = await rg.getTop10();

		const found = web3.toAscii(list[0]);

		assert.strictEqual("EOS", found.substring(0,3), "Registry does not contain entry");
	});

	it('Stake eleven entries then check if added', async() => {
		await rg.stake("EOS", {from: accounts[0], value: web3.toWei(2,'ether')});
		await rg.stake("XRP", {from: accounts[1], value: web3.toWei(1,'ether')});
		await rg.stake("ETH", {from: accounts[2], value: web3.toWei(3,'ether')});
		await rg.stake("XLM", {from: accounts[3], value: web3.toWei(2,'ether')});
		await rg.stake("BTC", {from: accounts[4], value: web3.toWei(1.5,'ether')});
		await rg.stake("LTC", {from: accounts[5], value: web3.toWei(1,'ether')});
		await rg.stake("XMR", {from: accounts[6], value: web3.toWei(0.9,'ether')});
		await rg.stake("BCH", {from: accounts[7], value: web3.toWei(0.8,'ether')});
		await rg.stake("NEO", {from: accounts[8], value: web3.toWei(0.6,'ether')});
		await rg.stake("ADA", {from: accounts[9], value: web3.toWei(0.5,'ether')});
		await rg.stake("ZEC", {from: accounts[9], value: web3.toWei(0.4,'ether')});

		const reglist = await rg.getTop10();

		assert.equal("ETH", web3.toAscii(reglist[0]).substring(0,3), "Registry does not contain correct first symbol");
		assert.equal("EOS", web3.toAscii(reglist[1]).substring(0,3), "Registry does not contain correct second symbol");
		assert.equal("XLM", web3.toAscii(reglist[2]).substring(0,3), "Registry does not contain correct third symbol");
		assert.equal("BTC", web3.toAscii(reglist[3]).substring(0,3), "Registry does not contain correct fourth symbol");
		assert.equal("XRP", web3.toAscii(reglist[4]).substring(0,3), "Registry does not contain correct fifth symbol");
		assert.equal("LTC", web3.toAscii(reglist[5]).substring(0,3), "Registry does not contain correct sixth symbol");
		assert.equal("XMR", web3.toAscii(reglist[6]).substring(0,3), "Registry does not contain correct seventh symbol");
		assert.equal("BCH", web3.toAscii(reglist[7]).substring(0,3), "Registry does not contain correct eighth symbol");
		assert.equal("NEO", web3.toAscii(reglist[8]).substring(0,3), "Registry does not contain correct ninth symbol");
		assert.equal("ADA", web3.toAscii(reglist[9]).substring(0,3), "Registry does not contain correct tenth symbol");

	});

});