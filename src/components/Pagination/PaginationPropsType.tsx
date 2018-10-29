export type PaginationPropsType = {
  // Current page. Note that we enumerate from 1 (for consistency with display)!!!
  currentPage: number;

  // Optional pagination size. Will make pagination longer.
  paginationSize?: number;

  // Optional flag to hide page chevrons/arrows
  hideChevrons?: boolean;

  // Optional flag to hide last pages view (with dots)
  hideLastPages?: boolean;

  // Handler for page changes. Emits new page number
  onPageChange: (page: number) => void;

  // Total pages available for pagination.
  totalPages: number;
};
