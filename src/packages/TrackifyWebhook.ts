import crypto from 'crypto';
import { WebhookEvent } from '../lib/types';
import { MissingHeadersError, VerificationFailedError } from '../lib/errors';

export interface WebhookOptions {
  format?: 'raw';
}

// todo: add other webhook headers ie. id, timestamp
export interface WebhookRequiredHeaders {
  'x-webhook-signature': string;
}

export default class TrackifyWebhook {
  private secret: string | Uint8Array;
  private options?: WebhookOptions;

  constructor(secret: string | Uint8Array, options?: WebhookOptions) {
    this.secret = secret;
    this.options = options;
  }

  private generateHMAC(payload: string | Buffer): string {
    return crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
  }

  verify(
    payload: string | Buffer,
    headers_: WebhookRequiredHeaders | Record<string, string>,
  ): WebhookEvent {
    const receivedSignature = headers_['x-webhook-signature'];

    if (!receivedSignature) {
      throw new MissingHeadersError("Missing 'webhook-signature' header.");
    }

    const generatedSignature = this.generateHMAC(payload);

    const receivedBuffer = Buffer.from(receivedSignature, 'hex');
    const generatedBuffer = Buffer.from(generatedSignature, 'hex');

    if (receivedBuffer.length !== generatedBuffer.length) {
      throw new VerificationFailedError('Could not verify webhook');
    }

    const isValid: boolean = crypto.timingSafeEqual(
      receivedBuffer,
      generatedBuffer,
    );

    if (!isValid) {
      console.log(generatedSignature);
      throw new VerificationFailedError('Could not verify webhook');
    }

    const evt: WebhookEvent = JSON.parse(payload as string);

    return evt;
  }

  static verifyPayload(
    secret: string,
    payload: string | Buffer,
    headers: WebhookRequiredHeaders | Record<string, string>,
  ): WebhookEvent {
    return new TrackifyWebhook(secret).verify(payload, headers);
  }
}
