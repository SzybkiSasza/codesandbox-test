import { MouseEvent, ReactNode } from 'react';

export type PaginationItemPropsType = {
  children: ReactNode;
  onClick?: (pageNumber: number, event: MouseEvent) => void;
  pageNumber?: number;
};
