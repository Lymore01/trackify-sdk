import { createClient, TrackifyWebhook } from '../src/index';

// --- Webhook Verification Example ---

const WEBHOOK_SECRET = 'your-secret-from-env';
const webhookPayload = JSON.stringify({
  type: 'link_clicked',
  data: {},
});
const webhookHeaders = {
  'x-webhook-signature': 'some.fake.signing.secret',
};

try {
  const event = TrackifyWebhook.verifyPayload(
    WEBHOOK_SECRET,
    webhookPayload,
    webhookHeaders,
  );
  console.log('Webhook event data:', event.data);
} catch (err) {
  console.error('Webhook verification failed:', err.message);
}

// --- Trackify Client Example ---

const API_KEY = 'pk_81d196cfcab012d880089680de55fae6b';
const API_URL = 'http://localhost:3000/api';

async function runClientExamples() {
  // Uncomment to use the client
  // const client = createClient(API_KEY, API_URL);
  // // List all apps
  // const apps = await client.listApps();
  // console.log('Apps:', apps);
  // // Create a new app
  // const app = await client.createApp('some.fake.app.name');
  // console.log('Created App:', app);
  // // Use Link API for a specific app
  // const linkApi = await client.from('Enigma');
  // // Get all links
  // const links = await linkApi.getLinks();
  // console.log('Links:', links.data?.data);
  // // Get a single link
  // const singleLink = await linkApi.getLink('some.fake.link.short.id');
  // console.log('Single Link:', singleLink.data?.data);
  // // Create a new link
  // const createdLink = await linkApi.createLink({
  //   original: 'https://www.example.com/',
  //   description: 'Example desc',
  // });
  // console.log('Link Creation:', createdLink);
  // // Update a link
  // const updatedLink = await linkApi.updateLink('some.fake.link.id', {
  //   originalUrl: 'https://www.example.app/',
  //   description: 'Updated Original Url',
  // });
  // console.log('Link Update:', updatedLink);
  // // Delete a link
  // const deleteLink = await linkApi.deleteLink('some.fake.link.id');
  // console.log('Link Delete:', deleteLink);
}

runClientExamples().catch(console.error);

/*
  Test_1: pk_81d196cfcab012d880089680de55fae6b
  Test_2: pk_c9e8f8dcdd0eff8a7b780e56d5af5960v
*/
