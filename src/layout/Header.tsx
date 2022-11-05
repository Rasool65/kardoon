import SelectCity from '../pages/city/SelectCity';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';

const Header = ({ headerTitle }: any) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);

  // function checkRole(normalizedName: string) {
  //   return userData?.roles ? userData?.roles.some((roleName) => roleName.normalizedName === normalizedName) : false;
  // }
  return (
    <>
      <div className="row menu-bar" style={{ padding: '0 20px 0 20px', marginTop: '15px', position: 'relative', zIndex: '1' }}>
        <div data-menu="menu-main" style={{ cursor: 'pointer' }} className="col-8 d-flex">
          <div className="menu-icon" style={{ padding: '0 0 0 0', textAlign: 'center', width: '30px' }}>
            <img
              className=""
              src={require('/src/scss/images/menu-b.png')}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              alt=""
            />
          </div>
          <div
            className="col-5 menu-title"
            style={{
              padding: '0 0px 0 0',
              color: 'white',
              fontSize: '15px',
              textAlign: 'right',
            }}
          >
            {headerTitle}
          </div>
        </div>

        <div className="col-4" style={{ padding: '0 0 0 0', textAlign: 'right' }}>
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
