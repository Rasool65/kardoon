import {FunctionComponent} from 'react';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import {URL_PRODUCTS} from "../../configs/urls";

const Header = (props: any) => {
    const {children, title} = props;
    console.log(title);

    return (
        <>
            <div className="row"
                 style={{padding: '0 20px 0 20px', marginTop: '15px', position: 'relative', zIndex: '1'}}>
                <div className="col-1" style={{padding: '0 0 0 0', textAlign: 'center', width: '30px'}}>
                    <img
                        // onClick={(e) => showMainMenu(e)}
                        src={require('/src/scss/images/menu.png')}
                        style={{width: '20px', height: '20px', cursor: 'pointer'}}
                        alt=""/>
                </div>

                <div className="col-5"
                     style={{
                         padding: '0 5px 0 0',
                         color: 'white',
                         fontSize: '15px',
                         textAlign: 'right'
                     }}>
                    {props.headerTitle}
                </div>

                <div className="col-6" style={{padding: '0 0 0 0', textAlign: 'left'}}>
                    <span style={{marginLeft: '10px', color: '#FFF'}}>شهر</span>
                    <select defaultValue={'1'} style={{cursor: 'pointer', width: 'fit-content'}}>
                        <option value="1">تهران</option>
                        <option value="2">سمنان</option>
                        <option value="3">مشهد</option>
                        <option value="4">شیراز</option>
                        <option value="5">اصفهان</option>
                        <option value="5">کهکیلویه و بویر احمد</option>
                    </select>
                </div>
            </div>

            <div className="card header-card shape-rounded" data-card-height="150">
                <div className="card-overlay bg-highlight opacity-95"/>
                <div className="card-overlay dark-mode-tint"/>
                <div className="card-bg bg-20"/>
            </div>
        </>
    );
};
export default Header;
