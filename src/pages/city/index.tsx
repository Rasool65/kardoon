import { FunctionComponent } from 'react';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useTranslation } from 'react-i18next';
import SelectCity from './SelectCity';

const City: FunctionComponent<IPageProps> = (props) => {
  const { t }: any = useTranslation();

  return (
    <>
      <div id="page">
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
            <SelectCity />
          </div>
        </div>
      </div>
    </>
  );
};

export default City;
