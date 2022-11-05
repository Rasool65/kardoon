import {
  APIURL_GET_TECHNICIAN_PROFILE,
  APIURL_GET_TRANSACTION,
  APIURL_POST_WALLET_PAYMENT,
  APIURL_POST_WALLET_WITH_DRAW,
} from '@src/configs/apiConfig/apiUrls';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ITechnicianProfileResultModel } from '@src/models/output/technician/ITechnicianProfileResultModel';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { FunctionComponent, useState, useEffect } from 'react';
import './style.css';
import { useLocation, useParams } from 'react-router-dom';
import { Spinner, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { ITransactionResultModel } from '@src/models/output/technician/ITransactionResultModel';
import { DateHelper } from './../../utils/dateHelper';
import { init_template } from './template';
import MainMenuModal from '@src/layout/MainMenuModal';
import Header from '../../layout/Header';
import { BASE_URL } from '@src/configs/apiConfig/baseUrl';
import { URL_CALLBACK } from '@src/configs/urls';
import { IWithDrawRequestResultModel } from '@src/models/output/technician/IWithDrawRequestResultModel';
import { useToast } from '@src/hooks/useToast';

const TechnicianProfile: FunctionComponent<IPageProps> = (props) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const [datePicker, setDatePicker] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<string>();
  const httpRequest = useHttpRequest();
  const toast = useToast();
  const search = useLocation().search;
  // const id = new URLSearchParams(search).get('id');
  let { id } = useParams();
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const [profile, setProfile] = useState<ITechnicianProfileResultModel>();
  const [transaction, setTransaction] = useState<ITransactionResultModel[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [checkOutLoading, setCheckOutLoading] = useState<boolean>(false);
  const auth = useSelector((state: RootStateType) => state.authentication.isAuthenticate);
  const [payment, setPayment] = useState<number>(0);

  const GetTechnicianProfile = () => {
    httpRequest
      .getRequest<IOutputResult<ITechnicianProfileResultModel>>(`${APIURL_GET_TECHNICIAN_PROFILE}?TechnicianId=${id}`)
      .then((result) => {
        setProfile(result.data.data);
        setPayment(Math.abs(result.data.data.walletBalance));
      });
  };
  const CheckOutPayment = (walletBalance: number) => {
    setCheckOutLoading(true);
    const body = {
      technicianId: userData?.userId,
      amount: Math.abs(walletBalance),
      userId: userData?.userId,
      callBackUrl: BASE_URL + URL_CALLBACK,
      destinationUrl: window.location.href,
    };
    httpRequest
      .postRequest<IOutputResult<any>>(`${APIURL_POST_WALLET_PAYMENT}`, body)
      .then((result) => {
        setCheckOutLoading(false);
        window.open(result.data.data, '_self');
      })
      .catch(() => {
        setCheckOutLoading(false);
      });
  };
  const CashPayment = (walletBalance: number) => {
    setCheckOutLoading(true);
    const body = {
      amount: Math.abs(walletBalance),
      userId: userData?.userId,
      description: 'درخواست برداشت',
    };
    httpRequest
      .postRequest<IOutputResult<IWithDrawRequestResultModel>>(`${APIURL_POST_WALLET_WITH_DRAW}`, body)
      .then((result) => {
        debugger;
        const newobj: any = { ...profile, walletBalance: result.data.data.balance };
        setProfile(newobj);
        // setProfile([...profile , profile?.walletBalance: result.data.data.balance]);
        setCheckOutLoading(false);
      })
      .catch(() => {
        setCheckOutLoading(false);
      });
  };
  const GetTransactionList = (fromDate: string, endDate: string) => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<ITransactionResultModel[]>>(
        `${APIURL_GET_TRANSACTION}?TechnicianId=${userData?.userId}&DateFrom=${fromDate}&DateTo=${endDate}`
      )
      .then((result) => {
        setTransaction(result.data.data.reverse());
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    GetTransactionList(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getMonth()).toISOString(),
      new Date().toISOString()
    );
    init_template();
    GetTechnicianProfile();
  }, []);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      {auth && <MainMenuModal />}
      <div id="page">
        {/* <PrevHeader /> */}
        <Header headerTitle={props.title} />
        <div className="page-content technician-profile">
          <main>
            {loading ? (
              <div>
                <Spinner style={{ textAlign: 'center' }} />
              </div>
            ) : (
              <section>
                <div>
                  <div className="profile-image">
                    <figure style={{ marginTop: '20px' }}>
                      <img
                        src={profile?.avatarUrl ? `${profile?.avatarUrl}` : require('@src/scss/images/profile.png')}
                        alt="Technician_profile"
                      />
                    </figure>
                  </div>
                  <div className="profile-name">
                    <p className="profile-user-name" style={{ marginBottom: 0 }}>
                      {profile?.firstName} {profile?.lastName}
                    </p>
                    <p className="profile-subtitle" style={{ marginBottom: 0 }}>
                      {userData?.userName}
                    </p>
                  </div>
                </div>
                <div className="user-status">
                  <div className="">وضعیت:</div>
                  <div className="">
                    <span style={{ border: '1px solid rgb(96, 96, 96)' }}>
                      {profile?.isActive ? (
                        <>
                          <p style={{ marginBottom: 0 }}>فعال</p>
                          <span style={{ background: 'linear-gradient(rgb(0, 255, 0), rgb(0, 124, 0))' }}></span>
                        </>
                      ) : (
                        <>
                          <p style={{ marginBottom: 0 }}>غیرفعال</p>
                          <span style={{ background: 'linear-gradient(rgb(255, 0, 0), rgb(124, 0, 0))' }}></span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="profile-section-card">
                  <div>
                    <div className="font-15 title">کیف پول</div>
                    <div
                      className="message-box"
                      style={{ backgroundColor: profile?.walletBalance && profile?.walletBalance < 0 ? '#e30000' : '#4a851e' }}
                    >
                      <span dir="ltr" className="m-2">
                        {UtilsHelper.threeDigitSeparator(
                          profile?.walletBalance && profile.walletBalance < 0
                            ? '(' + profile?.walletBalance.toString().substring(1) + ') بدهکار'
                            : profile?.walletBalance.toString() + 'بستانکار'
                        )}
                      </span>
                      <span className="m-2 font-15"> ریال </span>
                    </div>
                    <div className="flex-column">
                      <>
                        <Input
                          defaultValue={profile?.walletBalance && payment}
                          type="number"
                          onChange={(e: any) => {
                            setPayment(e.currentTarget.value);
                          }}
                        />
                        <div>
                          <a
                            onClick={() => {
                              CheckOutPayment(payment);
                            }}
                            className="btn btn-warning m-2"
                          >
                            {checkOutLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'شارژ کیف پول'}
                          </a>

                          {profile?.walletBalance && profile.walletBalance > 0 && (
                            <a
                              onClick={() => {
                                payment < 1000000
                                  ? toast.showError('مبلغ باید بالا تر از 100 هزار تومان باشد')
                                  : CashPayment(payment);
                              }}
                              className="btn btn-warning m-2"
                            >
                              {checkOutLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'برداشت وجه'}
                            </a>
                          )}
                        </div>
                      </>
                    </div>
                  </div>
                </div>
                <div className="profile-section-card">
                  <div className="">
                    <div className="data-box">
                      <div>{profile?.dayInKardoon}</div>
                      <div>روز در کاردون</div>
                    </div>
                    <div className="data-box">
                      <div>{profile?.successfullMission}</div>
                      <div>ماموریت موفق</div>
                    </div>
                    <div className="data-box">
                      <div>{profile?.customerSatisfaction}</div>
                      <div>رضایت مشتری</div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
          <section className="report-section">
            <div className="profile-section-card">
              <h4 className="m-3">لیست تراکنش ها</h4>
              <div className="date-box">
                <div className="select-date">
                  از تاریخ{' '}
                  <DatePicker
                    render={<InputIcon style={{ height: 'calc(2.4em + 0.75rem - 6px)', width: '100%' }} />}
                    weekDays={weekDays}
                    inputClass="form-control"
                    onChange={(date: any) => {
                      const selectedDate = date.toDate();
                      setFromDate(selectedDate.toISOString());
                      setDatePicker(false);
                    }}
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                  />
                </div>
                <div className="select-date">
                  تا تاریخ
                  <DatePicker
                    disabled={datePicker}
                    render={<InputIcon style={{ height: 'calc(2.4em + 0.75rem - 6px)', width: '100%' }} />}
                    weekDays={weekDays}
                    inputClass="form-control"
                    onFocusedDateChange={(date: any) => {
                      const selectedDate = date.toDate();
                      GetTransactionList(fromDate!, selectedDate.toISOString());
                    }}
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                  />
                </div>
              </div>

              {loading ? (
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                  <Spinner />
                </div>
              ) : (
                transaction &&
                transaction.length > 0 &&
                transaction.map((item: ITransactionResultModel, index: number) => {
                  return (
                    <>
                      <div className="transaction-list">
                        <p
                          className="title justify-content-center"
                          style={{ backgroundColor: `${item.isDebtor ? 'rgb(217 83 96)' : 'rgb(32 181 112)'}` }}
                        >
                          {item.description}
                        </p>
                        <div className="d-flex justify-content-around m-3 p-2 transaction-listes">
                          <div className="table-style">
                            <div>تاریخ</div>
                            <div>مبلغ</div>
                            <div>وضعیت</div>
                          </div>
                          <div className="table-style">
                            <div>
                              {DateHelper.isoDateTopersian(item.transactionDateTime)}-
                              {DateHelper.splitTime(item.transactionDateTime)}
                            </div>
                            {item.isDebtor ? (
                              <>
                                <div>{UtilsHelper.threeDigitSeparator(item.debtorAmount)}</div>
                                <div>بدهکار</div>
                              </>
                            ) : (
                              <>
                                <div>{UtilsHelper.threeDigitSeparator(item.creditorAmount)}</div>
                                <div>بستانکار</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TechnicianProfile;
