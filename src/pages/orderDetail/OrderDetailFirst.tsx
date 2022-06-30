import React, { Component, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
// import Camera from 'react-html5-camera-photo';
import Select from 'react-select';
import { Col, Container, Form, FormFeedback, Input, Row, Button, Label } from 'reactstrap';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomFunctions } from '@src/utils/custom';
import { IRequestDetail, RequestDetailModelSchema } from '@src/models/input/orderDetail/IRequestDetail';
import { useRecorder } from '@src/hooks/useRecorder';
import Webcam from 'react-webcam';
import VideoModal from './VideoModal';
import CaptureModal from './CaptureModal';

const OrderDetailFirst: FunctionComponent<IOrderDetailPageProp> = ({ handleClickNext }) => {
  let brands: any[] = [];
  let { audioURL, isRecording, startRecording, stopRecording } = useRecorder();
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  // const cityId =6
  const navigate = useNavigate();
  const [brandList, setBrandList] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [input, setInput] = useState<any>({
    model: false,
    serial: false,
    requestDescription: false,
  });

  const [audioDisplay, setAudioDisplay] = useState<string>('none');
  const [imageFile, setImageFile] = useState<any>();
  const [audioFile, setAudioFile] = useState<any>();
  const [videoFile, setVideoFile] = useState<any>();

  const GetBrands = () => {
    !!state
      ? httpRequest
          .getRequest<IOutputResult<IBrandResultModel>>(
            `${APIURL_GET_BRANDS}?CityId=${cityId}&ProductId=${state.ProductId}&ServiceTypeId=${state.ServiceTypeId}`
            // 'http://127.0.0.1:2500/getProducts',
          )
          .then((result) => {
            setBrandList(result.data.data);
          })
      : navigate(URL_MAIN);
  };
  const Brands = () => {
    brandList
      ? brandList.forEach((d: any) => {
          brands.push({ value: d.id, label: d.title });
        })
      : '';
  };

  useEffect(() => {
    GetBrands();
  }, []);

  useEffect(() => {
    Brands();
  }, [brandList]);

  // useEffect(() => {
  //   CustomFunctions();
  // }, []);

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestDetail>({ mode: 'onChange', resolver: yupResolver(RequestDetailModelSchema) });

  const onSubmit = (data: IRequestDetail) => {
    var formData = new FormData();
    formData.append('serviceTypeId', state.ServiceTypeId);
    formData.append('productCategoryId', state.ProductId);
    formData.append('brandId', data.brandId.value.toString());
    formData.append('model', data.model);
    formData.append('serial', data.serial);
    formData.append('requestDescription', data.requestDescription);
    // if (audioFile) formData.append('audioMessage', audioFile);
    // if (imageFile) formData.append('imageMessage', imageFile);
    // if (videoFile) formData.append('videoMessage', videoFile);

    // const body: IRequestDetail = {
    //   audioUrl: audioURL,
    //   serviceTypeId: state.ServiceTypeId,
    //   productCategoryId: state.ProductId,
    //   brandId: data.brandId,
    //   model: data.model,
    //   serial: data.serial,
    //   requestDescription: data.requestDescription,
    // };

    handleClickNext(formData);
  };
  useEffect(() => {
    CustomFunctions();
  }, []);

  //* Take Picture
  const videoConstraints = {
    width: 800,
    height: 600,
    facingMode: 'forward',
  };
  const WebcamCapture = () => (
    <Webcam audio={false} height={600} screenshotFormat="image/jpeg" width={800} videoConstraints={videoConstraints}>
      {/* @ts-ignore */}
      {({ getScreenshot }) => (
        <Button
          onClick={() => {
            debugger;
            const imageSrc = getScreenshot();
          }}
        >
          ثبت تصویر
        </Button>
      )}
    </Webcam>
    //* Take Video
  );

  const WebcamStreamCapture = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleStartCaptureClick = useCallback(() => {
      setCapturing(true);
      // @ts-ignore
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      // @ts-ignore
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      // @ts-ignore
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
      ({ data }: any) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleStopCaptureClick = useCallback(() => {
      // @ts-ignore
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        // @ts-ignore
        a.style = 'display: none';
        a.href = url;
        a.download = 'react-webcam-stream-capture.webm';
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    return (
      <>
        <Webcam audio={false} ref={webcamRef} />
        {capturing ? (
          <Button onClick={handleStopCaptureClick}>توقف</Button>
        ) : (
          <Button onClick={handleStartCaptureClick}>شروع ضبط</Button>
        )}
        {recordedChunks.length > 0 && <Button onClick={handleDownload}>ارسال ویدئو</Button>}
      </>
    );
  };
  return (
    <div id="page">
      {/* <Header/> */}
      <div
        className="page-content"
        style={{
          paddingBottom: '0px',
        }}
      >
        <div className="page-title page-title-small pointer" style={{ color: '#FFF', width: 'fit-content', fontSize: '16px' }}>
          جزئیات سفارش
        </div>

        <div className="card header-card shape-rounded" data-card-height="150">
          <div className="card-overlay bg-highlight opacity-95" />
          <div className="card-overlay dark-mode-tint" />
          <div className="card-bg bg-20" />
        </div>

        <div className="card card-style p-4">
          <div className="content mb-0">
            <Form onSubmit={handleSubmit(onSubmit)}>
              {' '}
              لطفا جزئیات سفارش خود را مشخص کنید.
              <div>
                <Controller
                  name="brandId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        noOptionsMessage={() => t('ListIsEmpty')}
                        onFocus={() => GetBrands()}
                        isClearable
                        // theme={(theme) => ({
                        //   ...theme,
                        //   borderRadius: 10,
                        // })}
                        className="select-city"
                        placeholder={t('SelectBrand')}
                        options={brands}
                        isSearchable={true}
                        {...field}
                      />
                      <FormFeedback className="d-block">{errors.brandId?.value?.message}</FormFeedback>
                    </>
                  )}
                />
                <Container style={{ maxWidth: '100%', marginTop: '15px', padding: '0 0 0 0' }}>
                  <Row
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      <div
                        className={`input-style has-borders no-icon validate-field mb-4 ${
                          input.model ? 'input-style-active' : ''
                        }`}
                      >
                        {/* <input type="tel" className="form-control validate-text" id="form4" placeholder="مدل" />
                      <label htmlFor="form4" className="color-highlight">
                        مدل
                      </label>
                      <i className={`fa fa-times disabled invalid color-red-dark ${true ? 'disabled' : ''}`} />
                      <i className="fa fa-check disabled valid color-green-dark" />
                      <em className={'disabled'}>(اختیاری)</em> */}
                        <Controller
                          name="model"
                          control={control}
                          render={({ field }: any) => (
                            <>
                              <Input
                                id="form4a"
                                onFocus={() => setInput({ model: true })}
                                style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                                className="form-control validate-text"
                                type="text"
                                placeholder={t('EnterModel')}
                                autoComplete="off"
                                invalid={errors.model && true}
                                {...field}
                              />
                              <label htmlFor="form4" className="color-highlight">
                                {t('Model')}
                              </label>
                              <i className={`fa fa-times disabled invalid color-red-dark ${input.model ? 'disabled' : ''}`} />
                              <i className="fa fa-check disabled valid color-green-dark" />
                              <em className={`${input.model ? 'disabled' : ''}`}>({t('Required')})</em>
                              <FormFeedback>{errors.model?.message}</FormFeedback>
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <div
                        className={`input-style has-borders no-icon validate-field mb-4 ${
                          input.serial ? 'input-style-active' : ''
                        }`}
                      >
                        <Controller
                          name="serial"
                          control={control}
                          render={({ field }: any) => (
                            <>
                              <Input
                                id="form4a"
                                onFocus={() => setInput({ serial: true })}
                                style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                                className="form-control validate-text"
                                type="text"
                                placeholder={t('EnterSerial')}
                                autoComplete="off"
                                invalid={errors.serial && true}
                                {...field}
                              />
                              <label htmlFor="form4" className="color-highlight">
                                {t('Serial')}
                              </label>
                              <i className={`fa fa-times disabled invalid color-red-dark ${input.serial ? 'disabled' : ''}`} />
                              <i className="fa fa-check disabled valid color-green-dark" />
                              <em className={`${input.serial ? 'disabled' : ''}`}>({t('Required')})</em>
                              <FormFeedback>{errors.serial?.message}</FormFeedback>
                            </>
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>

                <div
                  className={`input-style has-borders no-icon mb-4 ${input.requestDescription ? 'input-style-active' : ''}`}
                  style={{ margin: '0 0 0 0', padding: '0 0 0 0' }}
                >
                  <Controller
                    name="requestDescription"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Input
                          id="form7"
                          onFocus={() => setInput({ requestDescription: true })}
                          style={{ backgroundPosition: 'left', marginTop: '0', height: '100px' }}
                          className="form-control validate-text"
                          type="textarea"
                          placeholder={t('EnterRequestDescription')}
                          autoComplete="off"
                          invalid={errors.requestDescription && true}
                          {...field}
                        />
                        <label htmlFor="form7" className="color-highlight">
                          {t('RequestDescription')}
                        </label>
                        <i
                          className={`fa fa-times disabled invalid color-red-dark ${input.requestDescription ? 'disabled' : ''}`}
                        />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.requestDescription ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.requestDescription?.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>

                <Container style={{ maxWidth: '100%', margin: '25px 0 20px 0', padding: '0 0 0 0' }}>
                  <Row
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      در صورت نیاز درخواست خود را به صورت صوتی ثبت کنید
                    </Col>

                    <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <img
                        hidden={isRecording}
                        style={{ cursor: 'pointer' }}
                        src="images/forTest/voice.png"
                        onClick={() => {
                          startRecording();
                          setAudioDisplay('flex');
                        }}
                        width="46"
                        height="46"
                        alt=""
                      />
                      <img
                        hidden={!isRecording}
                        style={{ cursor: 'pointer' }}
                        src="images/forTest/stop.png"
                        onClick={() => {
                          stopRecording();
                        }}
                        width="46"
                        height="46"
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: `${audioDisplay}`,
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      <audio hidden={isRecording} src={audioURL} controls />
                    </Col>
                    <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <img
                        hidden={isRecording}
                        style={{ cursor: 'pointer' }}
                        src="images/forTest/delete.png"
                        onClick={() => {
                          //todo remove voice record
                          setAudioDisplay('none');
                        }}
                        width="46"
                        height="46"
                        alt=""
                      />
                    </Col>
                  </Row>
                </Container>

                <Container style={{ maxWidth: '100%', margin: '25px 0 20px 0', padding: '0 0 0 0' }}>
                  <Row
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      در صورت نیاز می توانید تصویری را بارگذاری نمایید
                    </Col>
                    <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      {/* <Webcam /> */}
                      <img
                        data-menu="capture-Modal"
                        style={{ cursor: 'pointer' }}
                        src="images/forTest/camera.png"
                        width="46"
                        height="46"
                        alt=""
                      />
                    </Col>
                  </Row>
                </Container>
                <Container style={{ maxWidth: '100%', margin: '25px 0 20px 0', padding: '0 0 0 0' }}>
                  <Row
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      در صورت نیاز می توانید ویدیو را بارگذاری نمایید
                    </Col>
                    <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <img
                        data-menu="video-Modal"
                        style={{ cursor: 'pointer' }}
                        src="images/forTest/video.png"
                        width="46"
                        height="46"
                        alt=""
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
              <Button
                type="submit"
                style={{ marginTop: '40px', width: '100%' }}
                className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
              >
                ادامه
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <CaptureModal WebcamCapture={WebcamCapture} />
      <VideoModal WebcamStreamCapture={WebcamStreamCapture} />
    </div>
  );
};

export default OrderDetailFirst;
