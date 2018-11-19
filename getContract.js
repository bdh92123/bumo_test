const BumoSDK = require('bumo-sdk');
const fs = require('fs');


const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});

const hash = "a77261ae1d7faf5975114d80497ec302e6d7d8e9fc20ef2e48360e832724736b";

sdk.contract.getAddress(hash).then(data => {
    console.log(data);
    fs.writeFileSync("./address.json", JSON.stringify(data), { encoding: "utf8" });

}).catch(err => {
    console.log(err);
  });

