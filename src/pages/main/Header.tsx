import SelectCity from '../city/SelectCity';

const Header = ({ headerTitle }: any) => {
  return (
    <>
      <div className="row" style={{ padding: '0 20px 0 20px', marginTop: '15px', position: 'relative', zIndex: '1' }}>
        <div className="col-1" style={{ padding: '0 0 0 0', textAlign: 'center', width: '30px' }}>
          {/* <a
            style={{ padding: '20px' }}
            href="#"
            data-menu="menu-main"
            className="bg-fade-highlight-light shadow-xl preload-img"
            // data-src="images/avatars/5s.png"
            data-src={require('/src/scss/images/avatars/5s.png')}
          ></a> */}
          <img
            // onClick={(e) => showMainMenu(e)}
            data-menu="menu-main"
            className="bg-fade-highlight-light shadow-xl preload-img"
            src={require('/src/scss/images/menu.png')}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            alt=""
          />
        </div>

        <div
          className="col-5"
          style={{
            padding: '0 0px 0 0',
            color: 'white',
            fontSize: '15px',
            textAlign: 'right',
          }}
        >
          {headerTitle}
        </div>

        <div className="col-6" style={{ padding: '0 0 0 0', textAlign: 'right' }}>
          {/* <span style={{ marginLeft: '10px', color: '#FFF' }}>شهر</span> */}
          <SelectCity />
        </div>
      </div>

      <div className="card header-card shape-rounded" data-card-height="150">
        <div className="card-overlay bg-highlight opacity-95" />
        <div className="card-overlay dark-mode-tint" />
        <div className="card-bg bg-20" />
      </div>
    </>
  );
};
export default Header;
