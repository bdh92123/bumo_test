const BumoSDK = require('bumo-sdk');
const fs = require('fs');

const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});


sdk.contract.call({
    optType: 2,
    contractAddress: 'buQcWTyx36JSCsZukmB5Fa43QmVjwHoHEXNC',
    // input: JSON.stringify({
    //   params: {
    //  }

    // }),
  }).then(data => {
    console.log(data);
    fs.writeFileSync("./query.json", JSON.stringify(data), { encoding: "utf8" });

}).catch(err => {
    console.log(err);
  });

