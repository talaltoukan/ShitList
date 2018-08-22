import React, { Component } from 'react';
import RegistryAPI from "./api/RegistryAPI.js";


class Landing extends Component<props> {
	state = {
		interval: null,
		loading: false
	}

	componentDidMount = async () => {
	    const interval = setInterval(this.poll, 5000);
	    this.setState({ interval });
  	}

	poll = async () => {
		if(this.state.loading){
			return false;
		}

		console.info('polling');

		const web3 = this.props.web3;
    	const account = this.props.accounts[0];
    	const regAPI = new RegistryAPI(web3, )

    	try {

		} catch(e) {
			console.log(e);
			return false;
		} finally {
			this.setState({ inProgress: false });
		}
	}


	render() {
		return(

		)
	}
}