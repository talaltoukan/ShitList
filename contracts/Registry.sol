pragma solidity ^0.4.23;

import "./Pausable.sol";

contract Registry is Pausable{

	mapping(string => address[]) symbolToStakers; 

	constructor() public{

		owner = msg.sender;
		
	}





	/*
		LinkedList Implementation
	*/

	event AddedNode(bytes32 next, uint256 stake,bytes32 symbol);
	event DeletedNode(uint256 stake, bytes32 symbol);

	bytes32 public head;
	mapping(bytes32 => Node) public nodePointers;
	uint256 public stakePool;

	struct Node{
		bytes32 next;
		uint256 stake;
		bytes32 symbol;
	}

	function deleteNode(bytes32 _nodeSymbol) public returns(uint256){
		bytes32 prevPointer = bytes32(0);
		bytes32 curPointer = head;
		while(curPointer != bytes32(0)){
			bytes32 curSymbol = nodePointers[curPointer].symbol;
			if(keccak256(abi.encodePacked(curSymbol)) == keccak256(abi.encodePacked(_nodeSymbol))){
				stakePool = stakePool - nodePointers[curPointer].stake;
				//If you are at head node
				if(prevPointer == 0){
					head = nodePointers[head].next;
				}
				//If you are not at head node
				else {
					nodePointers[prevPointer].next = nodePointers[curPointer].next;
				}
				return nodePointers[curPointer].stake;
			}
			prevPointer = curPointer;
			curPointer = nodePointers[curPointer].next;
		}
		return 0;
	}

	function addNode(uint256 _newStake, bytes32 _newSymbol) public {
		bytes32 prevPointer = bytes32(0);
		bytes32 curPointer = head;
		bool added = false;
		Node memory newNode;
		bytes32 newPointer;
		stakePool += _newStake;
		while(curPointer != bytes32(0)){
			uint256 curStake = nodePointers[curPointer].stake;
			if(curStake < _newStake){
				newNode = Node(curPointer, _newStake, _newSymbol);
				newPointer = keccak256(abi.encodePacked(newNode.stake, newNode.symbol, now));
				nodePointers[newPointer] = newNode;
				nodePointers[prevPointer].next = newPointer;
				added = true;
			} else {
				prevPointer = curPointer;
				curPointer = nodePointers[curPointer].next;
			}
		}
		if(!added){
			newNode = Node(bytes32(0), _newStake, _newSymbol);
			newPointer = keccak256(abi.encodePacked(newNode.stake, newNode.symbol, now));
			nodePointers[newPointer] = newNode;
			head = newPointer;
		}
	}
	
	function getStakePool() public view returns (uint256){
		return stakePool;
	}

}