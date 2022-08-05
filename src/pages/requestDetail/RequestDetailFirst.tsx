import React, { Component, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, FormFeedback, Input, Row, Button, Label } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { Controller, useForm } from 'react-hook-form';
import { IRequestDetailPageProp } from './IRequestDetailProp';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomFunctions } from '@src/utils/custom';
import { IRequestDetail, RequestDetailModelSchema } from '@src/models/input/requestDetail/IRequestDetail';
import { useRecorder } from '@src/hooks/useRecorder';

const RequestDetailFirst: FunctionComponent<IRequestDetailPageProp> = ({ handleClickNextToSecond, handleClickMore }) => {
  let { audioData, audioURL, isRecording, startRecording, stopRecording } = useRecorder();
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [input, setInput] = useState<any>({
    requestDescription: false,
  });
  const [audioDisplay, setAudioDisplay] = useState<string>('none');
  const [imageDisplay, setImageDisplay] = useState<string>('none');
  const [videoDisplay, setVideoDisplay] = useState<string>('none');
  const [imgSrcList, setImgSrcList] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<any[]>([]);
  const [audioFile, setAudioFile] = useState<any>();
  const [videoFile, setVideoFile] = useState<any>();
  const [more, setMore] = useState<boolean>(false);
  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestDetail>({ mode: 'onChange', resolver: yupResolver(RequestDetailModelSchema) });

  const onSubmit = (data: IRequestDetail) => {
    const body: IRequestDetail = {
      serviceTypeId: state.ServiceTypeId,
      productCategoryId: state.ProductId,
      requestDescription: data.requestDescription,
      audioMessage: audioFile,
      imageMessage: imageFile,
      videoMessage: videoFile,
      // attributes: [
      //   {
      //     attributeId: 1,
      //     attributeValue: 'string',
      //     attributeValueId: 2,
      //   },
      // ],
    };
    more ? handleClickMore(body) : handleClickNextToSecond(body);
  };

  useEffect(() => {
    CustomFunctions();
  }, []);

  useEffect(() => {
    setAudioFile(audioData);
  }, [audioData]);

  const onImageFileChange = (e: any) => {
    const files = e.target.files;
    files.length > 1 ? setImageFile(files) : setImageFile([...imageFile, files[0]]);

    const reader = new FileReader();
    reader.onload = function () {
      setImgSrcList([...imgSrcList, reader.result]);
    };
    reader.readAsDataURL(files[0]);
    setImageDisplay('flex');
  };

  const onVideoFileChange = (e: any) => {
    let file = e.target.files[0];
    setVideoFile(file);
    let blobURL = URL.createObjectURL(file);
    document.querySelector('video')!.src = blobURL;
    setVideoDisplay('flex');
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
            <>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {' '}
                لطفا جزئیات سفارش خود را مشخص کنید.
                <div>
                  <Container style={{ maxWidth: '100%', marginTop: '15px', padding: '0 0 0 0' }}></Container>

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
                            className={`fa fa-times disabled invalid color-red-dark ${
                              input.requestDescription ? 'disabled' : ''
                            }`}
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
                        <audio
                          style={{
                            width: '-webkit-fill-available',
                          }}
                          hidden={isRecording}
                          src={audioURL}
                          controls
                        />
                      </Col>
                      <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                        <img
                          hidden={isRecording}
                          style={{ cursor: 'pointer' }}
                          src="images/forTest/delete.png"
                          onClick={() => {
                            setAudioFile(null);
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
                        در صورت نیاز می توانید تصاویری را بارگذاری نمایید
                      </Col>
                      <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                        <label htmlFor="img">
                          <img style={{ cursor: 'pointer' }} src="images/forTest/camera.png" width="46" height="46" alt="" />
                        </label>
                        <Input
                          onChange={onImageFileChange}
                          style={{ display: 'none' }}
                          id="img"
                          type="file"
                          capture="user"
                          accept="image/*"
                        />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: `${imageDisplay}`,
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '0 0 0 0',
                        marginBottom: '0',
                      }}
                    >
                      <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                        {imgSrcList &&
                          imgSrcList.length > 0 &&
                          imgSrcList.map((item: any, index: number) => {
                            return <img className="m-1" width="75" height="75" src={item} />;
                          })}
                      </Col>
                      <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                        <img
                          style={{ cursor: 'pointer' }}
                          src="images/forTest/delete.png"
                          onClick={() => {
                            setImgSrcList([]);
                            setImageFile([]);
                            setImageDisplay('none');
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
                        در صورت نیاز می توانید ویدیو را بارگذاری نمایید
                      </Col>
                      <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                        <label htmlFor="video">
                          <img style={{ cursor: 'pointer' }} src="images/forTest/video.png" width="46" height="46" alt="" />
                        </label>
                        <Input
                          onChange={onVideoFileChange}
                          style={{ display: 'none' }}
                          id="video"
                          type="file"
                          capture="user"
                          accept="video/*"
                        />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: `${videoDisplay}`,
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '0 0 0 0',
                        marginBottom: '0',
                      }}
                    >
                      <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                        <video id="video" width="200" height="240" controls>
                          مرور گر شما از ویدیو پشتیبانی نمیکند
                        </video>
                      </Col>
                      <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                        <img
                          style={{ zIndex: '1', cursor: 'pointer' }}
                          src="images/forTest/delete.png"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoDisplay('none');
                          }}
                          width="46"
                          height="46"
                          alt=""
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="flex-column" style={{ display: 'flex' }}>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      setMore(true);
                    }}
                    className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700 m-1"
                  >
                    افزودن محصول دیگر{' '}
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      setMore(false);
                    }}
                    className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0 m-1"
                  >
                    ادامه
                  </Button>
                </div>
              </Form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailFirst;
