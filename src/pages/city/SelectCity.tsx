import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_GET_Cities } from '@src/configs/apiConfig/apiUrls';
import { useTranslation } from 'react-i18next';
import { ICountryDivisionResultModel } from '@src/models/output/countryDivision/ICountryDivisionResultModel';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { IUserModel } from '@src/models/output/authentication/ILoginResultModel';
import { APIURL_UPDATE_RESIDENCE_CITY } from './../../configs/apiConfig/apiUrls';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';
import { URL_MAIN } from '@src/configs/urls';

const SelectCity: FunctionComponent = (props) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const [countryDivision, setCountryDivision] = useState<any>();
  const httpRequest = useHttpRequest();
  let cities: any[] = [];
  // const [cityName, setCityName] = useState<string>();
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
        setCountryDivision(result.data.data);
      });
  };

  const UpdateResidenceCity = (userId: number, cityId: number) => {
    const body = {
      userId: userId,
      cityId: cityId,
    };
    httpRequest
      .updateRequest<IOutputResult<IUserModel>>(
        APIURL_UPDATE_RESIDENCE_CITY,
        // 'http://127.0.0.1:2500/UserResidenceCity',
        body
      )
      .then((result) => {
        dispatch(reloadUserData(result));
        navigate(
          URL_MAIN
          // , {state: {cityId: cityId}}
        );
        history.go(0);
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
    GetCities(); // call API
  }, []);

  useEffect(() => {
    Cities(); // for each City array
  }, [countryDivision]);
  return (
    <>
      <Select
        className="select-city"
        onInputChange={() => GetCities()}
        placeholder={t('SelectCity')}
        onChange={(e: any) => {
          UpdateResidenceCity(userData?.userId ? userData.userId : 0, e.value);
        }}
        options={cities}
        isSearchable={true}
        // defaultInputValue={cities[cities.findIndex((i) => i.value === userData?.profile.residenceCityId)]}
        defaultInputValue={userData?.profile.residenceCityName}
      />
    </>
  );
};

export default SelectCity;