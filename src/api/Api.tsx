import { ApiItem } from './ApiItem';

const [MIN_TIME, MAX_TIME] = [1000, 5000];

// Small helper to delay loading items just a bit
const promiseDelay = () => {
  const promiseTime = Math.floor(Math.random() * (MAX_TIME - MIN_TIME));
  return new Promise(resolve => setTimeout(() => resolve(), promiseTime));
};

/**
 * This function is deliberately kept simple, without error handling, just as a POC
 * I had to add skipDelay for tests, as CodeSandbox does not support Jest Timers
 */
export const fetchItems = async (skipDelay = false): Promise<ApiItem[]> => {
  await promiseDelay();

  const response = await fetch('data.json', {
    headers: {
      'content-type': 'application/json',
    },
  });

  return response.json();
};
