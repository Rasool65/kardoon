import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { Col, Container, Row } from 'reactstrap';

const Home2: FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div className="card card-style">
        <div className="content">
          Packed with powerful built pages that are highly customizable and blazing fast to load. We've categorized our pages by
          purpose to make it easier for you to find them.
        </div>
      </div>
      <div className="row text-center mb-0">
        <a href="pages-list.html" className="col-6 pe-2">
          <div className="card card-style me-0 mb-3">
            <h1 className="center-text pt-4 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-file"
                data-feather-line="1"
                data-feather-size="50"
                data-feather-color="blue-dark"
                data-feather-bg="blue-fade-light"
                style={{ strokeWidth: 1, width: '50px', height: '50px' }}
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </h1>
            <h4 className="color-theme font-600">General</h4>
            <p className="mt-n2 font-11 color-highlight">Multi Purpose Pages</p>
            <p className="font-10 opacity-30 mb-1">Tap to View</p>
          </div>
        </a>
        <a href="pages-appstyled-list.html" className="col-6 ps-2">
          <div className="card card-style ms-0 mb-3">
            <h1 className="center-text pt-4 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-smartphone"
                data-feather-line="1"
                data-feather-size="50"
                data-feather-color="green-dark"
                data-feather-bg="green-fade-light"
                style={{ strokeWidth: 1, width: '50px', height: '50px' }}
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </h1>
            <h4 className="color-theme font-600">App Styled</h4>
            <p className="mt-n2 font-11 color-highlight">Designed like Apps</p>
            <p className="font-10 opacity-30 mb-1">Tap to View</p>
          </div>
        </a>
        <a href="pages-starters.html" className="col-6 pe-2">
          <div className="card card-style me-0 mb-3">
            <h1 className="center-text pt-4 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-box"
                data-feather-line="1"
                data-feather-size="50"
                data-feather-color="magenta-dark"
                data-feather-bg="magenta-fade-light"
                style={{ strokeWidth: 1, width: '50px', height: '50px' }}
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </h1>
            <h4 className="color-theme font-600">Starters</h4>
            <p className="mt-n2 font-11 color-highlight">Walkthrough &amp; Splash</p>
            <p className="font-10 opacity-30 mb-1">Tap to View</p>
          </div>
        </a>
        <a href="component-action-sheets.html" className="col-6 ps-2">
          <div className="card card-style ms-0 mb-3">
            <h1 className="center-text pt-4 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-zap"
                data-feather-line="1"
                data-feather-size="50"
                data-feather-color="yellow-dark"
                data-feather-bg="yellow-fade-light"
                style={{ strokeWidth: 1, width: '50px', height: '50px' }}
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </h1>
            <h4 className="color-theme font-600">Actions</h4>
            <p className="mt-n2 font-11 color-highlight">Modal Menus &amp; Actions</p>
            <p className="font-10 opacity-30 mb-1">Tap to View</p>
          </div>
        </a>
      </div>
    </>
  );
};

export default Home2;
