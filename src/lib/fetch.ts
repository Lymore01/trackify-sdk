import { DEFAULT_HEADERS } from './constants';
import { TrackifyApiError, TrackifyUnknownError } from './errors';
import { isPlainObject } from './helpers';

export type Fetch = typeof fetch;
export type RequestMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface RequestOptions {
  headers?: {
    [key: string]: string;
  };
  noResolveJson?: boolean;
}

export function _getErrorMessage(err?: any): string {
  return err.msg || err.message || err.error || JSON.stringify(err);
}

// TODO: add request parameters as params
export function _getRequestParams(
  method: RequestMethodType,
  options?: RequestOptions,
  body?: object,
) {
  const params: { [key: string]: any } = {
    method,
    headers: options?.headers || {},
  };

  if (!body || method === 'GET') {
    return params;
  }

  if (isPlainObject(body)) {
    params.headers = {
      ...DEFAULT_HEADERS,
      ...options?.headers,
    };
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }

  return { ...params };
}

async function handleError(error: unknown, reject: (reason?: any) => void) {
  if (error instanceof Response) {
    error
      .json()
      .then((err) => {
        const status = error.status || 500;
        const statusCode = err?.statusCode || status + '';
        reject(new TrackifyApiError(_getErrorMessage(err), status, statusCode));
      })
      .catch((err) => {
        reject(new TrackifyUnknownError(_getErrorMessage(err), err));
      });
  } else {
    reject(new TrackifyUnknownError(_getErrorMessage(error), error));
  }
}

export async function _handleRequest(
  fetcher: Fetch,
  method: RequestMethodType,
  url: string,
  options?: RequestOptions,
  body?: object,
): Promise<any> {
  return new Promise((resolve, reject) => {
    fetcher(url, _getRequestParams(method, options, body))
      .then((result) => {
        if (!result.ok) return result;
        if (options?.noResolveJson) return result;
        return result.json();
      })
      .then((data) => resolve(data))
      .catch((error) => handleError(error, reject));
  });
}

export async function get(
  fetcher: Fetch,
  url: string,
  options?: RequestOptions,
) {
  return _handleRequest(fetcher, 'GET', url, options);
}

export async function post(
  fetcher: Fetch,
  url: string,
  body: object,
  options?: RequestOptions,
) {
  return _handleRequest(fetcher, 'POST', url, options, body);
}

export async function remove(
  fetcher: Fetch,
  url: string,
  options?: RequestOptions,
) {
  return _handleRequest(fetcher, 'DELETE', url, options);
}

export async function put(
  fetcher: Fetch,
  url: string,
  body: object,
  options?: RequestOptions,
) {
  return _handleRequest(fetcher, 'PUT', url, options, body);
}
