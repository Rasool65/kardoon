import * as yup from 'yup';

export interface ITechnicianActionModel {
  id?: number;
  technicianId?: number;
  price: number;
  action: IAction;
  count: number;
  serviceTypeId: IService;
  description: string;
  sourceCost: ISourceCost;
  // discountAmount?: string;
}

export const AddTechnicianActionModelSchema: yup.SchemaOf<ITechnicianActionModel> = yup.object({
  id: yup.number(), //RequestDetailID
  serviceTypeId: yup.object({
    value: yup.number().required('انتخاب نوع خدمت اجباریست'),
    label: yup.string().required('انتخاب نوع خدمت اجباریست'),
  }),
  technicianId: yup.number(),
  price: yup.number().required('مقدار هزینه اجباریست').min(1, 'مبلغ نمی تواند صفر باشد '),
  count: yup.number().required('تعداد اجباریست').min(1, 'تعداد نمی تواند کمتر از یک باشد '),
  description: yup.string().required('توضیحات شرح اقدام اجباریست'),
  action: yup.object({
    price: yup.number().nullable(),
    value: yup.number().required('انتخاب گروه خدمات اجباریست'),
    label: yup.string().required('انتخاب گروه خدمات اجباریست'),
  }),
  sourceCost: yup.object({
    value: yup.number().required('انتخاب منبع هزینه اجباریست'),
    label: yup.string().required('انتخاب منبع هزینه اجباریست'),
  }),
  // discountAmount: yup.string(),
});
interface IAction {
  price: number | null | undefined;
  value: number;
  label: string;
}
interface IService {
  value: number;
  label: string;
}
export interface ISourceCost {
  value: number;
  label: string;
}
