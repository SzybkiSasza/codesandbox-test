import * as React from 'react';

import { PaginationItemProps } from './PaginationItemProps';

import './PaginationItem.css';

/**
 * Helper to prepare class for item
 */
const getItemClass = function(pageNumber?: number) {
  return (
    'pagination-item__button' +
    (typeof pageNumber !== 'number' ? ' pagination-item__button--disabled' : '')
  );
};

/**
 * Checks click conditions and runs click handler, if possible
 */
const handleClick = function(
  evt: React.MouseEvent,
  pageNumber?: number,
  onClick?: PaginationItemProps['onClick'],
) {
  typeof pageNumber === 'number' && onClick && onClick(pageNumber, evt);
};

/**
 * I preferred to separate this into standalone component, to save on repeated code in Pagination
 * Simple as it is - styling + event processing
 */
export const PaginationItem = (props: PaginationItemProps) => (
  <li className="pagination-item">
    <a
      className={getItemClass(props.pageNumber)}
      onClick={(evt: React.MouseEvent) =>
        handleClick(evt, props.pageNumber, props.onClick)
      }>
      {props.children}
    </a>
  </li>
);
