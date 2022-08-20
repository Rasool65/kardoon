import * as yup from 'yup';

export interface ITechnicianActionModel {
  id?: number;
  technicianId?: number;
  price: number;
  action: IAction;
  count: number;
  serviceTypeId: IService;
  description: string;
}

export const AddTechnicianActionModelSchema: yup.SchemaOf<ITechnicianActionModel> = yup.object({
  id: yup.number(), //RequestDetailID
  serviceTypeId: yup
    .object({
      value: yup.number().required('انتخاب نوع خدمت اجباریست'),
      label: yup.string().required('انتخاب نوع خدمت اجباریست'),
    })
    .required('انتخاب نوع خدمت اجباریست'),
  technicianId: yup.number(),
  price: yup.number().required('مبلغ اجباریست'),
  count: yup.number().required('تعداد اجباریست'),
  description: yup.string().required('شرح کار اجباریست'),
  action: yup
    .object({
      value: yup.number().required('انتخاب عنوان خدمت اجباریست'),
      label: yup.string().required('انتخاب عنوان خدمت اجباریست'),
    })
    .required('انتخاب عنوان خدمت اجباریست'), //ActionTitle id
});
interface IAction {
  value: number;
  label: string;
}
interface IService {
  value: number;
  label: string;
}
