import { FunctionComponent } from 'react';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { Col, Container, Row } from 'reactstrap';

const Header = (props: any) => {
  const { children, title } = props;
  console.log(title);

  return (
    <>
      <Container style={{ maxWidth: '95%', marginTop: '15px' }}>
        <Row style={{ alignItems: 'center', textAlign: 'center' }}>
          <Col xs={1} style={{ textAlign: 'right' }}>
            <img
              // onClick={(e) => showMainMenu(e)}
              src={require('/src/scss/images/menu.png')}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              alt=""
            />
          </Col>
          <Col
            xs={11}
            style={{
              textAlign: 'right',
              color: 'white',
              fontSize: '15px',
              marginTop: '3px',
            }}
          >
            {props.headerTitle}
          </Col>
          <Col style={{ textAlign: 'left' }}>
            <span style={{ marginLeft: '10px', color: '#FFF' }}>شهر</span>
            <select defaultValue={'1'} style={{ cursor: 'pointer', width: '100px' }}>
              <option value="1">تهران</option>
              <option value="2">سمنان</option>
              <option value="3">مشهد</option>
              <option value="4">شیراز</option>
              <option value="5">اصفهان</option>
            </select>
          </Col>
        </Row>
      </Container>

      <div className="card header-card shape-rounded" data-card-height="150">
        <div className="card-overlay bg-highlight opacity-95" />
        <div className="card-overlay dark-mode-tint" />
        <div className="card-bg bg-20" />
      </div>
    </>
  );
};
export default Header;
