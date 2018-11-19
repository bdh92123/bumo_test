const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});


const operationInfo = sdk.operation.contractCreateOperation({
  sourceAddress: 'buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa',
  initBalance: '10000000',
  type: 0,
  payload: `
  "use strict";



function init()
{
  storageStore('counter', JSON.stringify(0));

  return;
}

function main()
{
 let counter = parseInt(storageLoad('counter'));

  counter += 1;
  storageStore('counter', JSON.stringify(counter));


  
}


function query()
{ 
 let result = {};
 
 result.counter = storageLoad('counter');
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
  nonce: '3',
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





