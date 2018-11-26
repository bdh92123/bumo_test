const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '127.0.0.1:36002',
});
sdk.account.getInfo("buQfMnWWXPGwQJfEQaLAZdiCfQLirKFWXoJa").then(info=> {
		console.log(info);
	}).catch(err => {
		console.log(err.message);
	});