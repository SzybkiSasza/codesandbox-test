import * as React from 'react';
import { shallow } from 'enzyme';

import { Spinner} from './Spinner';

describe('Spinner', () => {
  it('should be a defined component', () => {
    expect(Spinner).toBeDefined();
  });

  it('should render SVG wrapper', () => {
    const wrapper = shallow(<Spinner/>);
    expect(wrapper.find('.spinner')).toHaveLength(1);
  });

  it('should render SVG properly', () => {
    const wrapper = shallow(<Spinner/>);
    expect(wrapper.find('svg')).toHaveLength(1);
  });
});
