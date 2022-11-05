import Header from './Header';
import Footer from './Footer';
import { FunctionComponent } from 'react';
import IPageProps from '@src/configs/routerConfig/IPageProps';

const PublicLayout = (props: any) => {
  const { children, title } = props;

  return (
    <div id="body">
      {/* <Header />
      <Footer /> */}
      <div className="page-content">
        {/* header and footer bar go here */}
        <div className="header header-fixed header-auto-show header-logo-app">
          <a href="index.html" className="header-title">
            AZURES
          </a>
          <a style={{ cursor: 'pointer' }} data-menu="menu-main" className="header-icon header-icon-1">
            <i className="fas fa-bars"></i>
          </a>
          <a style={{ cursor: 'pointer' }} data-toggle-theme className="header-icon header-icon-2 show-on-theme-dark">
            <i className="fas fa-sun"></i>
          </a>
          <a style={{ cursor: 'pointer' }} data-toggle-theme className="header-icon header-icon-2 show-on-theme-light">
            <i className="fas fa-moon"></i>
          </a>
          <a style={{ cursor: 'pointer' }} data-menu="menu-highlights" className="header-icon header-icon-3">
            <i className="fas fa-brush"></i>
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
          <a href="index.html" className="active-nav">
            <i
              data-feather="home"
              data-feather-line="1"
              data-feather-size="21"
              data-feather-color="blue-dark"
              data-feather-bg="blue-fade-light"
            ></i>
            <span>Home</span>
          </a>
          <a href="index-pages.html">
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
              style={{ cursor: 'pointer' }}
              data-menu="menu-main"
              className="bg-fade-highlight-light shadow-xl preload-img"
              data-src="images/avatars/5s.png"
            ></a>
          </div>
          <div className="card header-card shape-rounded" data-card-height="210">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src={require('src/scss/images/pictures/20s.jpg')}></div>
          </div>

          {/* Homepage Slider */}
          <div className="splide single-slider slider-no-arrows slider-no-dots homepage-slider" id="single-slider-1">
            <div className="splide__track">
              <div className="splide__list">
                <div className="splide__slide">
                  <div className="card rounded-l mx-2 text-center shadow-l bg-17" data-card-height="320">
                    <div className="card-bottom">
                      <h1 className="font-24 font-700">Meet Azures</h1>
                      <p className="boxed-text-xl">
                        Azures brings beauty and colors to your Mobile device with a stunning user interface to match.
                      </p>
                    </div>
                    <div className="card-overlay bg-gradient-fade"></div>
                  </div>
                </div>
                <div className="splide__slide">
                  <div className="card rounded-l mx-2 text-center shadow-l bg-8" data-card-height="320">
                    <div className="card-bottom">
                      <h1 className="font-24 font-700">Beyond Powerful</h1>
                      <p className="boxed-text-xl">
                        Azures is a Mobile Web App Kit, fully featured, supporting PWA and Native Dark Mode!
                      </p>
                    </div>
                    <div className="card-overlay bg-gradient-fade"></div>
                  </div>
                </div>
                <div className="splide__slide">
                  <div className="card rounded-l mx-2 text-center shadow-l bg-14" data-card-height="320">
                    <div className="card-bottom">
                      <h1 className="font-24 font-700">A-Level Quality</h1>
                      <p className="boxed-text-xl">
                        We build custom, premium products, that are easy to use and provide all features for you!
                      </p>
                    </div>
                    <div className="card-overlay bg-gradient-fade"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content mt-0">
            <div className="row">
              <div className="col-6">
                <a
                  style={{ cursor: 'pointer' }}
                  className="btn btn-full btn-m rounded-s text-uppercase font-700 shadow-xl bg-highlight"
                >
                  Purchase
                </a>
              </div>
              <div className="col-6">
                <a
                  style={{ cursor: 'pointer' }}
                  className="btn btn-full btn-border btn-m rounded-s text-uppercase font-700 shadow-l border-highlight color-highlight"
                >
                  Contact US
                </a>
              </div>
            </div>
          </div>

          <div className="content mb-2">
            <h5 className="float-start font-16 font-500">Quality Features</h5>
            <a className="float-end font-12 color-highlight mt-n1" style={{ cursor: 'pointer' }}>
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

          <div className="card preload-img" data-src={require('src/scss/images/pictures/20s.jpg')}>
            <div className="card-body">
              <h4 className="color-white">Built For You</h4>
              <p className="color-white">
                Our products suit your website, running incredibly fast and provide an unmatched UX and UI.
              </p>
              <div className="card card-style ms-0 me-0 bg-theme">
                <div className="row mt-3 pt-1 mb-3">
                  <div className="col-6">
                    <i
                      className="float-start ms-3 me-3"
                      data-feather="globe"
                      data-feather-line="1"
                      data-feather-size="35"
                      data-feather-color="blue-dark"
                      data-feather-bg="blue-fade-light"
                    ></i>
                    <h5 className="color-theme float-start font-13 font-500 line-height-s pb-3 mb-3">
                      Mobile
                      <br />
                      Website
                    </h5>
                  </div>
                  <div className="col-6">
                    <i
                      className="float-start ms-3 me-3"
                      data-feather="smartphone"
                      data-feather-line="1"
                      data-feather-size="35"
                      data-feather-color="dark-dark"
                      data-feather-bg="dark-fade-light"
                    ></i>
                    <h5 className="color-theme float-start font-13 font-500 line-height-s pb-3 mb-3">
                      Mobile
                      <br />
                      PWA
                    </h5>
                  </div>
                  <div className="col-6">
                    <i
                      className="float-start ms-3 me-3"
                      data-feather="user"
                      data-feather-line="1"
                      data-feather-size="35"
                      data-feather-color="brown-dark"
                      data-feather-bg="brown-fade-light"
                    ></i>
                    <h5 className="color-theme float-start font-13 font-500 line-height-s">
                      Mobile
                      <br />
                      Website
                    </h5>
                  </div>
                  <div className="col-6">
                    <i
                      className="float-start ms-3 me-3"
                      data-feather="box"
                      data-feather-line="1"
                      data-feather-size="35"
                      data-feather-color="green-dark"
                      data-feather-bg="green-fade-light"
                    ></i>
                    <h5 className="color-theme float-start font-13 font-500 line-height-s">
                      Mobile
                      <br />
                      PWA
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-overlay bg-highlight opacity-90"></div>
            <div className="card-overlay dark-mode-tint"></div>
          </div>

          <div className="card card-style">
            <div className="content text-center">
              <h2>Ready in 3 Steps</h2>
              <p className="boxed-text-xl">
                Our products are designed to simplify the way you code a page, with focus on easy, copy and paste.
              </p>
            </div>
            <div className="divider divider-small mb-3 bg-highlight"></div>

            <div className="content">
              <div className="d-flex mb-4 pb-3">
                <div>
                  <i className="far fa-star color-yellow-dark fa-3x pt-3 icon-80 text-center ms-n2 me-2"></i>
                </div>
                <div>
                  <h5 className="font-16 font-600">Find your Style</h5>
                  <p>We've included multiple styles you can choose to match your exact project needs.</p>
                </div>
              </div>
              <div className="d-flex mb-4 pb-3">
                <div>
                  <i className="fa fa-mobile-alt color-blue-dark fa-3x pt-3 icon-80 text-center ms-n2 me-2"></i>
                </div>
                <div>
                  <h5 className="font-16 font-600">Paste your Blocks</h5>
                  <p>Just choose the blocks you like, copy and past them, add your text and that's it!</p>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div>
                  <i className="far fa-check-circle color-green-light fa-3x pt-3 icon-80 text-center ms-n2 me-2"></i>
                </div>
                <div>
                  <h5 className="font-16 font-600">Publish your Page</h5>
                  <p>Done with copy pasting? Your mobile site is now ready! Publish it or create an app!</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card card-style preload-img"
            data-src={require('src/scss/images/pictures/20s.jpg')}
            data-card-height="350"
          >
            <div className="card-center text-center">
              <p className="line-height-xl font-19 font-300 color-white ps-3 pe-3 mb-2">
                This is a great product! Many components that we can use, and I really appreciate the support from Enabled. Very
                responsive and provides great solutions.
              </p>
              <p className="opacity-50 color-white">Envato Customer</p>
              <a
                style={{ cursor: 'pointer' }}
                className="btn btn-m rounded-s btn-border color-white border-white text-uppercase font-700"
              >
                View Testimonials
              </a>
            </div>
            <div className="card-overlay bg-highlight opacity-90"></div>
          </div>

          <div className="card card-style">
            <div className="content">
              <h5 className="float-start font-16 font-600">Happy Customers</h5>
              <a className="float-end font-12 color-highlight mt-n1" style={{ cursor: 'pointer' }}>
                View All
              </a>
              <div className="clearfix"></div>
              <p className="pt-2">
                Over 30.000 people use our products, and we're always happy to see the positiv impact our products have had! Thank
                you!
              </p>
            </div>
            <div className="splide user-slider slider-no-arrows slider-no-dots" id="user-slider-1">
              <div className="splide__track">
                <div className="splide__list">
                  <div className="splide__slide">
                    <div className="text-center">
                      <img src="images/avatars/1s.png" width="55" height="55" className="rounded-xl shadow-l gradient-blue" />
                      <p>Jane</p>
                    </div>
                  </div>
                  <div className="splide__slide">
                    <div className="text-center">
                      <img src="images/avatars/2s.png" width="55" height="55" className="rounded-xl shadow-l gradient-red" />
                      <p>Craig</p>
                    </div>
                  </div>
                  <div className="splide__slide">
                    <div className="text-center">
                      <img src="images/avatars/1s.png" width="55" height="55" className="rounded-xl shadow-l gradient-green" />
                      <p>Jane</p>
                    </div>
                  </div>
                  <div className="splide__slide">
                    <div className="text-center">
                      <img src="images/avatars/2s.png" width="55" height="55" className="rounded-xl shadow-l gradient-brown" />
                      <p>Craig</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content mb-3 mt-0">
            <h5 className="float-start font-16 font-500">Products we Love</h5>
            <a className="float-end font-12 color-highlight mt-n1" style={{ cursor: 'pointer' }}>
              View All
            </a>
            <div className="clearfix"></div>
          </div>

          <div className="splide double-slider visible-slider slider-no-arrows slider-no-dots" id="double-slider-2">
            <div className="splide__track">
              <div className="splide__list">
                <div className="splide__slide ps-3">
                  <div className="bg-theme pb-3 rounded-m shadow-l text-center overflow-hidden">
                    <div data-card-height="150" className="card mb-2 bg-29">
                      <h5 className="card-bottom color-white mb-2">Sticky Mobile</h5>
                      <div className="card-overlay bg-gradient"></div>
                    </div>
                    <p className="mb-3 ps-2 pe-2 pt-2 font-12">Classic, elegant and powerful. A best seller.</p>
                    <a
                      style={{ cursor: 'pointer' }}
                      className="btn btn-xs bg-highlight btn-center-xs rounded-s shadow-s text-uppercase font-700"
                    >
                      View
                    </a>
                  </div>
                </div>
                <div className="splide__slide ps-3">
                  <div className="bg-theme pb-3 rounded-m shadow-l text-center overflow-hidden">
                    <div data-card-height="150" className="card mb-2 bg-18">
                      <h5 className="card-bottom color-white mb-2">Eazy Mobile</h5>
                      <div className="card-overlay bg-gradient"></div>
                    </div>
                    <p className="mb-3 ps-2 pe-2 pt-2 font-12">A best seller, elegant multi use design.</p>
                    <a
                      style={{ cursor: 'pointer' }}
                      className="btn btn-xs bg-highlight btn-center-xs rounded-s shadow-s text-uppercase font-700"
                    >
                      View
                    </a>
                  </div>
                </div>
                <div className="splide__slide ps-3">
                  <div className="bg-theme pb-3 rounded-m shadow-l text-center overflow-hidden">
                    <div data-card-height="150" className="card mb-2 bg-11">
                      <h5 className="card-bottom color-white mb-2">Bars Mobile</h5>
                      <div className="card-overlay bg-gradient"></div>
                    </div>
                    <p className="mb-3 ps-2 pe-2 pt-2 font-12">Modern sidebars and a very intuitive interface.</p>
                    <a
                      style={{ cursor: 'pointer' }}
                      className="btn btn-xs bg-highlight btn-center-xs rounded-s shadow-s text-uppercase font-700"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-style mt-4 shadow-l" data-card-height="150">
            <div className="card-center ps-3 pe-3">
              <h4 className="color-white">Did you know?</h4>
              <p className="color-white mb-0 opacity-60">
                We're the top selling Mobile Author on Envato. We value the quality of products and efficiency of our support!
              </p>
            </div>
            <div className="card-overlay bg-highlight opacity-90"></div>
          </div>

          <div className="card card-style text-center">
            <div className="content pb-2">
              <h1>
                <i
                  data-feather="gift"
                  data-feather-line="1"
                  data-feather-size="55"
                  data-feather-color="red-dark"
                  data-feather-bg="red-fade-light"
                ></i>
              </h1>
              <h3 className="font-700 mt-2">Purchase Today</h3>
              <p className="font-12 mt-n1 color-highlight mb-3">Quality and Premium Features for You</p>
              <p className="boxed-text-xl">
                Fast, easy to use and filled with features. Give your site the Mobile Feeling it deserves.
              </p>
              <a
                style={{ cursor: 'pointer' }}
                className="btn btn-center-xl btn-m text-uppercase font-700 bg-highlight rounded-sm shadow-l"
              >
                Buy now - $25
              </a>
            </div>
          </div>

          {/* footer and footer card */}
          <div className="footer" data-menu-load="menu-footer.html"></div>
        </div>
        {/* end of page content */}

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
          data-menu-active="nav-welcome"
          data-menu-effect="menu-over"
        ></div>

        {/* Be sure this is on your main visiting page, for example, the index.html page */}
        {/* Install Prompt for Android  */}
        <div
          id="menu-install-pwa-android"
          className="menu menu-box-bottom menu-box-detached rounded-l"
          data-menu-height="350"
          data-menu-effect="menu-parallax"
        >
          <div className="boxed-text-l mt-4">
            <img className="rounded-l mb-3" src="app/icons/icon-128x128.png" alt="img" width="90" />
            <h4 className="mt-3">Azures on your Home Screen</h4>
            <p>Install Azures on your home screen, and access it just like a regular app. It really is that simple!</p>
            <a
              style={{ cursor: 'pointer' }}
              className="pwa-install btn btn-s rounded-s shadow-l text-uppercase font-700 bg-highlight mb-2"
            >
              Add to Home Screen
            </a>
            <br />
            <a
              style={{ cursor: 'pointer' }}
              className="pwa-dismiss close-menu color-gray2-light text-uppercase font-700 opacity-60 font-10"
            >
              Maybe later
            </a>
            <div className="clear"></div>
          </div>
        </div>

        {/* Install instructions for iOS  */}
        <div
          id="menu-install-pwa-ios"
          className="menu menu-box-bottom menu-box-detached rounded-l"
          data-menu-height="320"
          data-menu-effect="menu-parallax"
        >
          <div className="boxed-text-xl mt-4">
            <img className="rounded-l mb-3" src="app/icons/icon-128x128.png" alt="img" width="90" />
            <h4 className="mt-3">Azures on your Home Screen</h4>
            <p className="mb-0 pb-3">
              Install Azures on your home screen, and access it just like a regular app. Open your Safari menu and tap "Add to
              Home Screen".
            </p>
            <div className="clear"></div>
            <a
              style={{ cursor: 'pointer' }}
              className="pwa-dismiss close-menu color-highlight font-800 opacity-80 text-center text-uppercase"
            >
              Maybe later
            </a>
            <br />
            <i className="fa-ios-arrow fa fa-caret-down font-40"></i>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default PublicLayout;
