// import IPageProps from '@src/configs/routerConfig/IPageProps';
// import { FunctionComponent } from 'react';
// import { Button } from 'reactstrap';
// import Buttons from 'react-multi-date-picker/components/button';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { URL_ORDER_DETAIL_REPORT } from '@src/configs/urls';

// const OrderDetail: FunctionComponent<IPageProps> = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="card card-style">
//         <div className="content">
//           <h4 className="my-4">
//             شماره درخواست
//             <span className="float-end">220706001</span>
//           </h4>
//           <span className="">تهران - شهران - کوچه اول - پلاک 1</span>
//           <span className="float-end">یکشنبه 1401/04/26 - عصر</span>
//         </div>

//         <div className="accordion" id="accordion-1">
//           <div className="mb-0">
//             <button
//               style={{ backgroundColor: 'blue' }}
//               className="btn accordion-btn no-effect color-theme"
//               data-bs-toggle="collapse"
//               data-bs-target="#collapse2"
//             >
//               <i className="fa fa-star color-yellow-dark me-2"></i>
//               تعمیر یخچال
//               <span className="float-end">معلق</span>
//               <i className="fa fa-chevron-down font-10 accordion-icon"></i>
//             </button>
//             <div id="collapse2" className="collapse" data-bs-parent="#accordion-1">
//               <div className="pt-1 pb-2 ps-3 pe-3 font-weight-bold">
//                 <section id="technician" className="my-4">
//                   <h5>نام تکنسین :</h5>
//                   <div className="m-2">
//                     <span className="font-15 font-700 color-theme">حسین کعبی</span>
//                     <span className="float-end font-15 font-700 color-theme"></span>
//                   </div>
//                   <div className="m-2">
//                     <span className="font-15 font-700 color-theme">ناصر قاجاری</span>
//                     <span className="float-end"></span>
//                   </div>
//                 </section>
//                 <section id="technician" className="my-4">
//                   <h5>جزئیات سفارش :</h5>
//                   <div className="m-2">
//                     <span className="font-15 font-700 color-theme">برند: سامسونگ</span>
//                   </div>
//                   <div className="m-2">
//                     <span className="font-15 font-700 color-theme">ظرفیت: 32 فوت</span>
//                   </div>
//                 </section>
//               </div>
//             </div>
//           </div>
//           <section id="paymentStatus" className="m-2 row">
//             <section>
//               <Button
//                 className="btn btn-info"
//                 onClick={() => {
//                   navigate(URL_ORDER_DETAIL_REPORT);
//                 }}
//               >
//                 شرح اقدامات انجام شده
//               </Button>
//               <span>تسویه نشده</span>
//               <Button className="btn btn-success float-end">پرداخت مبلغ</Button>
//             </section>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderDetail;
