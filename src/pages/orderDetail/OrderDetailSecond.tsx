import React, { Component, FunctionComponent, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Input, Row, Spinner } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { APIURL_GET_ADDRESSES, APIURL_GET_BRANDS, APIURL_POST_DELETE_USER_ADDRESS } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IOrderDetailPageProp, IOrderDetailSecond } from './IOrderDetailProp';
import WeekPicker from '@src/components/weekPicker/WeekPicker';
import { CustomFunctions } from '@src/utils/custom';
import { useToast } from '@src/hooks/useToast';
import Picker from 'react-mobile-picker';
import { IAddressesResultModel } from '@src/models/output/orderDetail/IAddressesResultModel';
import AddAddressModal from './AddAddressModal';
import { useTranslation } from 'react-i18next';

const OrderDetailConfirm: FunctionComponent<IOrderDetailPageProp> = ({ handleClickPrevious, handleSubmit }) => {
  const toast = useToast();
  const [selectDate, setSelectDate] = useState<string>('');
  const [addressList, setAddressList] = useState<IAddressesResultModel[]>();
  const [refKey, setRefKey] = useState<number>();
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const [shift, setShift] = useState<number>();
  const [shiftTime, setShiftTime] = useState<any>({
    isUrgent: isUrgent,
    valueGroups: { title: 'ظهر ۱۶-۱۲' },
    optionGroups: { title: ['صبح ۱۲-۸', 'ظهر ۱۶-۱۲', 'عصر ۲۰-۱۶', 'شب ۲۴-۲۰'] },
  });
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();

  const getIndex = (value: any) => {
    const arr = optionGroups.title;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == value) {
        return i;
      }
    }
    return -1;
  };
  const handleChange = (name: any, value: any) => {
    setShiftTime(({ valueGroups }: any) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
      optionGroups: { title: ['صبح ۱۲-۸', 'ظهر ۱۶-۱۲', 'عصر ۲۰-۱۶', 'شب ۲۴-۲۰'] },
    }));
  };

  const GetAddresses = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IAddressesResultModel[]>>(`${APIURL_GET_ADDRESSES}?UserName=${userData?.userName}`)
      .then((result) => {
        setAddressList(result.data.data);
        setLoading(false);
      });
  };

  const chbOnChange = (e: any) => {
    e.target.checked ? (setIsUrgent(true), setShift(undefined)) : setIsUrgent(false);
  };
  const deleteAddress = (refKey: number) => {
    setLoading(true);
    const body = {
      userName: userData?.userName,
      refkey: refKey,
    };
    httpRequest.postRequest<IOutputResult<IAddressesResultModel[]>>(`${APIURL_POST_DELETE_USER_ADDRESS}`, body).then((result) => {
      setAddressList(result.data.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    CustomFunctions();
  }, [refKey]);
  useEffect(() => {
    GetAddresses();
    CustomFunctions();
  }, []);

  const { optionGroups, valueGroups } = shiftTime;
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
                  onSelectDateTime={(value: string) => {
                    setSelectDate(value);
                  }}
                  selectedDate={selectDate}
                  questionId={3}
                  isUrgent={isUrgent}
                  //  isUrgentMessage={(e) => isUrgentMessage(e)}
                />
              </Col>
              <Col xs={4}>
                {!!!isUrgent ? (
                  <Picker
                    optionGroups={optionGroups}
                    valueGroups={valueGroups}
                    onChange={(name: string, value: string) => {
                      handleChange(name, value);
                      setShift(getIndex(value));
                    }}
                  />
                ) : (
                  <>{toast.showInfo('در حالت مراجعه فوری امکان انتخاب زمان وجود ندارد.')} </>
                )}
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
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Spinner />
            </div>
          ) : (
            addressList &&
            addressList.length &&
            addressList.map((item: IAddressesResultModel, index: number) => {
              return (
                <div
                  className="form-check icon-check"
                  style={{
                    display: 'flex',
                    border: '1px solid #CCD1D9',
                    borderStyle: 'dashed',
                    padding: '5px 0px 5px 10px',
                    margin: '15px 0 15px 0',
                  }}
                >
                  <label className="form-check-label" htmlFor={`radio${index}`}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      onClick={(e) => {
                        setRefKey(item.refkey);
                      }}
                      value=""
                      id={`radio${index}`}
                    />{' '}
                    <i className="icon-check-1 far fa-frown color-gray-dark font-16"></i>
                    <i className="icon-check-2 far fa-smile font-16 color-highlight"></i>
                    <div className="row mb-2">
                      <div className="col-6">{item.title}</div>
                      <div className="col-6" style={{ textAlign: 'left' }}>
                        {item.homeTel}
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-12">{item.address}</div>
                      <div className="col-6">کد پستی</div>
                      <div className="col-6" style={{ textAlign: 'left' }}>
                        {item.zipCode}
                      </div>
                    </div>
                  </label>
                  <div
                    onClick={() => {
                      setRefKey(item.refkey!);
                    }}
                    data-menu="remove-address-Modal"
                    className="fa fa-times color-red-dark"
                  ></div>
                </div>
              );
            })
          )}

          <div
            data-menu="add-address-Modal"
            style={{ marginTop: '10px' }}
            className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0 "
          >
            + افزودن آدرس
          </div>
        </div>

        <div className="row mb-2" style={{ padding: '0 25px 25px 25px' }}>
          <div className="col-6">
            <div
              onClick={(e) => {
                const body: IOrderDetailSecond = {
                  refkey: refKey,
                  presenceDate: selectDate,
                  presenceShift: shift,
                  isUrgent: isUrgent,
                };
                handleSubmit(body);
              }}
              className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700"
            >
              تکمیل ثبت سفارش
            </div>
          </div>
          <div className="col-6">
            <div
              onClick={(e) => {
                handleClickPrevious();
              }}
              className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700"
            >
              افزودن محصول دیگر{' '}
            </div>
          </div>
        </div>
      </div>
      <div id="remove-address-Modal" className="menu menu-box-modal rounded-m" data-menu-height="200" data-menu-width="320">
        <h1 className="text-center font-700 mt-3 pb-1">حذف آدرس</h1>
        <p className="boxed-text-l">آیا از حذف آدرس اطمینان دارید؟</p>
        <div className="row me-3 ms-3 mb-0">
          <div className="col-6">
            <a
              onClick={() => {
                deleteAddress(refKey!);
              }}
              className="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-700 bg-green-dark"
            >
              بله
            </a>
          </div>
          <div className="col-6">
            <a
              href="#"
              className="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-700 bg-red-dark"
            >
              خیر
            </a>
          </div>
        </div>
      </div>
      <AddAddressModal GetAddresses={GetAddresses} />
    </div>
  );
};

export default OrderDetailConfirm;
