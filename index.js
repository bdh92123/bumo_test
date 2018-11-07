const BumoSDK = require('bumo-sdk');
const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});

sdk.account.create().then(account=>{
	console.log(account);
})