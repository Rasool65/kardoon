import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { RootStateType } from '../../redux/Store';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { ICustomerResultModel } from '@src/models/output/customer/ICustomerResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { CheckSquare, Grid, Mail, MessageSquare, List, Check, X, Circle, Map, MapPin, Navigation } from 'react-feather';
import { Calendar } from 'react-modern-calendar-datepicker';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { setActualRoute, setDriverRoute, setPlannedRoute } from '@src/redux/reducers/routeReducer';

const Home: FunctionComponent<IPageProps> = (props: any) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div className="header header-fixed header-auto-show header-logo-app">
        <a href="#" data-back-button className="header-title header-subtitle">
          Back to Events
        </a>
        <a href="#" data-back-button className="header-icon header-icon-1">
          <i className="fas fa-arrow-right"></i>
        </a>
        <a href="#" data-toggle-theme className="header-icon header-icon-2 show-on-theme-dark">
          <i className="fas fa-sun"></i>
        </a>
        <a href="#" data-toggle-theme className="header-icon header-icon-2 show-on-theme-light">
          <i className="fas fa-moon"></i>
        </a>
        <a href="#" data-menu="menu-highlights" className="header-icon header-icon-3">
          <i className="fas fa-brush"></i>
        </a>
        <a href="#" data-menu="menu-main" className="header-icon header-icon-4">
          <i className="fas fa-bars"></i>
        </a>
      </div>
      <div id="footer-bar" className="footer-bar-5">
        <a href="index-components.html">
          <i
            data-feather="heart"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="red-dark"
            data-feather-bg="red-fade-light"
          ></i>
          <span>Features</span>
        </a>
        <a href="index-media.html">
          <i
            data-feather="image"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="green-dark"
            data-feather-bg="green-fade-light"
          ></i>
          <span>Media</span>
        </a>
        <a href="index.html">
          <i
            data-feather="home"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="blue-dark"
            data-feather-bg="blue-fade-light"
          ></i>
          <span>Home</span>
        </a>
        <a href="index-pages.html" className="active-nav">
          <i
            data-feather="file"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="brown-dark"
            data-feather-bg="brown-fade-light"
          ></i>
          <span>Pages</span>
        </a>
        <a href="index-settings.html">
          <i
            data-feather="settings"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="dark-dark"
            data-feather-bg="gray-fade-light"
          ></i>
          <span>Settings</span>
        </a>
      </div>

      <div className="page-content">
        <div className="page-title page-title-large">
          <h2 data-username="Enabled!" className="greeting-text"></h2>
          <a
            href="#"
            data-menu="menu-main"
            className="bg-fade-highlight-light shadow-xl preload-img"
            data-src="images/avatars/5s.png"
          ></a>
        </div>
        <div className="card header-card shape-rounded" data-card-height="210">
          <div className="card-overlay bg-highlight opacity-95"></div>
          <div className="card-overlay dark-mode-tint"></div>
          <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div className="card header-card shape-rounded" data-card-height="150">
          <div className="card-overlay bg-highlight opacity-95"></div>
          <div className="card-overlay dark-mode-tint"></div>
          <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div className="card card-style mb-0">
          <div className="card mb-0 bg-18" data-card-height="570">
            <div className="card-bottom text-center">
              <h1 className="color-white font-32 font-700">Parkour Event</h1>
              <p className="font-14 color-white px-4 pb-3 opacity-60">
                Run through the city scape. Show us what your body can do. It's an event where very few last till the end.
              </p>
            </div>
            <div className="card-overlay bg-gradient opacity-90"></div>
          </div>
        </div>
        <a href="#" className="btn btn-center-l btn-l bg-highlight font-700 text-uppercase under-slider-btn rounded-sm mt-n4">
          Join Event
        </a>

        <div className="content mb-2 mt-4">
          <h5 className="float-start font-16 font-500">Join your Friends</h5>
          <a className="float-end font-12 color-highlight mt-n1" href="#">
            View All
          </a>
          <div className="clearfix"></div>
        </div>

        <div className="card card-style">
          <div className="content">
            <div className="d-flex">
              <div className="w-35 border-right pe-3 border-highlight">
                <img
                  src="images/empty.png"
                  data-src="images/avatars/4s.png"
                  width="70"
                  className="preload-img rounded-circle bg-highlight"
                />
                <h6 className="font-14 font-600 mt-2 text-center">Vincent M.</h6>
                <p className="color-highlight mt-n2 font-9 font-400 text-center mb-0 pb-0">Event Creator</p>
              </div>
              <div className="w-65 ps-3 pt-2">
                <h4>Friends that are Going</h4>
                <p className="color-highlight mt-n2 font-10 mb-2">John, Jack, Jason and 16 others</p>
                <a href="#">
                  <img
                    src="images/empty.png"
                    data-src="images/avatars/1s.png"
                    width="30"
                    className="preload-img rounded-circle bg-teal-dark"
                  />
                </a>
                <a href="#">
                  <img
                    src="images/empty.png"
                    data-src="images/avatars/2s.png"
                    width="30"
                    className="preload-img rounded-circle bg-brown-dark"
                  />
                </a>
                <a href="#">
                  <img
                    src="images/empty.png"
                    data-src="images/avatars/3s.png"
                    width="30"
                    className="preload-img rounded-circle bg-red-dark"
                  />
                </a>
                <a href="#">
                  <img
                    src="images/empty.png"
                    data-src="images/avatars/4s.png"
                    width="30"
                    className="preload-img rounded-circle bg-green-dark"
                  />
                </a>
                <a href="#">
                  <img
                    src="images/empty.png"
                    data-src="images/avatars/1s.png"
                    width="30"
                    className="preload-img rounded-circle bg-blue-dark"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="content mb-2">
          <h5 className="float-start font-16 font-500">Capture any Moment</h5>
          <a className="float-end font-12 color-highlight mt-n1" href="#">
            View All
          </a>
          <div className="clearfix"></div>
        </div>

        <div className="splide double-slider visible-slider slider-no-arrows slider-no-dots" id="double-slider-1">
          <div className="splide__track">
            <div className="splide__list">
              <div className="splide__slide ps-3">
                <div className="bg-theme rounded-m shadow-m text-center">
                  <i
                    className="mt-4 mb-4"
                    data-feather="shield"
                    data-feather-line="1"
                    data-feather-size="45"
                    data-feather-color="blue-dark"
                    data-feather-bg="blue-fade-light"
                  ></i>
                  <h5 className="font-16">Elite Quality</h5>
                  <p className="line-height-s font-11 pb-4">
                    Built with care and <br />
                    every detail in mind
                  </p>
                </div>
              </div>
              <div className="splide__slide ps-3">
                <div className="bg-theme rounded-m shadow-m text-center">
                  <i
                    className="mt-4 mb-4"
                    data-feather="smartphone"
                    data-feather-line="1"
                    data-feather-size="45"
                    data-feather-color="brown-dark"
                    data-feather-bg="brown-fade-light"
                  ></i>
                  <h5 className="font-16">PWA Ready</h5>
                  <p className="line-height-s font-11 pb-4">
                    Just add it to your <br />
                    Home Screen
                  </p>
                </div>
              </div>
              <div className="splide__slide ps-3">
                <div className="bg-theme rounded-m shadow-m text-center">
                  <i
                    className="mt-4 mb-4"
                    data-feather="sun"
                    data-feather-line="1"
                    data-feather-size="45"
                    data-feather-color="yellow-dark"
                    data-feather-bg="yellow-fade-light"
                  ></i>
                  <h5 className="font-16">Eye Friendly</h5>
                  <p className="line-height-s font-11 pb-4">
                    Light & Dark and <br /> Auto Dark Detection
                  </p>
                </div>
              </div>
              <div className="splide__slide ps-3">
                <div className="bg-theme rounded-m shadow-m text-center">
                  <i
                    className="mt-4 mb-4"
                    data-feather="smile"
                    data-feather-line="1"
                    data-feather-size="45"
                    data-feather-color="green-dark"
                    data-feather-bg="green-fade-light"
                  ></i>
                  <h5 className="font-16">Easy Code</h5>
                  <p className="line-height-s font-11 pb-4">
                    Built for you and me <br /> copy and paste code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card preload-img" data-src="images/pictures/20s.jpg">
          <div className="card-body py-4">
            <h2 className="color-white font-600 mb-0">Event Highlights</h2>
            <p className="color-white mb-4 opacity-70">Enjoy your spotlight. We'll capture every moment.</p>
            <div className="card card-style py-3 ms-0 me-0 mb-0 bg-theme">
              <div className="d-flex px-3 mb-4">
                <div className="pe-3 align-self-center">
                  <h5 className="font-700 mb-0 font-17">Weddings</h5>
                  <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta a ex ac iaculis.</p>
                </div>
                <div>
                  <img src="images/pictures/6s.jpg" width="110" className="rounded-sm" />
                </div>
              </div>
              <div className="d-flex px-3 mb-4">
                <div className="pe-3 align-self-center">
                  <h5 className="font-700 mb-0 font-17">Baby Showers</h5>
                  <p className="mb-0">
                    Integer maximus quis sem a posuere. Proin posuere velit sit amet metus rhoncus, ut lobortis lectus feugiat.
                  </p>
                </div>
                <div>
                  <img src="images/pictures/9s.jpg" width="110" className="rounded-sm" />
                </div>
              </div>
              <div className="d-flex px-3 mb-4">
                <div className="pe-3 align-self-center">
                  <h5 className="font-700 mb-0 font-17">Birthday Parties</h5>
                  <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta a ex ac iaculis.</p>
                </div>
                <div>
                  <img src="images/pictures/3s.jpg" width="110" className="rounded-sm" />
                </div>
              </div>
              <a href="#" className="btn btn-margins mt-2 btn-m bg-highlight font-700 text-uppercase mb-0 rounded-sm shadow-xxl">
                Book a Photoshoot
              </a>
            </div>
          </div>
          <div className="card-overlay bg-highlight opacity-90"></div>
          <div className="card-overlay dark-mode-tint"></div>
        </div>
        <div className="content">
          <div className="row text-center">
            <a href="#" className="col-4">
              <div className="card card-style mx-0 py-4 mb-0">
                <i className="fab fa-facebook-square font-40 color-facebook"></i>
                <p className="font-10">Like Our Page</p>
              </div>
            </a>
            <a href="#" className="col-4">
              <div className="card card-style mx-0 py-4 mb-0">
                <i className="fab fa-instagram-square font-40 color-instagram"></i>
                <p className="font-10">See Our Stories</p>
              </div>
            </a>
            <a href="#" className="col-4">
              <div className="card card-style mx-0 py-4 mb-0">
                <i className="fab fa-twitter-square font-40 color-twitter"></i>
                <p className="font-10">Follow our Tweets</p>
              </div>
            </a>
          </div>
        </div>

        <div className="card card-style mb-0">
          <div className="content text-center">
            <h2>Simple and Easy</h2>
            <p className="boxed-text-xl">Our customers love our professionalism and speed of delivery. We love each event.</p>
          </div>
          <div className="divider divider-small mb-3 bg-highlight"></div>

          <div className="content mb-2">
            <div className="d-flex mb-4 pb-3">
              <div className="align-self-center ms-n2 disabled">
                <p className="text-center mb-1 opacity-50">Step</p>
                <h1 className="font-45 text-center icon-90 color-highlight">01</h1>
              </div>
              <div className="align-self-center">
                <div className="icon-80 text-center">
                  <i
                    data-feather="calendar"
                    data-feather-line="1"
                    data-feather-size="51"
                    data-feather-color="blue-dark"
                    data-feather-bg="blue-fade-light"
                  ></i>
                </div>
              </div>
              <div className="ps-2">
                <h5 className="font-16 font-600">Book your Event</h5>
                <p>Let's talk about what you need. We're here to listen to your plans and make them a reality.</p>
              </div>
            </div>
            <div className="d-flex mb-4 pb-3">
              <div className="align-self-center ms-n2 disabled">
                <p className="text-center mb-1 opacity-50">Step</p>
                <h1 className="font-45 text-center icon-90 color-highlight">02</h1>
              </div>
              <div className="align-self-center">
                <div className="icon-80 text-center">
                  <i
                    data-feather="camera"
                    data-feather-line="1"
                    data-feather-size="51"
                    data-feather-color="green-dark"
                    data-feather-bg="green-fade-light"
                  ></i>
                </div>
              </div>
              <div className="ps-2">
                <h5 className="font-16 font-600">Enjoy your Event</h5>
                <p>Don't worry about us. We'll be there capturing every gorgeous moment. Enjoy your spotlight!</p>
              </div>
            </div>
            <div className="d-flex mb-4 pb-3">
              <div className="align-self-center ms-n2 disabled">
                <p className="text-center mb-1 opacity-50">Step</p>
                <h1 className="font-45 text-center icon-90 color-highlight">03</h1>
              </div>
              <div className="align-self-center">
                <div className="icon-80 text-center">
                  <i
                    data-feather="gift"
                    data-feather-line="1"
                    data-feather-size="51"
                    data-feather-color="red-dark"
                    data-feather-bg="red-fade-light"
                  ></i>
                </div>
              </div>
              <div className="ps-2">
                <h5 className="font-16 font-600">Remember it Forever</h5>
                <p className="mb-0">
                  In no time flat after your event, we'll deliver the pack agreed via our initial call. It's that easy!
                </p>
              </div>
            </div>
          </div>
        </div>
        <a
          href="#"
          className="btn btn-center-xl btn-l bg-highlight font-700 text-uppercase under-slider-btn rounded-sm mt-n4 mb-4"
        >
          Schedule your Event
        </a>

        <div className="footer" data-menu-load="menu-footer.html"></div>
      </div>

      <div
        id="menu-share"
        className="menu menu-box-bottom menu-box-detached rounded-m"
        data-menu-load="menu-share.html"
        data-menu-height="420"
        data-menu-effect="menu-over"
      ></div>

      <div
        id="menu-highlights"
        className="menu menu-box-bottom menu-box-detached rounded-m"
        data-menu-load="menu-colors.html"
        data-menu-height="510"
        data-menu-effect="menu-over"
      ></div>

      <div
        id="menu-main"
        className="menu menu-box-right menu-box-detached rounded-m"
        data-menu-width="260"
        data-menu-load="menu-main.html"
        data-menu-active="nav-pages"
        data-menu-effect="menu-over"
      ></div>
    </>
  );
};

export default Home;
