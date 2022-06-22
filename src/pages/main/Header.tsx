import { useEffect, useState } from 'react';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ICountryDivisionResultModel } from '@src/models/output/countryDivision/ICountryDivisionResultModel';
import { APIURL_GET_Cities, APIURL_UPDATE_RESIDENCE_CITY } from '@src/configs/apiConfig/apiUrls';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IUserModel } from '@src/models/output/authentication/ILoginResultModel';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';
import Select from 'react-select';
import { RootStateType } from '@src/redux/Store';

const Header = ({ getServices, headerTitle }: any) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const [countryDivision, setCountryDivision] = useState<any>();
  const httpRequest = useHttpRequest();
  let cities: any[] = [];
  const { t }: any = useTranslation();
  const dispatch = useDispatch();

  const GetCities = () => {
    httpRequest
      .getRequest<IOutputResult<ICountryDivisionResultModel>>(
        APIURL_GET_Cities
        // 'http://127.0.0.1:2500/GetAdvertise'
      )
      .then((result) => {
        debugger;
        setCountryDivision(result.data.data);
      });
  };

  const UpdateResidenceCity = (userId: number, cityId: number) => {
    debugger;
    const body = {
      userId: userId,
      cityId: cityId,
    };
    httpRequest.updateRequest<IOutputResult<IUserModel>>(APIURL_UPDATE_RESIDENCE_CITY, body).then((result) => {
      debugger;
      dispatch(reloadUserData);
      getServices(userData?.profile.residenceCityId);
    });
  };

  const Cities = () => {
    countryDivision
      ? countryDivision.forEach((d: any) => {
          cities.push({ value: d.id, label: d.persianTitle });
        })
      : '';
  };

  useEffect(() => {
    Cities();
  }, [countryDivision]);

  useEffect(() => {
    GetCities();
  }, []);
  return (
    <>
      <div className="row" style={{ padding: '0 20px 0 20px', marginTop: '15px', position: 'relative', zIndex: '1' }}>
        <div className="col-1" style={{ padding: '0 0 0 0', textAlign: 'center', width: '30px' }}>
          <img
            // onClick={(e) => showMainMenu(e)}
            src={require('/src/scss/images/menu.png')}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            alt=""
          />
        </div>

        <div
          className="col-5"
          style={{
            padding: '0 0px 0 0',
            color: 'white',
            fontSize: '15px',
            textAlign: 'right',
          }}
        >
          {headerTitle}
        </div>

        <div className="col-6" style={{ padding: '0 0 0 0', textAlign: 'right' }}>
          {/* <span style={{ marginLeft: '10px', color: '#FFF' }}>شهر</span> */}
          <Select
            className="select-city"
            placeholder={t('SelectCity')}
            onChange={(e) => {
              debugger;
              UpdateResidenceCity(userData?.userId ? userData.userId : 0, e.value);
            }}
            options={cities}
            isSearchable={true}
            value={null}
          />
        </div>
      </div>

      <div className="card header-card shape-rounded" data-card-height="150">
        <div className="card-overlay bg-highlight opacity-95" />
        <div className="card-overlay dark-mode-tint" />
        <div className="card-bg bg-20" />
      </div>
    </>
  );
};
export default Header;
