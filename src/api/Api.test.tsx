import { fetchItems } from './Api';

const resultsMock = require('../../public/data.json');

describe('API', () => {
  // Could be done better by global mocks, but it's relatively OK here.
  let originalRandom: () => number;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    (fetch as any).resetMocks();
    Math.random = jest.fn();
  });

  afterAll(() => {
    Math.random = originalRandom;
  });

  it('should be a defined function', () => {
    expect(fetchItems).toBeInstanceOf(Function);
  });

  it('should fetch items after at least one second', async () => {
    Math.random = jest.fn(() => 0);

    (fetch as any).mockResponse(JSON.stringify(resultsMock));

    const promise = fetchItems();

    jest.runAllTimers();

    const results = await promise;

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toEqual(35);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), expect.any(Number));

    // Get the time to prove that it took at least one second
    const timeoutTime = (setTimeout as jest.Mocked<any>).mock.calls[0][1];
    expect(Math.random).toHaveBeenCalledTimes(1);
    expect(timeoutTime).toBeGreaterThanOrEqual(1000);
  });
});
