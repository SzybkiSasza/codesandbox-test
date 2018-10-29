import * as React from 'react';
import { shallow } from 'enzyme';

import { PaginationItem } from './PaginationItem';

describe('PaginationItem', () => {
  it('should be a defined component', () => {
    expect(PaginationItem).toBeDefined();
  });

  it('should render list item', () => {
    const wrapper = shallow(
      <PaginationItem pageNumber={1}>TEST</PaginationItem>,
    );
    expect(wrapper.find('li.pagination-item')).toHaveLength(1);
  });

  it('should assign disabled class name if page number is missing', () => {
    const wrapper = shallow(
      <PaginationItem pageNumber={undefined}>TEST</PaginationItem>,
    );

    expect(wrapper.find('li.pagination-item > a').prop('className'))
      .toEqual('pagination-item__button pagination-item__button--disabled');
  });

  it('should render child inside', () => {
    const wrapper = shallow(
      <PaginationItem pageNumber={1}>TEST</PaginationItem>,
    );
    expect(wrapper.find('li.pagination-item').text()).toEqual('TEST');
  });

  it('should handle click event', () => {
    const clickHandler = jest.fn();

    const wrapper = shallow(
      <PaginationItem onClick={clickHandler} pageNumber={3}>TEST</PaginationItem>,
    );
    wrapper.find('li.pagination-item > a').simulate('click');

    expect(clickHandler).toHaveBeenCalledWith(3, undefined);
  });
});
