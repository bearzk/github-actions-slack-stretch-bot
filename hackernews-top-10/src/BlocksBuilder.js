// system imports
// 3rd party imports
const _ = require('lodash');
// local imports

class BlocksBuilder {
  _header(type) {
    return {
      type: 'mrkdwn',
      text: {
        type: 'plain_text',
        text: `*${type}* news from hackernews`,
      }
    }
  }

  _divider() {
    return {
      type: 'divider',
    }
  }

  block(entry) {
    const message = `*${entry.title}*\n`
    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: message,
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `${entry.type}`
          },
          {
            type: 'mrkdwn',
            text: `by ${entry.by}`
          },
          {
            type: 'mrkdwn',
            text: `score ${entry.score}`
          }
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Go',
            },
            url: entry.url,
            style: 'primary',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Discussion',
            },
            url: entry.discussion,
          },
        ],
      }
    ]
  }

  blocks(type, data) {
    let blocks = [this._header(type)];

    data.forEach((entry) => {
      blocks.push(this._divider());
      blocks.push(this.block(entry));
    })

    return _.flatten(blocks);
  }
}

module.exports = BlocksBuilder;