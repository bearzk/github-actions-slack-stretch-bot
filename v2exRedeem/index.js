// 3rd party imports
const axios = require('axios');

// local imports
const config = require('./config');

const cookiesString = Object.entries(config.cookies)
  .map(pair => {
    return `${pair[0]}=${pair[1]};`;
  })
  .join('');

const slackIt = text => {
  const payload = {
    text,
    channel: '#notifications',
    username: 'v2exRedeemBot'
  };

  axios.post(config.slackUrl, payload);
};

const sign = async () => {
  const res = await axios.get('https://www.v2ex.com/mission/daily', {
    headers: { Cookie: cookiesString }
  });

  const loggedIn = res.data.match(/登出/);
  if (!loggedIn) {
    console.log('not login, exit');
    return;
  }

  let redeemLinkMatch = res.data.match(/\/mission\/daily\/redeem\?once=\d+/);
  if (!redeemLinkMatch) {
    slackIt('already redeemed today');
    return;
  }
  let redeemLink = redeemLinkMatch[0];

  const redeemRes = await axios.get(`https://www.v2ex.com${redeemLink}`, {
    headers: { Cookie: cookiesString }
  });

  let worked = redeemRes.data.match(/成功领取/);
  if (!worked) {
    slackIt('somehow not worked :broken_heart:');
    return;
  }

  slackIt('redeem worked :ok_hand:');
};

sign();
