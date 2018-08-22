var web3 = require('web3');

class RegistryAPI {
	constructor(web3, assert, registry) {
		this.web3 = web3
		this.assert = assert
		this.registry = registry
	}

	async stakeSymbol(symbol, amount, usr_addr) {
		await this.registry.stake(symbol, {from: usr_addr, value: web3.toWei(amount,'ether')});
	}

	async getRegList() {
		const reg = await this.registry.getTop10();
		const resLst;
		for(int i = 0; i < reg.length; i++){
			restLst.append(web3.toAscii(reg[i]));
		}
		return resLst;
	}
}

export default RegistryAPI;