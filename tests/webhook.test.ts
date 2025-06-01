import { TrackifyWebhook } from '../src';
import {
  VerificationFailedError,
  MissingHeadersError,
} from '../src/lib/errors';

const SECRET = 'test_secret';
const PAYLOAD = JSON.stringify({ foo: 'bar' });

function generateSignature(secret: string, payload: string) {
  const crypto = require('crypto');
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

describe('TrackifyWebhook', () => {
  it('should verify a valid payload and return the event', () => {
    const signature = generateSignature(SECRET, PAYLOAD);
    const event = TrackifyWebhook.verifyPayload(SECRET, PAYLOAD, {
      'x-webhook-signature': signature,
    });
    expect(event).toEqual({ foo: 'bar' });
  });

  it('should throw VerificationFailedError for invalid signature', () => {
    expect(() =>
      TrackifyWebhook.verifyPayload(SECRET, PAYLOAD, {
        'x-webhook-signature': 'invalidsignature',
      }),
    ).toThrow(VerificationFailedError);
  });

  it('should throw MissingHeadersError if signature header is missing', () => {
    expect(() => TrackifyWebhook.verifyPayload(SECRET, PAYLOAD, {})).toThrow(
      MissingHeadersError,
    );
  });

  it('should work with instance method as well', () => {
    const signature = generateSignature(SECRET, PAYLOAD);
    const webhook = new TrackifyWebhook(SECRET);
    const event = webhook.verify(PAYLOAD, { 'x-webhook-signature': signature });
    expect(event).toEqual({ foo: 'bar' });
  });

  it('should throw if payload is not valid JSON', () => {
    const signature = generateSignature(SECRET, 'not-json');
    expect(() =>
      TrackifyWebhook.verifyPayload(SECRET, 'not-json', {
        'x-webhook-signature': signature,
      }),
    ).toThrow();
  });
});
