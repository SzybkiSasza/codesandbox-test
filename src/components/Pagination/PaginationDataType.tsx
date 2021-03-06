export type Page = {
  shouldShow: boolean;
  pageNumber?: number;
  uiPageNumber?: number;
};

export type PaginationDataType = {
  chevronLeft: Page;
  moreLeft: Page;
  mainPages: Page[];
  moreRight: Page;
  chevronRight: Page;
};
