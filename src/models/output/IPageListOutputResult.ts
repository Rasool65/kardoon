export interface IPageListOutputResult<T extends object> {
  data: T;
  message: string;
  succeeded: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalSize: number;
}
