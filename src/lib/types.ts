export type App = {
  name: string;
  id: string;
};

export type Link = {
  id: string;
  shortId: string;
  original: string;
  clicks: any[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

// webhooks
export interface LinkJSON {
  shortId: string;
  ip: string;
  country: string | 'unknown';
  userAgent: string | 'unknown';
}

type Webhook<EvtType, Data> = {
  type: EvtType;
  data: Data;
};

export type LinkWebhookEvent = Webhook<
  'link_clicked' | 'link_deleted' | 'link_updated' | 'link_created',
  LinkJSON
>;
export type WebhookEvent = LinkWebhookEvent;
export type WebhookEventType = WebhookEvent['type'];
