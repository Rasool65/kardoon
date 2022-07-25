import { FunctionComponent, useEffect } from 'react';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { CustomFunctions } from '@src/utils/custom';

const OrderDetailReport: FunctionComponent<IPageProps> = () => {
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <div id="page">
      <div id="technician" className="my-4">
        <h5>نام تکنسین :</h5>
        <div className="m-2">
          <span className="font-15 font-700 color-theme">حسین کعبی</span>
          <span className="float-end font-15 font-700 color-theme"></span>
        </div>
        <div className="m-2">
          <span className="font-15 font-700 color-theme">ناصر قاجاری</span>
          <span className="float-end"></span>
        </div>
      </div>
      <div id="technician" className="my-4">
        <h5>جزئیات سفارش :</h5>
        <div className="m-2">
          <span className="font-15 font-700 color-theme">برند: سامسونگ</span>
        </div>
        <div className="m-2">
          <span className="font-15 font-700 color-theme">ظرفیت: 32 فوت</span>
        </div>
      </div>
      <div className="page-content">
        <div className="card card-style">
          <div className="content">
            <div className="d-flex">
              <div>
                <h1>شرح اقدامات انجام شده</h1>
                <p className="font-600 color-highlight mt-n3">جزییات فاکتور</p>
              </div>
              <div className="ms-auto">
                <img src="images/preload-logo.png" width="40" />
              </div>
            </div>
            <div className="divider mt-3 mb-3"></div>
            <div className="row mb-0">
              <div className="col-4">
                <p className="color-theme font-700">تاریخ</p>
              </div>
              <div className="col-8">
                <p className="font-400">15 فروردین 1401 </p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">شماره درخواست</p>
              </div>
              <div className="col-8">
                <p className="font-400">134562463</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">وضعیت سفارش</p>
              </div>
              <div className="col-8">
                <p className="font-400">پرداخت شده</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-style">
          <div className="content">
            {/* title */}
            <h4 className="mb-n1">ایاب و ذهاب</h4>
            <p />
            <div className="row mb-0">
              <div className="col-4">
                <p className="color-theme font-700">گروه خدمات</p>
              </div>
              <div className="col-8">
                <p className="font-400">عمومی</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">منبع هزینه</p>
              </div>
              <div className="col-8">
                <p className="font-400">گارانتی</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">تعداد</p>
              </div>
              <div className="col-8">
                <p className="font-400">1</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">قیمت واحد</p>
              </div>
              <div className="col-8">
                <p className="font-400">50،000</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">تخفیف</p>
              </div>
              <div className="col-8">
                <p className="font-400">1،500</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">مبلغ پس از تخفیف</p>
              </div>
              <div className="col-8">
                <p className="font-400">45،000</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">مالیات و عوارض</p>
              </div>
              <div className="col-8">
                <p className="font-400">1،250</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">جمع مبلغ با احتساب مالیات</p>
              </div>
              <div className="col-8">
                <p className="font-400">12،500</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">وضعیت پرداخت</p>
              </div>
              <div className="col-8">
                <p className="font-400" style={{ color: 'green' }}>
                  تسویه شده
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-style">
          <div className="content">
            {/* title */}
            <h4 className="mb-n1">نصب تلویزیون</h4>
            <p />
            <div className="row mb-0">
              <div className="col-4">
                <p className="color-theme font-700">گروه خدمات</p>
              </div>
              <div className="col-8">
                <p className="font-400">نصب</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">منبع هزینه</p>
              </div>
              <div className="col-8">
                <p className="font-400">آزاد</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">تعداد</p>
              </div>
              <div className="col-8">
                <p className="font-400">5</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">قیمت واحد</p>
              </div>
              <div className="col-8">
                <p className="font-400">45،000</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">تخفیف</p>
              </div>
              <div className="col-8">
                <p className="font-400">---</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">مبلغ پس از تخفیف</p>
              </div>
              <div className="col-8">
                <p className="font-400">45،000</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">مالیات و عوارض</p>
              </div>
              <div className="col-8">
                <p className="font-400">---</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">جمع مبلغ با احتساب مالیات</p>
              </div>
              <div className="col-8">
                <p className="font-400">---</p>
              </div>

              <div className="col-4">
                <p className="color-theme font-700">وضعیت پرداخت</p>
              </div>
              <div className="col-8">
                <p className="font-400" style={{ color: 'red' }}>
                  تسویه نشده
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <h4 className="mb-n1">Description</h4>
            <p>Products and totals will go here.</p>

            <div className="row">
              <div className="col-6">
                <p className="color-theme font-15 font-800">Product</p>
              </div>
              <div className="col-2">
                <p className="color-theme font-15 font-800 text-center">Qty</p>
              </div>
              <div className="col-4">
                <p className="color-theme font-15 font-800 text-end">Amount</p>
              </div>

              <div className="col-12 mb-2 mt-2"></div>

              <div className="col-6">
                <p className="line-height-s">Azures Mobile and PWA Template</p>
              </div>
              <div className="col-2">
                <p className="line-height-s text-center">1</p>
              </div>
              <div className="col-4">
                <p className="line-height-s text-end">$23.99</p>
              </div>

              <div className="col-12 mb-3"></div>

              <div className="col-6">
                <p className="line-height-s">StickyMobile and PWA Template</p>
              </div>
              <div className="col-2">
                <p className="line-height-s text-center">1</p>
              </div>
              <div className="col-4">
                <p className="line-height-s text-end">$23.99</p>
              </div>
              <div className="col-12 mb-3"></div>

              <div className="col-6">
                <p className="line-height-s">Customization Services billed at $50/ hour</p>
              </div>
              <div className="col-2">
                <p className="line-height-s text-center">10</p>
              </div>
              <div className="col-4">
                <p className="line-height-s text-end">$500.00</p>
              </div>

              <div className="col-12">
                <div className="divider mt-4"></div>
              </div>
              <div className="col-6">
                <p className="font-800 font-15 color-theme">Invoice Total</p>
              </div>
              <div className="col-6">
                <p className="font-800 font-15 color-theme text-end">$548.00 </p>
              </div>
              <div className="col-6">
                <p className="font-800 font-15 color-theme">Invoice Status</p>
              </div>
              <div className="col-6">
                <p className="font-800 font-15 color-green-dark text-end">Paid in Full</p>
              </div>
            </div>

            <div className="divider"></div>

            <a href="#" className="btn btn-full bg-highlight btn-m text-uppercase font-700 rounded-s shadow-xl">
              Download PDF
            </a>
          </div>
        </div>

        <a href="#" className="btn btn-full btn-margins  bg-highlight btn-m text-uppercase font-700 rounded-s shadow-xl">
          پرداخت آنلاین
        </a>

        <div className="footer" data-menu-load="menu-footer.html"></div>
      </div>
    </div>
  );
};

export default OrderDetailReport;
