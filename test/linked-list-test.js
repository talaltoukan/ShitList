var Web3 = require('web3');

var LinkedList = artifacts.require("./LinkedList.sol");

contract('Linked List unit tests', function([owner, donor]){

	it('Init empty LinkedList', async () => {
		ll = await LinkedList.new();
		const totalStake = await ll.getStakePool();

		assert.equal(totalStake, 0);
	});

	it('Add one element', async() => {
		ll = await LinkedList.new();
		await ll.addNode(2, "EOS");
		const totalStake = await ll.getStakePool();

		assert.equal(totalStake.toNumber(), 2);
	});

	it('Add an element then delete it', async() => {
		ll = await LinkedList.new();
		await ll.addNode(2, "EOS");
		await ll.deleteNode("EOS");		
		const totalStake = await ll.getStakePool();
		assert.equal(totalStake.toNumber(), 0);
	});

});