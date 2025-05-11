import { TrackifyError } from './lib/errors';
import { TrackifyAppApi } from './packages/TrackifyAppApi';
import { TrackifyLinkApi } from './packages/TrackifyLinkApi';

export class TrackifyClient extends TrackifyAppApi {
  constructor(config: { key: string; url: string }) {
    if (!config.key) {
      throw new Error('TrackifyKey is required');
    }

    if (!config.url) {
      throw new Error('TrackifyUrl is required');
    }

    super(config);
  }

  async from(name: string): Promise<TrackifyLinkApi> {
    const { data } = await this.listApps();
    if (!data) {
      throw new TrackifyError('Error fetching ');
    }
    const app = Array.isArray(data)
      ? data.find((app) => app.name === name)
      : data;
    if (!app) {
      throw new Error(`App with name "${name}" not found`);
    }

    return new TrackifyLinkApi(
      app.id,
      this.config.url,
      this.config.key,
      this.fetch,
    );
  }
}
