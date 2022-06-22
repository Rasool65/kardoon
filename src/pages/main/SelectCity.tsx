import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IServicesResultModel } from '@src/models/output/services/IServicesResultModel';
import { APIURL_GET_ADVERTISE, APIURL_GET_Cities, APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { BASE_URL } from '@src/configs/apiConfig/baseUrl';
import { IAdvertiseResultModel } from '@src/models/output/advertise/IAdvertiseResultModel';
import { useTranslation } from 'react-i18next';
import { CustomFunctions } from '@src/utils/custom';
import { ICountryDivisionResultModel } from '@src/models/output/countryDivision/ICountryDivisionResultModel';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { useLocalStorage } from './../../hooks/useLocalStorage';
import { IUserModel } from '@src/models/output/authentication/ILoginResultModel';
import { APIURL_UPDATE_RESIDENCE_CITY } from './../../configs/apiConfig/apiUrls';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';
import { URL_MAIN } from '@src/configs/urls';

const SelectCity: FunctionComponent<IPageProps> = (props) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const [countryDivision, setCountryDivision] = useState<any>();
  const httpRequest = useHttpRequest();
  let cities: any[] = [];
  const { t }: any = useTranslation();
  const navigate = useNavigate();
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
      navigate(URL_MAIN);
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

  //   useEffect(() => {
  //     CustomFunctions();
  //   }, [advertise, services]);

  return (
    <>
      <div id="page">
        {/* <Header/> */}

        <div className="page-content">
          <div className="page-title page-title-small pointer" style={{ color: '#FFF', width: 'fit-content', fontSize: '16px' }}>
            {t('SelectCity')}
          </div>

          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95" />
            <div className="card-overlay dark-mode-tint" />
            <div className="card-bg bg-20" />
          </div>

          <div className="card card-style p-4" style={{ height: '440px' }}>
            {t('PleaseSelectCity')}
            <Select
              className="select-city"
              placeholder={t('SelectCity')}
              //   onChange={(e: any) => handleChange()}
              onChange={(e) => {
                debugger;
                UpdateResidenceCity(userData?.userId ? userData.userId : 0, e.value);
              }}
              options={cities}
              isSearchable={true}
              value={null}
            />
          </div>

          {/* <FooterCard /> */}
        </div>
      </div>
    </>
  );
};

export default SelectCity;
