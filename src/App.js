import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import getWeb3 from "./utils/getWeb3.js";

import Landing from "./Landing";

const RegistryABI = require('./contracts/Registry.json');
const contract = require('truffle-contract');

class App extends Component<props> {
	state = {
		web3: null,
		accounts: null,
		registry: null
	}

	async componentDidMount() {
	    const results = await getWeb3;
	    const web3 = results.web3;
		this.setState({ web3 });

		const RegistryContract = contract(RegistryABI);
		RegistryContract.setProvider(web3.currentProvider);

		const accounts = await new Promise(function(resolve, reject) {
			web3.eth.getAccounts( function (err, accounts) { resolve(accounts) })
		});
		this.setState({ accounts: accounts });

		let instance
		const network = await web3.eth.net.getNetworkType();

		if(accounts.length == 0) {
		  toast.error('Be sure to log into Metamask.', {
		    position: "top-right",
		    autoClose: false,
		    hideProgressBar: false,
		    closeOnClick: true,
		    draggable: false,
		    draggablePercent: 0
		  })
		  return false
		}
		if(network === "private") { // localhost:9545
		  instance = await RegistryContract.deployed();
		  toast('Configured with local network. Success!', {
		    position: "top-right",
		    autoClose: true,
		    hideProgressBar: false,
		    closeOnClick: true,
		    draggable: false,
		    draggablePercent: 0
		  })
		}	
		this.setState({ registry: instance });
	}

	render() {
		return (
			<Router>
        	<div className="fullpage">
          		<ToastContainer />
          		<div className="fullcontainer">

		            <Navbar inverse collapseOnSelect>
		              <Navbar.Header>
		                <Navbar.Brand>
		                </Navbar.Brand>
		                <Navbar.Toggle />
		              </Navbar.Header>
		              <Navbar.Collapse className="collapsed-nav">
		                <Nav className="nash-nav-right" pullRight>
		                  <NavItem eventKey={1} href="/faq">
		                    FAQ
		                  </NavItem>
		                </Nav>
		              </Navbar.Collapse>
		            </Navbar>

		            <Switch>
		              <Route exact path="/" render={(props) => ( <Landing {...props} {...this.state} /> )} />
		              {/*<Route path="/faq" render={(props) => (<FAQ {...props} {...this.state} />)} />
		              <Route exact path="/error" render={(props) => (<Error {...props} {...this.state} />)} />
		              <Redirect from="*" to="/error" /> */}
		            </Switch>

		            <div>
		            <Navbar className="nash-footer" collapseOnSelect>
		                <Nav>
		                  <NavItem className="nash-footer-element" eventKey={1}>
		                    © 2018 SHITLIST, INC
		                  </NavItem>
		                  <NavItem className="nash-footer-element" eventKey={2} href="#">
		                    TERMS OF USE
		                  </NavItem>
		                  <NavItem className="nash-footer-element" eventKey={3} href="#">
		                    PRIVACY POLICY
		                  </NavItem>
		                  <NavItem className="nash-footer-element" eventKey={4} href="#">
		                    TELEGRAM
		                  </NavItem>
		                  <NavItem className="nash-footer-element" eventKey={5} href="#">
		                    TWITTER
		                  </NavItem>
		                  <NavItem className="nash-footer-element" eventKey={6} href="#">
		                    GITHUB
		                  </NavItem>
		                  <NavItem className="nash-footer-element" eventKey={7} href="#">
		                    MADE WITH ♥ IN NYC
		                  </NavItem>
		                </Nav>
		            </Navbar>
		            </div>
		          </div>
		        </div>
		    </Router>
    );
  }
}

export default App;