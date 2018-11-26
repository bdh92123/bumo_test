const BumoSDK = require('bumo-sdk');
const fs = require('fs');


const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});

const hash = "75a57d2ed75e827bfc09cb58017de68f9c0ddf4e82f0c8e832357822be9414b6";
sdk.transaction.getInfo(hash).then(data => {
    console.log(data);
    fs.writeFileSync("./tx.json", JSON.stringify(data), { encoding: "utf8" });

}).catch(err => {
    console.log(err);
  });

