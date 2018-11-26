const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});


const operationInfo = sdk.operation.contractCreateOperation({
  sourceAddress: 'buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa',
  initBalance: '10000000',
  payload: `
"use strict";

let votePrice = '10';

function init()
{
    let candidates = ["Tom","Mike","Jerry"];
    storageStore('candidates', JSON.stringify(candidates));
    storageStore('candidateVotes', JSON.stringify({"Tom": 0, "Mike": 0, "Jerry": 0}));
    storageStore('votes', JSON.stringify({}));
    return;
}

function main(input)
{
    let para = JSON.parse(input);
    let numbers = para.numbers;
    let candidates = JSON.parse(storageLoad('candidates'));
    let candidateVotes = JSON.parse(storageLoad('candidateVotes'));
    let to = para.candidate;
    let votes = JSON.parse(storageLoad('votes'));
    if (para.method === 'vote' ) {
        assert(thisPayCoinAmount === votePrice, "price is " + votePrice + ", you send " + thisPayCoinAmount);
        let candIdx = candidates.indexOf(to);
        assert(candIdx !== -1, "Candidate param is wrong.");
        votes[sender] = candIdx;
        candidateVotes[to] = candidateVotes[to] + 1;
        storageStore('votes', JSON.stringify(votes));
        storageStore('candidateVotes', JSON.stringify(candidateVotes));
    }
    else if (para.method === 'done'){
        assert(sender === thisAddress, "only owner can call");
        let index = 0;
        let voter;
        Object.keys(votes).forEach(function(voter) {
            payCoin(voter, votePrice, 'Payout ' + voter + 'with vote price: ' + votePrice);
            tlog('vote price payout', 'Payout ' + voter + 'with vote price: ' + votePrice);
        });
    }
}

function query()
{ 
    let result = {};
    result.candidates = JSON.parse(storageLoad('candidates'));
    result.candidateVotes = JSON.parse(storageLoad('candidateVotes'));
    result.votes = JSON.parse(storageLoad('votes'));
    return JSON.stringify(result);
}
`,
});


if (operationInfo.errorCode !== 0) {
  console.log(operationInfo);
  return;
}


const operationItem = operationInfo.result.operation;

console.log(operationItem);

const blobInfo = sdk.transaction.buildBlob({
  sourceAddress: 'buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa',
  gasPrice: '1000',
  feeLimit: '5000306000',
  nonce: '14',
  operations: [ operationItem ],


});

console.log(blobInfo.errorCode);

if (blobInfo.errorCode !== 0) {
  console.log(blobInfo);
  return;
}


const blob = blobInfo.result.transactionBlob;

console.log(blob);

let signatureInfo = sdk.transaction.sign({
privateKeys: [ 'privbUcTFsM2wcn8FdLe9AjaKSia4dwjE6xXYN8yUHznWgFTn78XL3fx' ],
blob,
});


if (signatureInfo.errorCode !== 0) {
console.log(signatureInfo);
return;
}

const signature = signatureInfo.result.signatures;

console.log(signature);



const transactionInfo = sdk.transaction.submit({
 blob,
 signature: signature,
}).then(info=> {
  console.log("---- transaction info")
console.log(info);
}).catch(err => {
console.log(err.message);
});


if (transactionInfo.errorCode !== 0) {
 console.log(transactionInfo);
}





