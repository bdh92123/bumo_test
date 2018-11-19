const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
});
 
sdk.operation.contractInvokeByBUOperation({
  contractAddress: 'buQswKLuqPUSDQjsfqh4CZ9i3NPWevTNuvnk',
  input: JSON.stringify({
      method: 'done',
      params: {
        "desc" : "this is desc"
      }
      }),
}).then(res => {
   console.log(res)
    let operationItem = res.result.operation

  console.log(operationItem);
  
 
  const blobInfo = sdk.transaction.buildBlob({
    sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
    gasPrice: '1000',
    feeLimit: '3100409000',
    nonce: '96',
    operations: [ operationItem ],
  
  })
  
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
}).catch(console.log)
                                  