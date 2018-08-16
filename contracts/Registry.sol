pragma solidity ^0.4.23;

import "./LinkedList.sol";
import "./Pausable.sol";

contract Registry is Pausable{

	mapping(string => address[]) symbolToStakers; 
	LinkedList symbolList;


	constructor(uint256 _gameStageLength){

		owner = msg.sender;

		
	}

}