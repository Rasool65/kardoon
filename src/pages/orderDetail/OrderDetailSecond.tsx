import React, { Component, FunctionComponent, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import '../Style/style.css';
// import '../Style/scss/style.scss';
import Picker from 'react-mobile-picker';
import { Col, Container, Input, Row } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { APIURL_GET_BRANDS } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { URL_MAIN } from '@src/configs/urls';
import { Controller, useForm } from 'react-hook-form';
import { IBrandResultModel } from '@src/models/output/orderDetail/IBrandResultModel';
import { IOrderDetailPageProp } from './IOrderDetailProp';
import WeekPicker from '@src/components/weekPicker/WeekPicker';

const options = [
  { label: 'ال جی', value: '1' },
  { label: 'سامسونگ', value: '2' },
  { label: 'جی پلاس', value: '3' },
  { label: 'سونی', value: '4' },
  { label: 'بوش', value: '5' },
  { label: 'دلونگی', value: '6' },
  { label: 'اسنوا', value: '7' },
  { label: 'امرسان', value: '8' },
  { label: 'پاناسونیک', value: '9' },
  { label: 'پارس خزر', value: '10' },
  { label: 'میدیا', value: '11' },
  { label: 'سانی', value: '12' },
];

const OrderDetailConfirm: FunctionComponent<IOrderDetailPageProp> = ({ handleClickPrevious }) => {
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const [dateTime, setDateTime] = useState<any>({
    viewBgVisible: false,
    addAddressModalVisible: false,
    isUrgent: false,
    valueGroups: { title: 'ظهر ۱۶-۱۲' },
    optionGroups: { title: ['صبح ۱۲-۸', 'ظهر ۱۶-۱۲', 'عصر ۲۰-۱۶'] },
  });

  const navigate = useNavigate();
  const [brandList, setBrandList] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  //   const { state }: any = useLocation();
  const [input, setInput] = useState<any>({
    model: false,
    serialNo: false,
    descriptions: false,
  });
  const handleChange = (name: any, value: any) => {
    setDateTime(({ valueGroups }: any) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
    }));
  };
  const selectDate = (newValue: any, quesId: any) => {
    console.log(newValue, quesId);
  };

  const chbOnChange = (e: any) => {
    // console.log(e)
    if (e.target.checked === true) {
      setDateTime({ isUrgent: true });
    } else {
      setDateTime({ isUrgent: false });
    }
  };
  // const  isUrgentMessage = () => {
  //     props.showSnackbar({
  //         type: SnackbarType.ERROR,
  //         message: "در حالت مراجعه فوری امکان انتخاب زمان نمی باشد.",
  //         isShow: true
  //     })
  // };
  //   const {
  //     register,
  //     control,
  //     setError,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<IRegisterModel>({ mode: 'onChange', resolver: yupResolver(RegisterModelSchema) });

  //   const onSubmit = (data: IRegisterModel) => {
  //     setLoading(true);
  //     const body = {
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       mobile: data.mobile,
  //       gender: data.gender,
  //     };
  //     if (data && !loading) {
  //       httpRequest
  //         .postRequest<IOutputResult<IRegisterResultModel>>(APIURL_REGISTER, body)
  //         .then((result) => {
  //           toast.showSuccess(result.data.message);
  //           handleRegisterModal();
  //         })
  //         .finally(() => setLoading(false));
  //     }
  //   };
  const { optionGroups, valueGroups } = dateTime;
  return (
    <div id="page">
      <div className="page-content" style={{ paddingBottom: '0px' }}>
        <div className="page-title page-title-small pointer" style={{ color: '#FFF', width: 'fit-content', fontSize: '16px' }}>
          جزئیات سفارش
        </div>

        <div className="card header-card shape-rounded" data-card-height="150">
          <div className="card-overlay bg-highlight opacity-95" />
          <div className="card-overlay dark-mode-tint" />
          <div className="card-bg bg-20" />
        </div>

        <div className="card card-style p-4">
          <h6>انتخاب زمان مراجعه</h6>

          <Container style={{ maxWidth: '100%', margin: '5px 0 25px 0', padding: '0 0 0 0' }}>
            <Row
              style={{
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 0 0 0',
                marginBottom: '0',
              }}
            >
              <Col xs={8}>
                <WeekPicker
                  onSelectDateTime={(e: any) => selectDate(e, 3)}
                  selectedDate={'2022/05/18 20:00'}
                  questionId={3}
                  //   isUrgent={state.isUrgent}
                  //   isUrgentMessage={(e) => isUrgentMessage(e)}
                />
              </Col>
              <Col xs={4}>
                <Picker
                  optionGroups={optionGroups}
                  valueGroups={valueGroups}
                  //   onChange={state.isUrgent ? (e) => isUrgentMessage(e) : (name, value) => handleChange(name, value)}
                />
              </Col>
            </Row>
          </Container>

          <div className="form-check icon-check">
            <input className="form-check-input" type="checkbox" value="" id="check2" onChange={(e) => chbOnChange(e)} />
            <label className="form-check-label" htmlFor="check2">
              مراجعه فوری
            </label>
            <i className="icon-check-1 fa fa-circle color-gray-dark font-16" />
            <i className="icon-check-2 fa fa-check-circle font-16 color-highlight" />
          </div>
        </div>

        <div className="card card-style p-4">
          <h6>انتخاب آدرس</h6>

          {/* <Address /> */}

          <div
            // onClick={(e) => showAddAddressModal(e)}
            style={{ marginTop: '10px' }}
            className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
          >
            + افزودن آدرس
          </div>
        </div>

        <div className="row mb-2" style={{ padding: '0 25px 25px 25px' }}>
          <div className="col-6">
            <div
              onClick={(e) => {
                handleClickPrevious();
              }}
              className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700"
            >
              بازگشت
            </div>
          </div>
          <div className="col-6">
            <div
              //   onClick={(e) => completeRegistration(e)}
              className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700"
            >
              تکمیل ثبت سفارش
            </div>
          </div>
        </div>
      </div>

      {/* <AddAddressModal
        addAddressModalVisible={state.addAddressModalVisible}
        hideAddAddressModal={(e) => hideAddAddressModal(e)}
      /> */}

      {/* <div
        onClick={state.addAddressModalVisible ? (e) => hideAddAddressModal(e) : null}
        className={state.viewBgVisible ? 'menu-hider menu-active' : ''}
      /> */}
    </div>
  );
};

export default OrderDetailConfirm;
