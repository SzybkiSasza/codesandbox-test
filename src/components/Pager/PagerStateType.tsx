import { ApiItemType } from '../../api/ApiItemType';

export type PagerStateType = {
  currentPage: number;
  items: ApiItemType[];
  loading: boolean;
  totalPages: number;
};
