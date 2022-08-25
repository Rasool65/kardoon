import { APIURL_GET_TECHNICIAN_PROFILE } from '@src/configs/apiConfig/apiUrls';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ITechnicianProfileResultModel } from '@src/models/output/technician/ITechnicianProfileResultModel';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { FunctionComponent, useState, useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import PrevHeader from '@src/layout/PrevHeader';
import { CustomFunctions } from '@src/utils/custom';
const TechnicianProfile: FunctionComponent<IPageProps> = (props) => {
  const httpRequest = useHttpRequest();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const [profile, setProfile] = useState<ITechnicianProfileResultModel>();
  const GetTechnicianProfile = () => {
    httpRequest
      .getRequest<IOutputResult<ITechnicianProfileResultModel>>(`${APIURL_GET_TECHNICIAN_PROFILE}?id=${id}`)
      .then((result) => {
        setProfile(result.data.data);
      });
  };
  useEffect(() => {
    CustomFunctions();
    GetTechnicianProfile();
  }, []);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <>
      <div id="page">
        <PrevHeader />
        <div className="page-content">
          <main>
            <section>
              <div>
                <div>
                  <figure style={{ marginTop: '20px' }}>
                    <img
                      src={profile?.avatarUrl ? `${profile?.avatarUrl}` : require('@src/scss/images/profile.png')}
                      alt="Technician_profile"
                    />
                  </figure>
                </div>
                <div>
                  <p style={{ marginBottom: 0 }}>{profile?.fullName}</p>
                  <p style={{ marginBottom: 0 }}>{profile?.mobileNumber}</p>
                </div>
              </div>
              <div className="">
                <div className="">وضعیت:</div>
                <div className="">
                  <span style={{ border: '1px solid rgb(96, 96, 96)' }}>
                    {profile?.status ? (
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
              <div className="">
                <div>
                  <div className="">{UtilsHelper.threeDigitSeparator(profile?.incomeMoney)} تومان</div>
                  <div className="">درآمد شما از کاردون</div>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div className="">
                    <div>{profile?.workDays}</div>
                    <div>روز در کاردون</div>
                  </div>
                  <div className="">
                    <div>{profile?.successfulMissions}</div>
                    <div>ماموریت موفق</div>
                  </div>
                  <div className="">
                    <div>{profile?.customerSatisfaction}</div>
                    <div>رضایت مشتری</div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default TechnicianProfile;
