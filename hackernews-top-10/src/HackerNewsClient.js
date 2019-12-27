// system imports
// 3rd party imports
const axios = require('axios');
// local imports
const config = require('../config');

const httpInstance = axios.create({
  baseURL: config.endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

class HackerNewsClient {
  constructor() {
    this.http = httpInstance;
  }

  async topStories(limit) {
    return this._stories('top', limit);
  }

  async newStories(limit) {
    return this._stories('new', limit);
  }

  async detail(id) {
    const res = await this.http.get(`/item/${id}.json`);
    return res.data;
  }

  async _stories(type, limit = 10) {
    const res = await this.http.get(`/${type}stories.json`);
    const ids = res.data.slice(0, limit);
    const calls = ids.map(async (id) => {
      const detail = await this.detail(id);
      detail.discussion = `https://news.ycombinator.com/item?id=${id}`;
      return detail;
    })

    return Promise.all(calls);
  }
}

module.exports = HackerNewsClient;