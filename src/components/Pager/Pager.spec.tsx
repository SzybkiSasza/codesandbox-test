import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

// @ts-ignore
import * as dataJSON from '../../../public/data.json';
import { fetchItems } from '../../api/Api';
import { Pager } from './Pager';
import { PagerItem } from '../PagerItem/PagerItem';
import { ApiItemType } from '../../api/ApiItemType';
import { PagerStateType } from './PagerStateType';

jest.mock('../../api/Api', () => ({
  fetchItems: jest.fn(),
}));

describe('Pager', () => {
  let resolveCb: (data: any) => void;
  let wrapper: ReactWrapper;

  beforeEach( () => {
    jest.useFakeTimers();

    (fetchItems as any).mockImplementation(
      () =>
        new Promise(resolve => {
          resolveCb = resolve;
        }),
    );

    wrapper = mount(<Pager itemsPerPage={3} />);
  });

  it('should be a defined component', () => {
    expect(Pager).toBeDefined();
  });

  describe('Loading data', () => {
    it('should set "loading" state initially', () => {
      const state: PagerStateType = wrapper.state() as PagerStateType;
      expect(state.loading).toEqual(true);
      expect(state.items).toEqual([]);
    });

    it('should show preloader when loading', () => {
      expect(wrapper.find('.spinner').length).toEqual(1);
      expect(
        wrapper
          .find('h2')
          .last()
          .text(),
      ).toEqual('Fetching items...');
    });

    it('should set items once loaded', async () => {
      await resolveCb(dataJSON);

      // Wait one tick...
      await Promise.resolve();

      const state = wrapper.state() as PagerStateType;

      expect(state.items).toEqual(dataJSON);
      expect(state.loading).toEqual(false);
    });
  });

  describe('Paging', () => {
    it('should change page', async () => {
      await resolveCb(dataJSON);
      await Promise.resolve();
      wrapper.update();

      let state = wrapper.state() as PagerStateType;
      expect(state.currentPage).toEqual(0);

      wrapper.find('.pagination__icon').last().simulate('click');
      state = wrapper.state() as PagerStateType;

      expect(state.currentPage).toEqual(1);
    });

    it('should change displayed elements on page change', async () => {
      await resolveCb(dataJSON);
      await Promise.resolve();
      wrapper.update();

      let firstItem = wrapper.find(PagerItem).first();
      let props = firstItem.props() as { data: ApiItemType };
      expect(props.data.title).toEqual('Josephine Nixon');

      wrapper.find('.pagination__icon').last().simulate('click');

      firstItem = wrapper.find(PagerItem).first();
      props = firstItem.props() as { data: ApiItemType };

      expect(props.data.title).toEqual('Leta Koch');
    });
  });
});
