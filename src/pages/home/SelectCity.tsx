import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
import Header from './Header';
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
import { URL_HOME } from './../../configs/urls';

const SelectCity: FunctionComponent<IPageProps> = (props) => {
  const [countryDivision, setCountryDivision] = useState<any>();
  const httpRequest = useHttpRequest();
  let cities: any[] = [];

  const { t }: any = useTranslation();
  const navigate = useNavigate();

  const GetCities = () => {
    debugger;
    httpRequest
      .getRequest<IOutputResult<ICountryDivisionResultModel>>(
        APIURL_GET_Cities
        // 'http://127.0.0.1:2500/GetAdvertise'
      )
      .then((result) => {
        setCountryDivision(result.data.data);
      });
  };

  const fillCities = () => {
    countryDivision
      ? countryDivision.forEach((d: any) => {
          cities.push({ value: d.id, label: d.persianTitle });
        })
      : '';
  };

  useEffect(() => {
    fillCities();
  }, [countryDivision]);

  useEffect(() => {
    GetCities();
    document.title = props.title;
  }, [props.title]);

  //   useEffect(() => {
  //     CustomFunctions();
  //   }, [advertise, services]);

  const handleChange = () => {
    debugger;
    // history.push("/Home", Home);
  };
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
                navigate(URL_HOME, {
                  state: {
                    cityId: e.value,
                    cityName: e.label,
                  },
                });
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
