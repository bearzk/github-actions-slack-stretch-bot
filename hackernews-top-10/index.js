// system imports
// 3rd party imports
// local imports
const HackerNewsClient = require('./src/HackerNewsClient');
const BlocksBuilder = require('./src/BlocksBuilder');
const Slacker = require('./src/Slacker');

const client = new HackerNewsClient();
const blocksBuilder = new BlocksBuilder();
const slacker = new Slacker();

const main = async () => {
  const stories = await client.topStories();
  const blocks = blocksBuilder.blocks('new', stories);

  slacker.post(blocks);
}

main();