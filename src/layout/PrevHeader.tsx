import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleShowMessage } from '@src/redux/reducers/messageReducer';

const PrevHeader: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="page-title page-title-small">
        <h2>
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(-1), dispatch(handleShowMessage(true));
            }}
          >
            <i className="fa fa-arrow-right mx-2"></i>
            بازگشت
          </a>
        </h2>
        {/* <a
              style={{cursor:'pointer'}}
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
