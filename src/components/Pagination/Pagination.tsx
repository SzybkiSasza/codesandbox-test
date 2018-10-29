import * as React from 'react';

import { PaginationItem } from '../PaginationItem/PaginationItem';

import { Page, PaginationDataType } from './PaginationDataType';
import { PaginationPropsType } from './PaginationPropsType';
import './Pagination.css';

/**
 * This component is deliberately dumb, as it represents only paging state and allows for changing the state
 * It'd be simpler if it was written as arrow function, but I wanted to add some helper getters :)
 **/
export class Pagination extends React.Component<PaginationPropsType, {}> {
  constructor(props: PaginationPropsType) {
    super(props);
  }

  /**
   * I prefer to keep UI as far from data as possible
   * Hence, I created this helper to prepare data object that can be easily used in render()
   */
  buildPaginationData(): PaginationDataType {
    const chevronLeft: Page = {
      pageNumber:
        this.props.currentPage > 0 ? this.props.currentPage - 1 : undefined,
      shouldShow: !this.props.hideChevrons,
    };

    const moreLeft: Page = {
      pageNumber: 0,
      shouldShow: this.shouldShowFirstPage,
      uiPageNumber: this.mapToUIPage(0),
    };

    const mainPages = this.visiblePages.map(
      pageNumber =>
        ({
          pageNumber,
          shouldShow: true,
          uiPageNumber: this.mapToUIPage(pageNumber),
        } as Page),
    );

    const moreRight: Page = {
      pageNumber: this.props.totalPages - 1,
      shouldShow: this.shouldShowLastPage,
      uiPageNumber: this.mapToUIPage(this.props.totalPages - 1),
    };

    const chevronRight: Page = {
      pageNumber:
        this.props.currentPage < this.props.totalPages - 1
          ? this.props.currentPage + 1
          : undefined,
      shouldShow: !this.props.hideChevrons,
    };

    return {
      chevronLeft,
      moreLeft,
      mainPages,
      moreRight,
      chevronRight,
    };
  }

  mapToUIPage(pageNumber: number) {
    return pageNumber + 1;
  }

  onClick = (number: number, event: React.MouseEvent) => {
    event.preventDefault();

    if (this.props.currentPage !== number) {
      this.props.onPageChange && this.props.onPageChange(number);
    }
  };

  get shouldShowFirstPage(): boolean {
    return !this.props.hideLastPages && this.props.currentPage > 1;
  }

  get shouldShowLastPage(): boolean {
    return (
      !this.props.hideLastPages &&
      this.props.totalPages > 2 &&
      this.props.currentPage < this.props.totalPages - 2
    );
  }

  /**
   * We use 0-indexed positions everywhere, but map to 1-indexed for page display
   */
  get visiblePages(): Array<number> {
    const paginationSize = this.props.paginationSize || 3;

    let currentPageOffset = Math.floor(paginationSize / 2);
    if (this.props.currentPage < 1) {
      currentPageOffset--;
    } else if (this.props.currentPage === this.props.totalPages - 1) {
      currentPageOffset++;
    }

    // Default to current page display if incorrect current page was passed - fallback
    if (
      this.props.currentPage < 0 ||
      this.props.currentPage >= this.props.totalPages
    ) {
      return [this.props.currentPage];
    }

    return Array(paginationSize)
      .fill(1)
      .map(
        (elt: number, index: number) =>
          index - currentPageOffset + this.props.currentPage,
      )
      .filter((element: number) => {
        return element >= 0 && element < this.props.totalPages;
      });
  }

  render() {
    const paginationData = this.buildPaginationData();

    return (
      <ul className="pagination">
        {paginationData.chevronLeft.shouldShow && (
          <PaginationItem
            onClick={this.onClick}
            pageNumber={paginationData.chevronLeft.pageNumber}>
            <i className="material-icons pagination__icon">chevron_left</i>
          </PaginationItem>
        )}

        {paginationData.moreLeft.shouldShow && (
          <PaginationItem
            onClick={this.onClick}
            pageNumber={paginationData.moreLeft.pageNumber}>
            <span className="pagination__number">
              {paginationData.moreLeft.uiPageNumber}
            </span>
          </PaginationItem>
        )}
        {paginationData.moreLeft.shouldShow && (
          <PaginationItem>
            <i className="material-icons pagination__icon">more_horiz</i>
          </PaginationItem>
        )}

        {paginationData.mainPages.map((page: Page) => (
          <PaginationItem
            key={page.pageNumber}
            onClick={this.onClick}
            pageNumber={page.pageNumber}>
            <span
              className={
                'pagination__number' +
                (page.pageNumber === this.props.currentPage
                  ? ' pagination__number--current'
                  : '')
              }>
              {page.uiPageNumber}
            </span>
          </PaginationItem>
        ))}

        {paginationData.moreRight.shouldShow && (
          <PaginationItem>
            <i className="material-icons pagination__icon">more_horiz</i>
          </PaginationItem>
        )}
        {paginationData.moreRight.shouldShow && (
          <PaginationItem
            onClick={this.onClick}
            pageNumber={paginationData.moreRight.pageNumber}>
            <span className="pagination__number">
              {paginationData.moreRight.uiPageNumber}
            </span>
          </PaginationItem>
        )}

        {paginationData.chevronRight.shouldShow && (
          <PaginationItem
            onClick={this.onClick}
            pageNumber={paginationData.chevronRight.pageNumber}>
            <i className="material-icons pagination__icon">chevron_right</i>
          </PaginationItem>
        )}
      </ul>
    );
  }
}
