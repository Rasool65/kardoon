import Footer from './Footer';
import Header from './Header';
import { FunctionComponent } from 'react';

const Layout = (props: any) => {
  const { children, title } = props;
  console.log(title);

  return (
    <div id="body">
      <Header />
      <Footer />
      <div className="page-content">
        <div className="page-title page-title-small">
          <h2>
            <a href="#" data-back-button="">
              <i className="fa fa-arrow-left"></i>
            </a>
            {title}
          </h2>
          <a
            href="#"
            data-menu="menu-main"
            className="bg-fade-highlight-light shadow-xl preload-img entered loaded"
            data-src="images/avatars/5s.png"
            data-ll-status="loaded"
            style={{ backgroundImage: 'url("images/avatars/5s.png")' }}
          ></a>
        </div>
        <div className="card header-card shape-rounded" data-card-height="210" style={{ height: '210px' }}>
          <div className="card-overlay bg-highlight opacity-95"></div>
          <div className="card-overlay dark-mode-tint"></div>
          <div
            className="card-bg preload-img entered loaded"
            data-src="images/pictures/20s.jpg"
            data-ll-status="loaded"
            style={{ backgroundImage: 'url("images/pictures/20s.jpg")' }}
          ></div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Layout;
