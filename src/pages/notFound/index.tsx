import { FunctionComponent, useEffect } from 'react';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';

const NotFound: FunctionComponent<IPageProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <div className="page-404">
        <div className="data-box">
          <img src={require('@src/scss/images/forTest/404-image.svg')} alt="" />

          <div className="subtitle">متاسفم ، صفحه ی مور نظر پیدا نشد</div>
          <p>
            ما نتوانستیم صفحه ی مورد نظر شما را پیدا کنیم. شما میتوانید لیست صفحات را از{' '}
            <a href="https://kardoon.ir">منوی صفحه اصلی</a> مشاهده کنید.
          </p>
          <a href="https://tech.kardoon.ir/">www.tech.kardoon.ir</a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
