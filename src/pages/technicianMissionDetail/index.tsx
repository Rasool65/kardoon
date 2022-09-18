import Form, { AjvError, IChangeEvent, ISubmitEvent, UiSchema } from '@rjsf/core';
import type { JSONSchema7 } from 'json-schema';
import {
  APIURL_GET_MISSION_ATTRIBUTES_DETAILS,
  APIURL_GET_MISSION_DETAILS,
  APIURL_GET_REQUEST_STATUS_LIST,
  APIURL_GET_TRACKING_LIST,
  APIURL_POST_TRACKING,
  APIURL_UPDATE_REQUEST_DETAIL_STATUS,
} from '@src/configs/apiConfig/apiUrls';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import Footer from '@src/layout/Footer';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IProblemList } from '@src/models/output/orderDetail/IOrderDetailListResultModel';
import { RootStateType } from '@src/redux/Store';
import { DateHelper } from '@src/utils/dateHelper';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { FunctionComponent, useEffect, useState, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spinner, Input, FormFeedback, Container, Row, Col } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_MY_ORDERS, URL_TECHNICIAN_MISSION_DETAIL_ACTION } from '../../configs/urls';
import { IMissionDetailResultModel, IStatusMission } from '@src/models/output/missionDetail/IMissionDetailListResultModel';
import Select from 'react-select';
import { IAttributesResultModel } from '@src/models/output/missionDetail/IAttributesResultModel';
import { useToast } from './../../hooks/useToast';
import { CustomFunctions } from './template';
import PrevHeader from '@src/layout/PrevHeader';
import { IFollowUpList } from '@src/models/output/missionDetail/IFollowUpList';
import { useRecorder } from '@src/hooks/useRecorder';
import FollowUpModal from './FollowUpModal';
import SuspendCouseModal from './SuspendCauseModal';
import ProgressCauseModal from './ProgressCauseModal';

