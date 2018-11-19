const BumoSDK = require('bumo-sdk');
const fs = require('fs');


const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});

const address = "buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa";
sdk.account.getInfo(address).then(info=> {
    console.log(info);
    fs.writeFileSync("./balance.json", JSON.stringify(info), { encoding: "utf8" });
}).catch(err => {
   console.log(err.message);
 });

