export interface IOrderDetailPageProp {
  handleClickNext?: any;
  handleClickPrevious?: any;
  handleSubmit?: any;
}
export interface ICameraModal {
  WebcamCapture?: any;
  WebcamStreamCapture?: any;
  capturMenuVisible?: boolean;
}

export interface IOrderDetailSecond {
  isUrgent: boolean;
  presenceDate?: string;
  presenceShift?: number;
  refkey?: number;
}
