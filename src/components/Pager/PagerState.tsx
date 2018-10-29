import { ApiItem } from '../../api/ApiItem';

export type PagerState = {
  currentPage: number;
  items: ApiItem[];
  loading: boolean;
  totalPages: number;
};
