import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

configure({ adapter: new Adapter() });

import { App } from './index';

describe('App index', () => {
  it('should be a defined function', () => {
    expect(App).toBeInstanceOf(Function);
  });

  it('should render properly', () => {
    const instance = shallow(<App />);
    console.log(instance);
  });
});
