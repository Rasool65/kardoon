import { FunctionComponent } from 'react';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useTranslation } from 'react-i18next';
import Home from './Home';
import SelectCity from './SelectCity';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';

const MainPage: FunctionComponent<IPageProps> = (props) => {
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  debugger;
  const { t }: any = useTranslation();

  return <>{cityId ? <Home title="صفحه اصلی" /> : <SelectCity title="انتخاب شهر" />}</>;
};

export default MainPage;
