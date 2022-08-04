import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_GET_CITIES, APIURL_GET_Cities, APIURL_GET_PROVINES } from '@src/configs/apiConfig/apiUrls';
import { useTranslation } from 'react-i18next';
import { ICountryDivisionResultModel } from '@src/models/output/countryDivision/ICountryDivisionResultModel';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { IUserModel } from '@src/models/output/authentication/ILoginResultModel';
import { APIURL_UPDATE_RESIDENCE_CITY } from './../../configs/apiConfig/apiUrls';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';
import { URL_MAIN } from '@src/configs/urls';
import { IProvinceResultModel } from '@src/models/output/countryDivision/IProvinceResultModel';
import { ICitiesResultModel } from '@src/models/output/countryDivision/ICitiesResultModel';

const SelectCity: FunctionComponent = (props) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const auth = useSelector((state: RootStateType) => state.authentication.isAuthenticate);
  const [result, setResult] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GetProvincesList = () => {
    httpRequest.getRequest<IOutputResult<IProvinceResultModel>>(`${APIURL_GET_PROVINES}?ParentId=3`).then((result) => {
      setResult(result.data.data);
    });
  };

  const GetCitiesList = (provinesId: number) => {
    provinesId &&
      httpRequest.getRequest<IOutputResult<ICitiesResultModel>>(`${APIURL_GET_CITIES}?ParentId=${provinesId}`).then((result) => {
        setResult(result.data.data);
      });
  };

  const UpdateResidenceCity = (userId: number, cityId: number) => {
    const body = {
      userId: userId,
      cityId: cityId,
    };
    httpRequest.updateRequest<IOutputResult<IUserModel>>(APIURL_UPDATE_RESIDENCE_CITY, body).then((result) => {
      dispatch(reloadUserData(result));
      navigate(URL_MAIN);
      history.go(0);
    });
  };
  const onchange = (e: any) => {
    switch (e.length) {
      case 0:
        GetProvincesList();
        break;
      case 1:
        GetCitiesList(e[0].value);
        break;
      case 2:
        auth
          ? UpdateResidenceCity(userData?.userId ? userData.userId : 0, e[1].value)
          : (localStorage.setItem('city', JSON.stringify(e[1])), navigate(URL_MAIN), history.go(0));

        break;
    }
  };
  useEffect(() => {
    GetProvincesList();
  }, []);

  return (
    <>
      <Select
        className="select-city"
        onChange={(e: any) => {
          onchange(e);
        }}
        placeholder={
          auth
            ? userData?.profile.residenceCityName
            : localStorage.getItem('city') && JSON.parse(localStorage.getItem('city')!).label
        }
        options={result}
        isSearchable={true}
        isMulti
      />
    </>
  );
};

export default SelectCity;
