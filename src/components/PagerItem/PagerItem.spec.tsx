import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { PagerItem } from './PagerItem';
import { ApiItemType } from '../../api/ApiItemType';

const apiItemMock: ApiItemType = {
  _id: 'abcDEF',
  date: new Date('Fri Aug 24 2001 08:59:44 GMT+0000 (UTC)'),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  title: 'John Kowalsky',
};

describe('PagerItem', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<PagerItem data={apiItemMock} />);
  });
  it('should render', () => {
    expect(wrapper.find('.pager-item').length).toEqual(1);
    expect(wrapper.text()).toEqual(
      'abcDEFJohn KowalskyFri, 24 Aug 2001 08:59:44 GMTLorem ipsum ' +
        'dolor sit amet, consectetur adipiscing elit',
    );
  });

  it('should render id in the back', () => {
    const background = wrapper.find('.pager-item__id');

    expect(background.length).toEqual(1);
    expect(background.find('svg > text').text()).toEqual('abcDEF');
  });

  it('should render name in front', () => {
    const title = wrapper.find('.pager-item__title');

    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('John Kowalsky');
  });

  it('should render date', () => {
    const date = wrapper.find('.pager-item__date');

    expect(date.length).toEqual(1);
    expect(date.text()).toEqual('Fri, 24 Aug 2001 08:59:44 GMT');
  });

  it('should render description', () => {
    const descr = wrapper.find('.pager-item__description');

    expect(descr.length).toEqual(1);
    expect(descr.text()).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    );
  });
});
