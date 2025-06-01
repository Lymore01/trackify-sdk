import TrackifyWebhook from './packages/TrackifyWebhook';
import { TrackifyClient } from './TrackifyClient';

const createClient = (
  trackifyApiKey: string,
  trackifyUrl: string,
): TrackifyClient => {
  return new TrackifyClient({
    key: trackifyApiKey,
    url: trackifyUrl,
  });
};

export { createClient, TrackifyWebhook };
