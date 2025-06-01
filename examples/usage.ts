// import { createClient, TrackifyWebhook } from 'trackify-sdk';

import { TrackifyWebhook, createClient } from '../src';

// --- Webhook Verification Example ---

const WEBHOOK_SECRET = 'your-secret-from-env';
const webhookPayload = JSON.stringify({
  type: 'link_clicked',
  data: { userId: '123' },
});
const webhookHeaders = {
  'x-webhook-signature': 'your.generated.signature',
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

async function main() {
  const client = createClient(API_KEY, API_URL);

  // List all apps
  const apps = await client.listApps();
  console.log('Apps:', apps);

  //   // Create a new app
  //   const app = await client.createApp('my-new-app');
  //   console.log('Created App:', app);

  //   // Use Link API for a specific app
  //   const linkApi = await client.from('my-new-app');

  //   // Get all links
  //   const links = await linkApi.getLinks();
  //   console.log('Links:', links);

  //   // Create a new link
  //   const createdLink = await linkApi.createLink({
  //     original: 'https://www.example.com/',
  //     description: 'Example link',
  //   });
  //   console.log('Created Link:', createdLink);
}

main().catch(console.error);
