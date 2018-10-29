import { fetchItems } from './Api';

describe('API', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should be a defined function', () => {
    expect(fetchItems).toBeInstanceOf(Function);
  });

  it('should fetch items', async () => {
    const promise = fetchItems();

    jest.runAllTimers();

    const results = await promise;

    console.log(results);
  });
});
