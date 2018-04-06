web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"complaint","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"complaint","type":"bytes32"}],"name":"validComplaint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"complaintList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"complaint","type":"bytes32"}],"name":"voteForComplaint","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a2","type":"bytes32"}],"name":"getListLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint"}],"name":"getComplaint","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"complaintName","type":"bytes32"}],"name":"addComplaint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"complaintNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')

VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0x9c355ca1a0464c4de935c88676ff14a2b0de0895');

complaints = {"Test Complaint": "candidate-0"}
var count = 1;

function voteForComplaint(complaint) {
 complaintName = $("#complaint").val();
 try {
  contractInstance.voteForComplaint(complaintName, {from: web3.eth.accounts[0]}, function() {
   let div_id = complaints[complaintName];
   console.log(contractInstance.totalVotesFor.call(complaintName).toString());
   $("#"+div_id).html(contractInstance.totalVotesFor.call(complaintName).toString());
  });
 } catch (err) {
	  console.log(err);
      alert("Not able to vote for entered complaint."); 
	}		
}

function getDB(){
	try{
		var l1= contractInstance.getListLength.call('test');
		l1 = parseInt(l1, 10);
		console.log("Length: "+ l1);
		
	} catch(err){
		console.log(err);
	}
	try{
		for(var j=0;  j<l1 ; j++)
		{
			var h1 =  contractInstance.getComplaint.call(j);
			h1= parseInt(h1,10);
			console.log(h1)
		}
	}  catch (err){
		console.log(err)
	}
	
}


function addSomething(){
	var newComplaintName = document.getElementById("newctitle").value;
	var newComplaintDesc = document.getElementById("newcdesc").value;
	var newComplaintCategory = document.getElementById("newccategory").value;
	var duplicateComplaintTitle = false;
	complaintNameList = Object.keys(complaints);
	for(var i=0; i<complaintNameList.length; i++){
		if (newComplaintName === complaintNameList[i]){
			duplicateComplaintTitle = true;
		}
		
	}	
	
	if( newComplaintName==""||newComplaintCategory == "" || newComplaintDesc==""|| duplicateComplaintTitle == true)
	{
		alert("Enter unique title and description for registering a new complaint");  
	} else {
		document.getElementById('table1').innerHTML += '<tr><td id="title-'+count.toString()+'">'+newComplaintName.toString()+'</td><td>'+newComplaintCategory.toString()+'</td><td>'+newComplaintDesc.toString()+'</td><td id="candidate-' + count.toString()+'"></td></tr>';
		complaints[newComplaintName]= "candidate-"+ count.toString();
		
		count = count+1;
		try{ 
			contractInstance.addComplaint(newComplaintName, {from: web3.eth.accounts[0]},  function() {
			let div_id = complaints[newComplaintName];
			$("#"+div_id).html(contractInstance.totalVotesFor.call(newComplaintName).toString());});
		} catch(err) {
			console.log(err);
			alert("Not able to add complaints.");
		}
	}
}

$(document).ready(function() {
 complaintNames = Object.keys(complaints);
 for (var i = 0; i < complaintNames.length; i++) {
  let name = complaintNames[i];
  let val = contractInstance.totalVotesFor.call(name).toString()
  $("#"+complaints[name]).html(val);
 }
});