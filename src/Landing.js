import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import RegistryAPI from "./api/RegistryAPI.js";


class Landing extends Component<props> {
	state = {
		interval: null,
		loading: false
	}

	componentDidMount = async () => {
	    const interval = setInterval(this.poll, 10000);
	    this.setState({ interval });
  	}

	poll = async () => {
		if(this.state.loading){
			return false;
		}

		console.info('polling');

		const web3 = this.props.web3;
    	const account = this.props.accounts[0];
    	const registry = this.props.registry;
    	const regAPI = new RegistryAPI(web3, () => {}, registry);

    	this.setState({ loading: true });
    	let curLst;
    	try {
    		curLst = regAPI.getRegList();
		} catch(e) {
			console.log(e);
			return false;
		} finally {
			this.setState({ loading: false });
		}
		console.info(curLst);
	}


	render() {
		return(
			<div>
				<Grid className="registries-container">
					<Row>
						<Col className="registry-container">
							<ListGroup className="registry">
								<ListGroupItem>Item 1</ListGroupItem>
								<ListGroupItem>Item 2</ListGroupItem>
								<ListGroupItem>Item 3</ListGroupItem>
								<ListGroupItem>Item 4</ListGroupItem>
								<ListGroupItem>Item 5</ListGroupItem>
								<ListGroupItem>Item 6</ListGroupItem>
								<ListGroupItem>Item 7</ListGroupItem>
								<ListGroupItem>Item 8</ListGroupItem>
								<ListGroupItem>Item 9</ListGroupItem>
								<ListGroupItem>Item 10</ListGroupItem>
							</ListGroup>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

export default Landing;