import Form, { AjvError, IChangeEvent, ISubmitEvent, UiSchema } from '@rjsf/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IRequestDetailPageProp } from './IRequestDetailProp';
import { CustomFunctions } from '@src/utils/custom';
import type { JSONSchema7 } from 'json-schema';
import { APIURL_GET_PRODUCTS_ATTRIBUTES } from '@src/configs/apiConfig/apiUrls';

const RequestDetailZero: FunctionComponent<IRequestDetailPageProp> = ({ handleClickNextToFirst }) => {
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);

  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [schema, setSchema] = useState<JSONSchema7>();
  const [Ui, setUi] = useState<UiSchema>();
  const GetFormSchema = () => {
    debugger;
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<JSONSchema7>>(
        `${APIURL_GET_PRODUCTS_ATTRIBUTES}?CityId=${cityId}&ProductId=${state.ProductId}&ServiceTypeId=${state.ServiceTypeId}`
        // 'http://127.0.0.1:2500/getFormSchema'
      )
      .then((result) => {
        setSchema(result.data.data);
        !result.data.data && handleClickNextToFirst();
        setLoading(false);
      });
  };

  const GetFormUI = () => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<UiSchema>>('http://127.0.0.1:2500/getFormUI').then((result) => {
      setUi(result.data.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    GetFormSchema();
    // GetFormUI();
    CustomFunctions();
  }, []);

  const onSubmit = (data: ISubmitEvent<unknown>) => {
    handleClickNextToFirst(data);
  };

  const onChange = (event: IChangeEvent<unknown>) => {
    console.log('change', event.formData);
  };

  const onError = (errors: AjvError[]) => {
    console.error(errors);
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
          فرم ساز
        </div>

        <div className="card header-card shape-rounded" data-card-height="150">
          <div className="card-overlay bg-highlight opacity-95" />
          <div className="card-overlay dark-mode-tint" />
          <div className="card-bg bg-20" />
        </div>

        <div className="card card-style p-4">
          {loading ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px' }}>
                <Spinner style={{ width: '5rem', height: '5rem' }} />
              </div>
            </>
          ) : (
            <div>
              {schema && <Form schema={schema} uiSchema={Ui} onSubmit={onSubmit} onChange={onChange} onError={onError} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailZero;