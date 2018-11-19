const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});

Promise.all([
 sdk.operation.contractInvokeByBUOperation({
    contractAddress: 'buQeegksEXD3iWtQgZDZsSqdJR8LpzvmvntP',
    // input: JSON.stringify({
    //   params: {
    //  }
    // }),
  })
]).then(res => {
    let operationItem = res[0].result.operation

  
  
    
  console.log(operationItem);
  
 
  const blobInfo = sdk.transaction.buildBlob({
    sourceAddress: 'buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa',
    gasPrice: '1000',
    feeLimit: '306000',
    nonce: '4',
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
     console.log(info);
   }).catch(err => {
    console.log(err.message);
  });
  
  
    if (transactionInfo.errorCode !== 0) {
      console.log(transactionInfo);
    }
    console.log(transactionInfo);
});
                                  