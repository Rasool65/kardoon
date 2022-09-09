import Form, { AjvError, IChangeEvent, ISubmitEvent, UiSchema } from '@rjsf/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IRequestDetailPageProp } from './IRequestDetailProp';
import type { JSONSchema7 } from 'json-schema';
import { APIURL_GET_PRODUCTS_ATTRIBUTES } from '@src/configs/apiConfig/apiUrls';
import { init_template } from './template';

const RequestDetailZero: FunctionComponent<IRequestDetailPageProp> = ({ handleClickNextToFirst }) => {
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [schema, setSchema] = useState<JSONSchema7>();
  // const [Ui, setUi] = useState<UiSchema>();
  const GetFormSchema = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<JSONSchema7>>(
        `${APIURL_GET_PRODUCTS_ATTRIBUTES}?CityId=${cityId}&ProductId=${state.ProductId}&ServiceTypeId=${state.ServiceTypeId}`
      )
      .then((result) => {
        setSchema(result.data.data);
        !result.data.data && handleClickNextToFirst();
        setLoading(false);
      });
  };
  const uiSchema = {
    'ui:widget': 'checkboxes',
  };
  // const GetFormUI = () => {
  //   setLoading(true);
  //   httpRequest.getRequest<IOutputResult<UiSchema>>('http://127.0.0.1:2500/getFormUI').then((result) => {
  //     setUi(result.data.data);
  //     setLoading(false);
  //   });
  // };
  useEffect(() => {
    // GetFormUI();
    GetFormSchema();
    init_template();
  }, []);

  const onSubmit = (data: ISubmitEvent<unknown>) => {
    handleClickNextToFirst(data);
  };

  const onChange = (event: IChangeEvent<unknown>) => {
    // console.log('change', event.formData);
  };

  const onError = (errors: AjvError[]) => {
    // console.error(errors);
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
              {schema && (
                <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} onChange={onChange} onError={onError}>
                  <Button className="btn btn-info" style={{ marginTop: '10px', width: '100px' }} type="submit">
                    ثبت
                  </Button>
                </Form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailZero;
