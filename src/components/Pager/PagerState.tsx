import { ApiItemType } from '../../api/ApiItemType';

export type PagerState = {
  currentPage: number;
  items: ApiItemType[];
  loading: boolean;
  totalPages: number;
};
