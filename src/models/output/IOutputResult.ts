export interface IOutputResult<T extends object> {
  data: T;
  message: string;
  statusCode: string;
  isSuccess: boolean;
}
