import PrevHeader from '@src/layout/PrevHeader';
import { FunctionComponent, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { customFunction } from '../city/template';
import { useLocation, useParams } from 'react-router-dom';
import { RootStateType } from '@src/redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import {
  APIURL_GET_CATEGORY_CONVERSATION,
  APIURL_GET_CHAT_CONVERSATION,
  APIURL_POST_NEW_MESSAGE,
  APIURL_PUT_SEEN_ALL_BY_CATEGORY,
} from '@src/configs/apiConfig/apiUrls';
import { IChatConversation, IMessage } from '@src/models/output/categoryConversation/IChatConversation';
import { useToast } from '@src/hooks/useToast';
import { DateHelper } from '@src/utils/dateHelper';
import { Input, Spinner } from 'reactstrap';
import { handleNewMessageCount, handleShowMessage } from '@src/redux/reducers/messageReducer';
import { useRecorder } from '@src/hooks/useRecorder';

const Chat: FunctionComponent<IPageProps> = () => {
  let { audioData, audioURL, isRecording, startRecording, stopRecording } = useRecorder();
  let { id } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const newMessage = useSelector((state: RootStateType) => state.message.newMessage);
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const httpRequest = useHttpRequest();
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>();
  const [toId, setToId] = useState<number>(0);
  const [displayReplay, setDisplayReplay] = useState<string>('none');
  const [replayTo, setReplayTo] = useState<number>();
  const [replayMessage, setReplayMessage] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [recordPerPage] = useState<number>(50);
  const [totalPage, setTotalPage] = useState<number>();
  const [scroll, setScroll] = useState<boolean>(true);

  const getMessages = (currentPage: number) => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IChatConversation<IMessage[]>>>(
        `${APIURL_GET_CHAT_CONVERSATION}?TechnicianId=${userData?.userId}&MessageCategory=${id}&PageNumber=${currentPage}&RecordsPerPage=${recordPerPage}`
      )
      .then((result) => {
        setTotalPage(Math.ceil(result.data.data.paging.totalItems! / recordPerPage));
        currentPage > 1
          ? setMessageList(result.data.data.messages.concat(messageList))
          : setMessageList(result.data.data.messages);
        setLoading(false);
        const Array = result.data.data.messages.filter((messages) => messages.from != userData?.userId);
        setToId(Array.at(-1)?.from!);
      })
      .catch((result) => {
        toast.showError(result);
        setLoading(false);
      });
  };

  const seenAllMessageByCategory = () => {
    const body = {
      userId: userData?.userId,
      category: Number(id),
    };
    setLoading(true);
    httpRequest
      .updateRequest<IOutputResult<any>>(APIURL_PUT_SEEN_ALL_BY_CATEGORY, body)
      .then((result) => {
        dispatch(handleNewMessageCount(0));
        setLoading(false);
      })
      .catch((result) => {
        toast.showError(result);
      });
  };

  const scrollDown = () => {
    var objDiv = document.getElementById('chatList');
    objDiv!.scrollTop = objDiv!.scrollHeight;
  };
  const handleSearch = (value: string) => {
    let findData = messageList.filter((el: IMessage) => el.message.match(value));
    value ? setMessageList(findData) : getMessages(1);
  };
  const sendMessage = (link?: string) => {
    setScroll(true);
    setBtnLoading(true);
    const body = {
      from: userData?.userId,
      to: toId,
      message: message,
      replyTo: replayTo,
      messageCategory: id,
      link: link,
    };
    httpRequest
      .postRequest<IOutputResult<IMessage>>(APIURL_POST_NEW_MESSAGE, body)
      .then((result) => {
        setDisplayReplay('none');
        setReplayMessage('');
        messageList.push(result.data.data);
        setMessage('');
        setBtnLoading(false);
      })
      .catch((result) => {
        setBtnLoading(false);
        toast.showError(result);
      });
  };

  useEffect(() => {
    getMessages(1);
    seenAllMessageByCategory();
    customFunction();
  }, []);

  useEffect(() => {
    dispatch(handleShowMessage(false));
    newMessage && (setMessageList([...messageList, newMessage]), setToId(newMessage.from), setReplayTo(undefined));
  }, [newMessage]);

  useEffect(() => {
    scroll && scrollDown();
    setReplayTo(undefined);
  }, [messageList.length]);
  return (
    <>
      <div id="page" className="message-page">
        <PrevHeader />
        <div
          className="replay-message"
          onClick={() => {
            setDisplayReplay('none');
            setReplayTo(undefined);
          }}
          style={{
            display: `${displayReplay}`,
          }}
        >
          <i className="fa fa-close p-1 pointer" />
          <p className="m-1 p-2 pointer">{replayMessage}</p>
        </div>
        <div id="footer-bar" className="d-flex">
          {/* <div className="attachment-icons">
            <a>
              <label className="pointer" htmlFor="img">
                <img src={require('@src/scss/images/forTest/camera.svg')} />
                <Input
                  // onChange={onImageFileChange}
                  style={{ display: 'none' }}
                  id="img"
                  type="file"
                  capture="user"
                  accept="image/*"
                />
              </label>
            </a>
            <a>
              <span hidden={isRecording} style={{ marginTop: 0 }}>
                <img
                  src={require('@src/scss/images/forTest/microphone.svg')}
                  onClick={() => {
                    startRecording();
                    // setAudioDisplay('initial');
                  }}
                />
              </span>
              <span hidden={!isRecording} style={{ marginTop: '5px' }}>
                <i
                  style={{ marginTop: 0 }}
                  className="fa fa-stop"
                  onClick={() => {
                    stopRecording();
                  }}
                />
              </span>
            </a>
          </div> */}
          <div className="flex-fill speach-input" style={{ flex: 'none', paddingTop: 'inherit' }}>
            <input
              type="text"
              className="form-control chat-input-text"
              value={message}
              onKeyDown={(e) => (e.code === 'Enter' || e.key === 'Enter' ? sendMessage() : '')}
              onChange={(e) => {
                setMessage(e.currentTarget.value);
              }}
              placeholder="پیام را وارد نمایید"
            />
            <div className="ms-3 speach-icon pointer" style={{ flex: 'none', paddingTop: 'inherit' }}>
              <a
                onClick={() => {
                  sendMessage();
                }}
                className="send-btn me-2"
              >
                {btnLoading ? (
                  <Spinner style={{ height: '0px', width: '18px', marginTop: '7px' }} />
                ) : (
                  <i className="fa fa-arrow-up mt-2" />
                )}
              </a>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="card header-card shape-rounded" data-card-height="170">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
          </div>
          <div className="search-card card card-style mb-3 mt-n2">
            <div className="search-box bg-theme rounded-m border-0">
              <i className="fa fa-search ms-n3"></i>
              <input
                type="text"
                onChange={(e) => handleSearch(e.currentTarget.value)}
                className="border-0"
                placeholder="جستجو "
              />
            </div>
          </div>

          <div
            onScroll={(e: any) => {
              e.target.scrollTop == 0 &&
                totalPage! > pageNumber &&
                (getMessages(pageNumber + 1), setPageNumber(pageNumber + 1), setScroll(false));
            }}
            className="content mt-5 pt-3"
            id="chatList"
            style={{
              overscrollBehavior: 'contain',
              overflowY: 'auto',
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px' }}>
                <Spinner style={{ width: '5rem', height: '5rem' }} />
              </div>
            ) : (
              messageList &&
              messageList?.length > 0 &&
              messageList?.map((message: IMessage, index: number) => {
                return (
                  <>
                    <div
                      id={message.id.toString()}
                      className={`speech-bubble ${
                        message.from == userData?.userId ? 'speech-right bg-highlight' : 'speech-left color-black'
                      }`}
                    >
                      {message.replyToId && (
                        <>
                          <a className="btn font-12 w-100 text-right" href={`#${message.replyToId}`}>
                            {message.replyTo.message}
                          </a>
                          <hr />
                        </>
                      )}
                      {message.from == userData?.userId
                        ? `${message.message}`
                        : `${message.fromLastName ? message.fromLastName + ':' : ''}${message.message}`}
                      <div
                        className="pointer"
                        onClick={() => {
                          setDisplayReplay('flex');
                          setReplayTo(message.id);
                          message.from != userData?.userId && setToId(message.from);
                          setReplayMessage(message.message);
                        }}
                      >
                        <div>
                          <em className="speech-read mb-n3 m-1"> {DateHelper.isoDateTopersian(message.createDateTime)}</em>
                          <em className="speech-read mb-n3 m-1"> {DateHelper.splitTime(message.createDateTime)}</em>
                        </div>
                        <div className="justify-content-between">
                          {message.seen && (
                            <em className="speech-read mb-n3 m-1">
                              <i className="fa fa-check" />
                            </em>
                          )}
                          <div>
                            <em className="speech-read mb-n3 float-end">
                              <i className="fa fa-share pointer font-14" />
                            </em>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
