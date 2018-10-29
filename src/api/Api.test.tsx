import { fetchItems } from './Api';

describe('API', () => {
  it('should be a defined function', () => {
    expect(fetchItems).toBeInstanceOf(Function);
  });

  it('should fetch items', async () => {});
});
