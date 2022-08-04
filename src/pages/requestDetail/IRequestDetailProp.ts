export interface IRequestDetailPageProp {
  handleClickNextToFirst?: any;
  handleClickNextToSecond?: any;
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
