import PrevHeader from '@src/layout/PrevHeader';
import { FunctionComponent, useEffect, useState } from 'react';
import { customFunction } from '../city/template';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { generatePath, useNavigate } from 'react-router-dom';
import { URL_CHAT } from './../../configs/urls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ICategoryConversation } from './../../models/output/categoryConversation/ICategoryConversation';
import { APIURL_GET_CATEGORY_CONVERSATION } from '@src/configs/apiConfig/apiUrls';
import { useToast } from '@src/hooks/useToast';
import { Spinner } from 'reactstrap';

const Conversations: FunctionComponent<IPageProps> = (props) => {
  const [conversation, setConversation] = useState<ICategoryConversation[]>();
  const toast = useToast();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const [loading, setLoading] = useState<boolean>(false);
  const GetCategorys = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<ICategoryConversation[]>>(APIURL_GET_CATEGORY_CONVERSATION)
      .then((result) => {
        setConversation(result.data.data);
        setLoading(false);
      })
      .catch((result) => {
        toast.showError(result);
      });
  };

  const handleSearch = (e: any) => {
    let findData = conversation?.filter((el: any) => el.label.match(e.currentTarget.value));
    e.currentTarget.value ? setConversation(findData) : GetCategorys();
  };
  useEffect(() => {
    GetCategorys();
    customFunction();
  }, []);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <>
      <div id="page" className="conversation">
        <PrevHeader />
        <div className="page-content">
          <div className="page-title page-title-large"></div>
          <div className="card header-card shape-rounded" data-card-height="230">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
          </div>

          <div className="search-card card card-style mb-3 mt-3">
            <div className="search-box bg-theme rounded-m border-0">
              <i className="fa fa-search ms-n3"></i>
              <input type="text" onChange={(e) => handleSearch(e)} className="border-0" placeholder="جستجو " />
            </div>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px' }}>
              <Spinner style={{ width: '5rem', height: '5rem' }} />
            </div>
          ) : (
            <div className="card card-style">
              <div className="content mb-n2 pb-2">
                {conversation &&
                  conversation.length > 0 &&
                  conversation.map((item: ICategoryConversation, index: number) => {
                    return (
                      <div
                        onClick={() => navigate(generatePath(URL_CHAT, { id: item.value.toString() }))}
                        style={{ cursor: 'pointer', backgroundColor: 'aliceblue', borderRadius: '10px' }}
                        className="d-flex position-relative mb-4"
                      >
                        <div className="align-self-center me-auto m-2" style={{ fontWeight: 'bold' }}>
                          <h5 className="mb-n1 pt-1 font-600 font-16">{item.label}</h5>
                          <p className="mb-0 font-12"></p>
                        </div>
                        <div className="align-self-start ms-auto text-end m-2">
                          <span className="opacity-40 font-11"></span>
                          <br />
                          <span className="opacity-40 font-11"></span>
                          <br />
                          <span className="bg-red-dark font-10 badge float-end rounded-xl"></span>
                        </div>
                      </div>
                    );
                  })}

                {/* <div
                onClick={() => {
                  navigate(URL_CHAT, { state: { chatId: 500 } });
                }}
                style={{ cursor: 'pointer', backgroundColor: 'aliceblue', borderRadius: '10px' }}
                className="d-flex position-relative mb-4"
              >
                <div className="align-self-center me-auto m-2" style={{ fontWeight: 'bold' }}>
                  <h5 className="mb-n1 pt-1 font-600 font-16">امور نمایندگان</h5>
                  <p className="mb-0 font-12">نرخ جدید بروزرسانی شد.</p>
                </div>
                <div className="align-self-start ms-auto text-end m-2">
                  <span className="opacity-40 font-11">1401/07/04</span>
                  <br />
                  <span className="opacity-40 font-11">08:37:12</span>
                  <br />
                  <span className="bg-red-dark font-10 badge float-end rounded-xl">اهمیت بالا</span>
                </div>
              </div> */}
                {/* <div
                style={{ cursor: 'pointer', backgroundColor: 'aliceblue', borderRadius: '10px' }}
                className="d-flex position-relative mb-4"
              >
                <div className="align-self-center me-auto m-2">
                  <h5 className="mb-n1 pt-1 font-600 font-16">امور مشتریان</h5>
                  <p className="mb-0 font-12">سیستم کیف پول و پرداخت آنلاین راه اندازی شد.</p>
                </div>
                <div className="align-self-start ms-auto text-end m-2">
                  <span className="opacity-40 font-11">1401/07/02</span>
                  <br />
                  <span className="opacity-40 font-11">22:54:12</span>
                  <br />
                  <span className="bg-green-dark font-10 badge float-end rounded-xl">اهمیت پایین</span>
                </div>
              </div>
              <div
                style={{ cursor: 'pointer', backgroundColor: 'aliceblue', borderRadius: '10px' }}
                className="d-flex position-relative mb-4"
              >
                <div className="align-self-center me-auto m-2">
                  <h5 className="mb-n1 pt-1 font-600 font-16">امور پشتیبانی</h5>
                  <p className="mb-0 font-12">سایت جهت بروزرسانی فردا از ساعت 14:00 تا 14:45 از دسترس خارج می شود.</p>
                </div>
                <div className="align-self-start ms-auto text-end m-2">
                  <span className="opacity-40 font-11">1401/07/02</span>
                  <br />
                  <span className="opacity-40 font-11">22:54:12</span>
                  <br />
                  <span className="bg-yellow-dark font-10 badge float-end rounded-xl">اهمیت متوسط</span>
                </div>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Conversations;
