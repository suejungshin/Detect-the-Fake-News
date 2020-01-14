const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, response, body) => {
    // console.log('error: ', err)
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', body)

    if (err) {
      console.log(err);
      callback(err);
    }
    callback(err, body);
  })

}

module.exports.getReposByUsername = getReposByUsername;