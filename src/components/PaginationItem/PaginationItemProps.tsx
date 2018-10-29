import { MouseEvent, ReactNode } from 'react';

export type PaginationItemProps = {
  children: ReactNode;
  onClick?: (pageNumber: number, event: MouseEvent) => void;
  pageNumber?: number;
};
