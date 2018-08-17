var Web3 = require('web3');

var Registry = artifacts.require("./Registry.sol");

contract('Linked List unit tests', function([owner, donor]){

	it('Add one element to LinkedList', async() => {
		ll = await Registry.new();
		await ll.addNode(2, "EOS");
		const totalStake = await ll.getStakePool();

		assert.equal(totalStake.toNumber(), 2);
	});

	it('Add an element to LinkedList then delete it', async() => {
		ll = await Registry.new();
		await ll.addNode(2, "EOS");
		await ll.deleteNode("EOS");		
		const totalStake = await ll.getStakePool();
		assert.equal(totalStake.toNumber(), 0);
	});

});