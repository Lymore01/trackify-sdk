import { isTrackifyError, TrackifyError } from '../lib/errors';
import { Fetch, get, post, put } from '../lib/fetch';
import { App } from '../lib/types';

export interface AppResponse {
  data: App | App[] | null;
  error: null | TrackifyError;
}

export class TrackifyAppApi {
  protected config: { key: string; url: string };
  protected fetch: Fetch;
  private authHeaders: Record<string, string>;

  constructor(config: { key: string; url: string }) {
    this.config = {
      ...config,
    };
    this.fetch = fetch;
    this.authHeaders = {
      Authorization: `Bearer ${this.config.key}`,
      'x-api-key': this.config.key,
    };
  }

  async listApps(): Promise<AppResponse> {
    try {
      const data = await get(this.fetch, `${this.config.url}/application`, {
        headers: this.authHeaders,
      });
      return {
        data,
        error: null,
      };
    } catch (error) {
      if (isTrackifyError(error)) {
        return {
          data: null,
          error: error as unknown as TrackifyError,
        };
      }
      throw error;
    }
  }

  async getApp(id: string) {
    try {
      const data = await get(
        this.fetch,
        `${this.config.url}/application/${id}`,
        {
          headers: this.authHeaders,
        },
      );
      return {
        data,
        error: null,
      };
    } catch (error) {
      if (isTrackifyError(error)) {
        return {
          data: null,
          error: error,
        };
      }
      throw error;
    }
  }

  async createApp(name: string): Promise<AppResponse> {
    try {
      const data = await post(
        this.fetch,
        this.config.url,
        {
          name,
        },
        {
          headers: this.authHeaders,
        },
      );
      return {
        data,
        error: null,
      };
    } catch (error) {
      if (isTrackifyError(error)) {
        return {
          data: null,
          error: error as unknown as TrackifyError,
        };
      }
      throw error;
    }
  }

  async updateApp(
    id: string,
    payload: {
      name: string;
    },
  ): Promise<AppResponse> {
    try {
      const data = await put(
        this.fetch,
        `${this.config.url}/application/${id}`,
        payload,
        {
          headers: this.authHeaders,
        },
      );
      return {
        data,
        error: null,
      };
    } catch (error) {
      if (isTrackifyError(error)) {
        return {
          data: null,
          error: error as unknown as TrackifyError,
        };
      }
      throw error;
    }
  }
}
