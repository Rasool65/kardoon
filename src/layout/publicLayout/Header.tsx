import { FunctionComponent } from 'react';

const Header: FunctionComponent = () => {
  return (
    <div className="header header-fixed header-auto-show header-logo-app">
      <a href="index.html" className="header-title">
        AZURES
      </a>
      <a style={{ cursor: 'pointer' }} data-back-button="" className="header-icon header-icon-1">
        <i className="fas fa-arrow-left"></i>
      </a>
      <a style={{ cursor: 'pointer' }} data-toggle-theme="" className="header-icon header-icon-2 show-on-theme-dark">
        <i className="fas fa-sun"></i>
      </a>
      <a style={{ cursor: 'pointer' }} data-toggle-theme="" className="header-icon header-icon-2 show-on-theme-light">
        <i className="fas fa-moon"></i>
      </a>
      <a style={{ cursor: 'pointer' }} data-menu="menu-highlights" className="header-icon header-icon-3">
        <i className="fas fa-brush"></i>
      </a>
    </div>
  );
};
export default Header;
