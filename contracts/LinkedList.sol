pragma solidity ^0.4.23;

contract LinkedList {

	event AddEntry(bytes32 head,uint stake,bytes32 symbol,bytes32 next);

	bytes32 public head;
	mapping(bytes => Object) public nodePointers;

	struct Node{
		bytes32 next;
		uint256 stake;
		bytes32 symbol;
	}
	
	constructor(){
		head = 0;
	}

	function deleteNode(bytes32 _headSymbol) returns(uint256 deletedStake){
		bytes32 prevPointer = 0;
		bytes32 curPointer = head;
		while(curPointer != 0){
			bytes32 curSymbol = nodePointers[curPointer].symbol;
			if(curSymbol ==_headSymbol){
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
	}

	function addNode(uint256 _newStake, bytes32 _newSymbol){
		bytes32 prevPointer = 0;
		bytes32 curPointer = head;
		while(curPointer != 0){
			uint256 curStake = nodePointers[curPointer].stake;
			if(curStake < _newStake){
				Node newNode = Node(curPointer, _newStake, _newSymbol);
				bytes32 newPointer = sha3(newNode.stake, newNode.symbol, now);
				nodePointers[newPointer] = newNode;
				if(prevNode != 0){
					nodePointers[prevPointer].next = newPointer;
				} else {
					head = newPointer;
				}
			} else {
				prevPointer = curPointer;
				curPointer = nodePointers[curPointer].next;
			}
		}
	}
}