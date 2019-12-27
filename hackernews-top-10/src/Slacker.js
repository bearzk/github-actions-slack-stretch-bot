// system imports
// 3rd party imports
const axios = require('axios');
// local imports
const config = require('./../config');

class Slacker {
  post(blocks) {
    const payload = {
      channel: '#notifications',
      username: 'HackerNewsBot',
      blocks,
    }

    axios.post(config.slackUrl, payload);
  }
}

module.exports = Slacker;