import { createClient } from '../src/index';
import { TrackifyLinkApi } from '../src/packages/TrackifyLinkApi';
import { TrackifyClient } from '../src/TrackifyClient';

const KEY = 'some.dummy.api.key';
const URL = 'https://fake.trackify.com';

const trackify = createClient(KEY, URL);

const mockApps = [
  { id: 'app123', name: 'myApp' },
  { id: 'app456', name: 'anotherApp' },
];

test('The instance should be an instance of TrackifyClient', () => {
  expect(trackify).toBeDefined();
  expect(trackify).toBeInstanceOf(TrackifyClient);
});

test('it should throw an Error if invalid params/options are provided', () => {
  expect(() => createClient('', URL)).toThrow('TrackifyKey is required');
  expect(() => createClient(KEY, '')).toThrow('TrackifyUrl is required');
});

describe('TrackifyClient.from()', () => {
  let client: TrackifyClient;

  beforeEach(() => {
    client = new TrackifyClient({
      key: KEY,
      url: URL,
    });

    // stub
    jest.spyOn(client, 'listApps').mockResolvedValue({
      data: {
        success: true,
        message: 'Apps retrieved successfully',
        data: mockApps,
      },
      error: null,
    });
  });

  it('should return a TrackifyLinkApi instance if app is found', async () => {
    const linkApi = await client.from('myApp');
    console.log('link: ', linkApi);
    expect(linkApi).toBeInstanceOf(TrackifyLinkApi);
    expect((linkApi as TrackifyLinkApi).id).toBe('app123');
  });

  it('should throw if app is not found', async () => {
    await expect(client.from('unknownApp')).rejects.toThrow(
      'App with name "unknownApp" not found',
    );
  });

  it('should throw if listApps returns null data', async () => {
    (client.listApps as jest.Mock).mockResolvedValueOnce({
      data: null,
      error: null,
    });

    await expect(client.from('myApp')).rejects.toThrow('Error fetching');
  });
});
