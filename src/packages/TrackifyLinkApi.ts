import { isTrackifyError, TrackifyError } from '../lib/errors';
import { Fetch, get, post, put, remove } from '../lib/fetch';
import { Link } from '../lib/types';

export interface LinkResponse {
  data: {
    success: boolean;
    message: string;
    data?: Link[] | null;
  } | null;
  error: null | TrackifyError;
}

export class TrackifyLinkApi {
  public id: string;
  public url: string;
  public key: string;
  public fetch: Fetch;
  private authHeaders: Record<string, string>;

  constructor(
    id: string,
    url: string,
    key: string,
    fetch: Fetch = globalThis.fetch,
  ) {
    this.id = id;
    this.url = url;
    this.key = key;
    this.fetch = fetch;
    this.authHeaders = {
      Authorization: `Bearer ${this.key}`,
      'x-api-key': this.key,
    };
  }

  async createLink({
    original,
    description,
  }: Pick<Link, 'original' | 'description'>): Promise<LinkResponse> {
    try {
      let payload = {
        originalUrl: original,
        description,
        appId: this.id,
      };
      const data = await post(this.fetch, `${this.url}/url`, payload, {
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

  async updateLink(
    id: string,
    payload: {
      originalUrl?: string;
      description?: string;
    },
  ): Promise<LinkResponse> {
    try {
      const data = await put(this.fetch, `${this.url}/url/${id}`, payload, {
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

  async getLink(shortId: string): Promise<LinkResponse> {
    try {
      const data = await get(this.fetch, `${this.url}/url?shortId=${shortId}`, {
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

  async getLinks(): Promise<LinkResponse> {
    try {
      const data = await get(this.fetch, `${this.url}/url?appId=${this.id}`, {
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

  async deleteLink(id: string): Promise<LinkResponse> {
    try {
      const data = await remove(this.fetch, `${this.url}/url/${id}`, {
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
}
