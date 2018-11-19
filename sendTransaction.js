const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '0.0.0.0:36002',
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
  sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
  gasPrice: '1000',
  feeLimit: '306000',
  nonce: '1',
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
    privateKeys: [ 'privbtEELf99kKzMAPJU17ceYzz5d6y8Y5gbEKc7WySG9NRAEmGibkiG' ],
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
    console.log(info);
  }).catch(err => {
   console.log(err.message);
 });
 
 
   if (transactionInfo.errorCode !== 0) {
     console.log(transactionInfo);
   }
   console.log(transactionInfo);
 