const technicianMissionDetail: FunctionComponent<IPageProps> = (props) => {
  let { audioData, audioURL, isRecording, startRecording, stopRecording } = useRecorder();
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const httpRequest = useHttpRequest();
  const httpRequestMedia = useHttpRequest(RequestDataType.formData);
  const [missionDetail, setMissionDetail] = useState<IMissionDetailResultModel>();
  const [genForm, setGenForm] = useState<IAttributesResultModel>();
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [followUpModalVisible, setFollowUpModalVisible] = useState<boolean>(false);
  const [suspendReasonModalVisible, setSuspendReasonModalVisible] = useState<boolean>(false);
  const [progressReasonModalVisible, setProgressReasonModalVisible] = useState<boolean>(false);
  const [suspendCauseList, setSuspendCasueList] = useState<number[]>([]);
  const [progressCauseList, setProgressCasueList] = useState<number[]>([]);

  const [backgroundDimmer, setBackgroundDimmer] = useState<boolean>(false);
  const [selectDisabled, setSelectDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [followUpDescription, setFollowUpDescription] = useState<string>();
  const [followUpList, setFollowUpList] = useState<IFollowUpList[]>();
  const [audioDisplay, setAudioDisplay] = useState<string>('none');
  const [imageDisplay, setImageDisplay] = useState<string>('none');
  const [videoDisplay, setVideoDisplay] = useState<string>('none');
  const [imgSrcList, setImgSrcList] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<any[]>([]);
  const [audioFile, setAudioFile] = useState<any>();
  const [videoFile, setVideoFile] = useState<any>();
  const [statusList, setStatusList] = useState<IStatusMission[]>();
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const toast = useToast();
  const GetMissionDetail = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IMissionDetailResultModel>>(
        `${APIURL_GET_MISSION_DETAILS}?TechnicianId=${userData?.userId}&RequestDetailId=${id}`
      )
      .then((result) => {
        setMissionDetail(result.data.data);
        result.data.data.statusId == 3 || result.data.data.statusId == 4 ? setSelectDisabled(true) : setSelectDisabled(false);
        setLoading(false);
      });
  };
  const UpdateStatus = (statusValue: number, causeIdList?: number[]) => {
    const body = {
      technicianId: userData?.userId,
      requestDetailId: parseInt(id!),
      status: statusValue,
      causeIdList: causeIdList,
    };
    setLoading(true);
    httpRequest.updateRequest<IOutputResult<any>>(`${APIURL_UPDATE_REQUEST_DETAIL_STATUS}`, body).then((result) => {
      toast.showSuccess(result.data.message);
      setLoading(false);
    });
  };
  // const onSubmit = (data: ISubmitEvent<unknown>) => {
  //   // Call Update Genform for technician
  // };
  const AddFollowUp = () => {
    if (followUpDescription == '') return toast.showError('توضیحات نمی تواند خالی باشد'), setLoading(false);
    const body = {
      technicianId: userData?.userId,
      requestDetailId: parseInt(id!),
      description: followUpDescription,
    };
    setLoading(true);
    httpRequest
      .postRequest<IOutputResult<any>>(`${APIURL_POST_TRACKING}`, body)
      .then((result) => {
        toast.showSuccess(result.data.message);
        setFollowUpModalVisible(false);
        setSuspendReasonModalVisible(false);
        setProgressReasonModalVisible(false);
        setBackgroundDimmer(false);
        setLoading(false);
        GetFollowUp();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitTechnicianMedia = () => {
    const data = new FormData();
    audioFile ? data.append('audio', audioFile) : data.append('audio', '');
    videoFile ? data.append('video', videoFile) : data.append('video', '');
    imageFile
      ? imageFile.forEach((imageFile: any) => {
          data.append('image', imageFile);
        })
      : data.append('image', '');

    httpRequestMedia
      .postRequest<IOutputResult<any>>(`${'API MEDIA'}`, data)
      .then((result) => {
        toast.showSuccess(result.data.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const GetFollowUp = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IFollowUpList[]>>(
        `${APIURL_GET_TRACKING_LIST}?TechnicianId=${userData?.userId}&RequestDetailId=${id}`
      )
      .then((result) => {
        setFollowUpList(result.data.data);
        setLoading(false);
      });
  };
  const uiSchema = {
    'ui:readonly': true,
    // 'ui:widget': 'checkboxes',
  };

  const FormGenDetail = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IAttributesResultModel>>(
        `${APIURL_GET_MISSION_ATTRIBUTES_DETAILS}?RequestDetailId=${id}&UserId=${userData?.userId}`
      )
      .then((result) => {
        setGenForm(result.data.data);
        setLoading(false);
      });
  };

  const GetStatusList = () => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<IStatusMission[]>>(`${APIURL_GET_REQUEST_STATUS_LIST}`).then((result) => {
      setStatusList(result.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetStatusList();
    GetMissionDetail();
    FormGenDetail();
    GetFollowUp();
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
    setImageDisplay('initial');
  };

  const onVideoFileChange = (e: any) => {
    let file = e.target.files[0];
    setVideoFile(file);
    let blobURL = URL.createObjectURL(file);
    document.querySelector('video')!.src = blobURL;
    setVideoDisplay('flex');
  };
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    videoDisplay == 'flex' || audioDisplay == 'initial' || imageDisplay == 'initial' ? setShowButton(true) : setShowButton(false);
  }, [videoDisplay, audioDisplay, imageDisplay]);
  return (
    <>
      <div
        className={`menu-hider ${backgroundDimmer ? 'menu-active' : ''}`}
        onClick={() => {
          setBackgroundDimmer(false);
          setProgressReasonModalVisible(false);
          setSuspendReasonModalVisible(false);
          setFollowUpModalVisible(false);
          setImageModalVisible(false);
        }}
      ></div>
      <div id="page">
        {/* <Footer footerMenuVisible={true} activePage={1} /> */}
        <div className="page-content">
          <PrevHeader />
          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="section-1">
              <div className=" div-1">
                <div className=" details-bar">
                  <p>شماره درخواست:</p>
                  <p>{missionDetail?.requestNumber}</p>
                </div>
                <div className=" details-bar">
                  <p>زمان مراجعه:</p>
                  <p>
                    {DateHelper.isoDateTopersian(missionDetail?.presenceDateTime)}-{missionDetail?.presenceShift}
                  </p>
                </div>
                <div className="details-bar">
                  <p>نام مشتری:</p>
                  <p>
                    {missionDetail?.consumerFirstName} {missionDetail?.consumerLastName}
                  </p>
                </div>
                <div className="details-bar">
                  <p>آدرس:</p>
                  <p className="m-1">{missionDetail?.address}</p>
                </div>
              </div>
              <div className="div-2">
                <div
                  className=""
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '85%',
                    padding: '10px 0',
                  }}
                >
                  <span>
                    {missionDetail?.serviceTypeTitle}-{missionDetail?.productTypeTitle}
                  </span>
                  {missionDetail?.statusTitle && (
                    <Select
                      isDisabled={selectDisabled}
                      isLoading={loading}
                      className="select-city"
                      options={statusList}
                      placeholder={missionDetail?.statusTitle}
                      onChange={(e) => {
                        if (e?.value == 2) setSuspendReasonModalVisible(true), setBackgroundDimmer(true);
                        else if (e?.value == 5) setProgressReasonModalVisible(true), setBackgroundDimmer(true);
                        else UpdateStatus(e?.value!);
                      }}
                    />
                  )}
                </div>
                <div className="" style={{ width: '90%', padding: '10px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    {/* Generate Form here */}
                    {genForm && (
                      <>
                        <Form
                          children={true}
                          // onSubmit={onSubmit}
                          schema={genForm.attributes}
                          formData={genForm.attributeValues}
                          uiSchema={uiSchema}
                        />
                        {/* <Button className="btn btn-info" style={{ marginTop: '10px', width: '100%' }} type="submit">
                            بروزرسانی
                          </Button> */}
                      </>
                    )}
                    <div>
                      <p style={{ marginBottom: '0' }}>ایرادات</p>
                      <ul>
                        {missionDetail?.problemList &&
                          missionDetail?.problemList.length > 0 &&
                          missionDetail.problemList.map((problems: IProblemList, index: number) => {
                            return <li>{problems.label}</li>;
                          })}
                      </ul>
                    </div>
                  </div>

                  {missionDetail?.audioMessage && (
                    <div className="d-flex justify-content-center m-3">
                      <audio src={missionDetail?.audioMessage} controls />
                    </div>
                  )}

                  <div style={{ display: 'block' }}>
                    {missionDetail?.videoMessage && (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <video
                          width="320"
                          height="240"
                          controls
                          style={{ display: 'flex', alignContent: 'center' }}
                          src={missionDetail?.videoMessage}
                        />
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'inherit', flexWrap: 'wrap' }}>
                      {missionDetail?.imageMessage &&
                        missionDetail?.imageMessage.length > 0 &&
                        missionDetail?.imageMessage.map((imageAddress: string, index: number) => {
                          return (
                            <img
                              style={{ maxWidth: '85px', cursor: 'pointer' }}
                              className="m-2"
                              onClick={() => {
                                setImageUrl(imageAddress);
                                setImageModalVisible(true);
                              }}
                              src={imageAddress}
                            />
                          );
                        })}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '20px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      width: '50%',
                      margin: '0 auto',
                    }}
                  >
                    {/* Action */}
                    <span className="contact">
                      {loading ? (
                        <Spinner />
                      ) : (
                        <i
                          className="fa-solid fa-location-crosshairs"
                          onClick={() =>
                            navigate(`${URL_TECHNICIAN_MISSION_DETAIL_ACTION}`, {
                              state: {
                                requestDetailId: missionDetail?.requestDetailId,
                                productCategoryId: missionDetail?.productCategoryId,
                              },
                            })
                          }
                        />
                      )}
                    </span>
                    {/* Call */}
                    <span className="contact">
                      <i className="fa fa-phone" onClick={() => window.open(`tel:${missionDetail?.consumerPhoneNumber}`)} />
                    </span>
                    {/* Images */}
                    {/* <span className="contact">
                      <label htmlFor="img" style={{ cursor: 'pointer' }}>
                        <i className="fa fa-camera" />
                      </label>
                      <Input
                        onChange={onImageFileChange}
                        style={{ display: 'none' }}
                        id="img"
                        type="file"
                        capture="user"
                        accept="image/*"
                      />
                    </span> */}
                    {/* Video */}
                    {/* <span className="contact">
                      <label htmlFor="video" style={{ cursor: 'pointer' }}>
                        <i className="fa fa-video" />
                      </label>
                      <Input
                        onChange={onVideoFileChange}
                        style={{ display: 'none' }}
                        id="video"
                        type="file"
                        capture="user"
                        accept="video/*"
                      />
                    </span> */}
                    {/* Voice */}
                    {/* <span className="contact" hidden={isRecording}>
                      <i
                        className="fa fa-microphone"
                        onClick={() => {
                          startRecording();
                          setAudioDisplay('initial');
                        }}
                      />
                    </span> */}
                    {/* <span className="contact" hidden={!isRecording}>
                      <i
                        className="fa fa-stop"
                        onClick={() => {
                          stopRecording();
                        }}
                      />
                    </span> */}
                    {/* Message FollowUp */}
                    <span className="contact">
                      <i
                        className="fa fa-message"
                        onClick={() => {
                          setFollowUpModalVisible(true);
                          setBackgroundDimmer(true);
                        }}
                      />
                    </span>
                  </div>
                </div>
                {/* Voice */}
                <div style={{ width: '100%', display: `${audioDisplay}` }}>
                  <div className="d-flex m-3">
                    <div className="d-flex" style={{ width: '80%' }}>
                      {/* {missionDetail?.audioMessage && (
                        <div className="d-flex justify-content-center m-3">
                          <audio src={missionDetail?.audioMessage} controls />
                        </div>
                      )} */}
                      <audio
                        style={{
                          width: '-webkit-fill-available',
                        }}
                        hidden={isRecording}
                        src={audioURL}
                        controls
                      />
                    </div>
                    <div className="d-flex justify-content-around" style={{ width: '20%' }}>
                      <img
                        hidden={isRecording}
                        style={{ cursor: 'pointer' }}
                        src={require('@src/scss/images/forTest/delete.png')}
                        onClick={() => {
                          setAudioFile(null);
                          setAudioDisplay('none');
                        }}
                        width="46"
                        height="46"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {/* Images */}
                <div style={{ width: '100%', display: `${imageDisplay}` }}>
                  <div className="d-flex m-3">
                    <div className="d-flex flex-wrap" style={{ width: '80%' }}>
                      {imgSrcList &&
                        imgSrcList.length > 0 &&
                        imgSrcList.map((item: any, index: number) => {
                          return <img className="m-1" width="75" height="75" src={item} />;
                        })}
                    </div>
                    <div className="d-flex justify-content-around" style={{ width: '20%' }}>
                      <img
                        style={{ cursor: 'pointer' }}
                        src={require('@src/scss/images/forTest/delete.png')}
                        onClick={() => {
                          setImgSrcList([]);
                          setImageFile([]);
                          setImageDisplay('none');
                        }}
                        width="46"
                        height="46"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {/* Video */}
                <div style={{ width: '100%', display: `${videoDisplay}` }}>
                  <div className="d-flex m-3">
                    <div className="d-flex" style={{ width: '80%' }}>
                      <video id="video" style={{ width: 'inherit', height: 'inherit' }} controls>
                        مرور گر شما از ویدیو پشتیبانی نمیکند
                      </video>
                    </div>
                    <div className="d-flex justify-content-around" style={{ width: '20%' }}>
                      <img
                        style={{ zIndex: '1', cursor: 'pointer' }}
                        src={require('@src/scss/images/forTest/delete.png')}
                        onClick={() => {
                          setVideoFile(null);
                          setVideoDisplay('none');
                        }}
                        width="46"
                        height="46"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-2">
                <Button
                  style={{ width: '100%' }}
                  hidden={!showButton}
                  onClick={(e) => {
                    submitTechnicianMedia();
                  }}
                  className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700 m-1"
                >
                  ذخیره{' '}
                </Button>
              </div>
            </div>
          </div>
          {followUpList &&
            followUpList.length > 0 &&
            followUpList.map((item: IFollowUpList, index: number) => {
              return (
                <div
                  className="card card-style"
                  style={{
                    padding: '5px 10px 5px 10px',
                    margin: '15px',
                  }}
                >
                  <div className="row mb-2">
                    <div className="col-6">تاریخ و زمان</div>
                    <div className="col-6" style={{ textAlign: 'left' }}>
                      {DateHelper.splitTime(item.createDateTime)} - {DateHelper.isoDateTopersian(item.createDateTime)}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-12"> {item.description}</div>
                  </div>
                </div>
              );
            })}
        </div>

        <FollowUpModal
          followUpModalVisible={followUpModalVisible}
          AddFollowUp={AddFollowUp}
          loading={loading}
          onChange={(e: any) => setFollowUpDescription(e.currentTarget.value)}
        />

        <SuspendCouseModal
          suspendReasonModalVisible={suspendReasonModalVisible}
          missionDetail={missionDetail}
          statusList={statusList}
          onChange={(e: any) => {
            setFollowUpDescription((Array.isArray(e) ? e.map((x) => x.label) : []).toString());
            setSuspendCasueList(Array.isArray(e) ? e.map((x) => x.value) : []);
          }}
          onClick={() => {
            UpdateStatus(2, suspendCauseList), AddFollowUp();
          }}
          loading={loading}
        />

        <ProgressCauseModal
          missionDetail={missionDetail}
          statusList={statusList}
          progressReasonModalVisible={progressReasonModalVisible}
          onChange={(e: any) => {
            setFollowUpDescription((Array.isArray(e) ? e.map((x) => x.label) : []).toString());
            setProgressCasueList(Array.isArray(e) ? e.map((x) => x.value) : []);
          }}
          onClick={() => {
            UpdateStatus(5, progressCauseList);
            AddFollowUp();
          }}
          loading={loading}
        />

        <div
          className={`menu menu-box-modal rounded-m ${imageModalVisible ? 'menu-active' : ''}`}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundRepeat: 'round',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}
          data-menu-height="cover"
          data-menu-width="cover"
          onClick={() => setImageModalVisible(false)}
        />
      </div>
    </>
  );
};

export default technicianMissionDetail;
