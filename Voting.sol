pragma solidity ^0.4.18;

contract Voting {

  mapping (bytes32 => uint8) public votesReceived;
  bytes32[] public complaintList;
	
  function Voting(bytes32[] complaintNames) public {
    complaintList = complaintNames;
  }

  function totalVotesFor(bytes32 complaint) view public returns (uint8) {
    require(validComplaint(complaint));
    return votesReceived[complaint];
  }    

  function addComplaint(bytes32 complaintName) public {
    complaintList.push(complaintName); 
    votesReceived[complaintName] = 0;
  }

  function voteForComplaint(bytes32 complaint) public {
    require(validComplaint(complaint));
    votesReceived[complaint]  += 1;
  }
  
  function getListLength(bytes32 a2) view public returns (uint256){
  return complaintList.length;
  }
  
  function getComplaint(uint256 index) view public returns (uint256){
	return 0;
  }
  
  function clearAllVotes(bytes32 a1)  public{
	for(uint i = 0; i < complaintList.length; i++) {
		votesReceived[complaintList[i]] = 0;
	}
  }

  function validComplaint(bytes32 complaint) view public returns (bool) {
    for(uint i = 0; i < complaintList.length; i++) {
      if (complaintList[i] == complaint) {
        return true;
      }
    }
    return false;
   }
}
