import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Pagination } from './Pagination';
import { PaginationPropsType } from './PaginationPropsType';

const buildProps = (overrides?: PaginationPropsType): PaginationPropsType => {
  return Object.assign(
    {},
    {
      currentPage: 3,
      totalPages: 11,
      onPageChange: jest.fn(),
    },
    overrides,
  );
};

describe('PaginationItem', () => {
  let props: PaginationPropsType;
  let wrapper: ReactWrapper;

  beforeEach(() => {
    props = buildProps();
    wrapper = mount(
      <Pagination
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
      />,
    );
  });

  describe('Basic rendering', () => {
    it('should be a defined component', () => {
      expect(Pagination).toBeDefined();
    });

    it('should render properly', () => {
      expect(wrapper.find('.pagination').length).toEqual(1);
    });

    it('should render full bar', () => {
      expect(wrapper.find('.pagination-item').length).toEqual(9);
    });

    it('should render only three items and two chevrons', () => {
      const newProps: PaginationPropsType = Object.assign({}, props, {
        totalPages: 3,
        currentPage: 1,
      });

      // @ts-ignore
      wrapper.setProps(newProps);
      expect(wrapper.find('.pagination-item').length).toEqual(5);
      expect(wrapper.find('.pagination__icon').length).toEqual(2);
      expect(wrapper.find('.pagination__number').length).toEqual(3);
    });
  });

  describe('Optional elements', () => {
    it('should hide chevrons', () => {
      expect(wrapper.find('.pagination__icon').length).toEqual(4);

      const newProps: PaginationPropsType = Object.assign({}, props, {
        hideChevrons: true,
      });
      // @ts-ignore
      wrapper.setProps(newProps);
      expect(wrapper.find('.pagination__icon').length).toEqual(2);
    });

    it('should hide "more" options', () => {
      expect(wrapper.find('.pagination__icon').length).toEqual(4);
      expect(wrapper.find('.pagination__number').length).toEqual(5);

      const newProps: PaginationPropsType = Object.assign({}, props, {
        hideLastPages: true,
      });
      // @ts-ignore
      wrapper.setProps(newProps);
      expect(wrapper.find('.pagination__icon').length).toEqual(2);
      expect(wrapper.find('.pagination__number').length).toEqual(3);
    });
  });

  describe('Navigation states', () => {
    it('should render items to the right of selected page', () => {
      const newProps: PaginationPropsType = Object.assign({}, props, {
        totalPages: 10,
        currentPage: 1,
      });
      // @ts-ignore
      wrapper.setProps(newProps);

      // Three icons to right
      expect(wrapper.find('.pagination__icon').length).toEqual(3);

      // Three base numbers + one last page
      const numbers = wrapper
        .find('.pagination__number')
        .reduce((memo, wrapper) => memo + ',' + wrapper.text(), '');
      expect(numbers).toEqual(',1,2,3,10');
    });

    it('should render items to the left of selected page', () => {
      const newProps: PaginationPropsType = Object.assign({}, props, {
        totalPages: 10,
        currentPage: 9,
      });
      // @ts-ignore
      wrapper.setProps(newProps);

      // Three icons to right
      expect(wrapper.find('.pagination__icon').length).toEqual(3);

      // First page + three last numbers
      const numbers = wrapper
        .find('.pagination__number')
        .reduce((memo, wrapper) => memo + ',' + wrapper.text(), '');
      expect(numbers).toEqual(',1,8,9,10');
    });

    it('should disable chevron when last page is displayed', () => {
      const newProps: PaginationPropsType = Object.assign({}, props, {
        totalPages: 10,
        currentPage: 9,
      });
      // @ts-ignore
      wrapper.setProps(newProps);

      // Three icons to right
      expect(
        wrapper
          .find('.pagination-item__button')
          .last()
          .prop('className'),
      ).toEqual('pagination-item__button pagination-item__button--disabled');
    });
  });

  describe('Navigating', () => {
    it('should jump to the next page on chevron right', () => {
      expect(props.onPageChange).not.toHaveBeenCalled();
      wrapper.find('.pagination-item__button').last().simulate('click');

      expect(props.onPageChange).toHaveBeenCalledWith(4);
    });

    it('should jump to the last page on last number click', () => {
      expect(props.onPageChange).not.toHaveBeenCalled();
      wrapper.find('.pagination-item__button .pagination__number').last().simulate('click');

      expect(props.onPageChange).toHaveBeenCalledWith(10);
    });

    it('should jump to the first page on first number click', () => {
      expect(props.onPageChange).not.toHaveBeenCalled();
      wrapper.find('.pagination-item__button .pagination__number').first().simulate('click');

      expect(props.onPageChange).toHaveBeenCalledWith(0);
    });

    it('should jump to the previous page on chevron left', () => {
      expect(props.onPageChange).not.toHaveBeenCalled();
      wrapper.find('.pagination-item__button .pagination__icon').first().simulate('click');

      expect(props.onPageChange).toHaveBeenCalledWith(2);
    });
  });
});
