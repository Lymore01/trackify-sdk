import { TrackifyClient } from './TrackifyClient';

export const createClient = (
  trackifyApiKey: string,
  trackifyUrl: string,
): TrackifyClient => {
  return new TrackifyClient({
    key: trackifyApiKey,
    url: trackifyUrl,
  });
};
