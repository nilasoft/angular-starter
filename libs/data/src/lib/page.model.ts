export interface Pageable {

  size: number;

  page: number;

  sort: string;

}

export interface Page<T> {

  content: T[];

  totalPages: number;

  totalElements: number;

  numberOfElements: number;

  number: number;

  size: number;

  empty: boolean;

  first: boolean;

  last: boolean;

  sort: Sort;

  pageable: {

    sort: Sort;

    offset: number;

    pageNumber: number;

    pageSize: number;

    paged: boolean;

    unpaged: boolean;

  };

}

export interface Sort {

  sorted: boolean;

  unsorted: boolean;

  empty: boolean;

}
