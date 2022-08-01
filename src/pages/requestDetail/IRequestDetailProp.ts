export interface IRequestDetailPageProp {
  handleClickNext?: any;
  handleClickPrevious?: any;
  handleSubmit?: any;
  isLoading?: boolean;
}

export interface IRequestDetailSecond {
  isUrgent: boolean;
  presenceDate?: string;
  presenceShift?: number;
  refkey?: number;
}
