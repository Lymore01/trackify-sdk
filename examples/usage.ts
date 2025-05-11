import { createClient } from '../src/index';

(async () => {
  const client = createClient('some.fake.api.key', 'https://api.trackify.com');

  // use this inside async function
  const linkApi = await client.from('docx');
  const link = linkApi.getLink('123');
})();
