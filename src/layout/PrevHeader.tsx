import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

const PrevHeader: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-title page-title-small">
        <h2>
          <a href="#" onClick={() => navigate(-1)}>
            <i className="fa fa-arrow-right mx-2"></i>
            بازگشت
          </a>
        </h2>
        {/* <a
              href="#"
              data-menu="menu-main"
              className="bg-fade-highlight-light shadow-xl preload-img"
              data-src="images/avatars/5s.png"
            ></a> */}
      </div>
      <div className="card header-card shape-rounded" data-card-height="150">
        <div className="card-overlay bg-highlight opacity-95"></div>
        <div className="card-overlay dark-mode-tint"></div>
        <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
      </div>
    </>
  );
};

export default PrevHeader;
