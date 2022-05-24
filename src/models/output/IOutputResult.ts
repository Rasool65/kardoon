export interface IOutputResult<T extends object> {
  data: T;
  message: string;
  succeeded: boolean;
}
