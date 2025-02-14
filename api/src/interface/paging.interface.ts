export interface PaginateResult<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalDocuments: number;
  results: T[];
  currentItemCount: number;
}

export interface IPaging {
  page: number;
  limit: number;
}

interface TPageData {
  total: number;
}

export interface IPagedReturn<DATA = unknown> {
  data: DATA;
  pageData: TPageData;
}
