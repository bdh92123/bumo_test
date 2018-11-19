const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});

const operationInfo = sdk.operation.buSendOperation({
  destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
  buAmount: '1',
  metadata:'746573742073656e64206275',
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
  feeLimit: '306000',
  nonce: '2',
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

sdk.account.getInfo("buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa").then(info=> {
		console.log(info);
	}).catch(err => {
		console.log(err.message);
	});

/*
  const transactionInfo = sdk.transaction.submit({
     blob,
     signature: signature,
   }).then(info=> {
    console.log(info);
    sdk.account.getInfo("buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa").then(info=> {
		console.log(info);
	}).catch(err => {
		console.log(err.message);
	});


  }).catch(err => {
   console.log(err.message);
 });
 
 
   console.log(transactionInfo);

  */ 