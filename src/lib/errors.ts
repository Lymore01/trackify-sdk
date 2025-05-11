export class TrackifyError extends Error {
  protected __isTrackifyError = true;
  constructor(message: string) {
    super(message);
    this.name = 'TrackifyError';
  }
}

export class TrackifyApiError extends TrackifyError {
  status: number;
  statusCode: string;

  constructor(message: string, status: number, statusCode: string) {
    super(message);
    this.name = 'TrackifyApiError';
    this.status = status;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class TrackifyUnknownError extends TrackifyError {
  originalError: unknown;

  constructor(message: string, originalError: unknown) {
    super(message);
    this.name = 'TrackifyUnknownError';
    this.originalError = originalError;
  }
}

export const isTrackifyError = (error: unknown) => {
  return (
    typeof error === 'object' && error !== null && '__isStorageError' in error
  );
};
