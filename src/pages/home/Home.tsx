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
import { createRoutineMachineLayer } from '@src/components/map/RoutingMachine';
import { setRoutingControl } from '@src/redux/reducers/mapReducer';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { ICustomerResultModel } from '@src/models/output/customer/ICustomerResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { CheckSquare, Grid, Mail, MessageSquare, List, Check, X, Circle, Map, MapPin, Navigation } from 'react-feather';
import { Calendar } from 'react-modern-calendar-datepicker';
import Toggle from '@src/components/Toggle';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { setActualRoute, setDriverRoute, setPlannedRoute } from '@src/redux/reducers/routeReducer';

const Home: FunctionComponent<IPageProps> = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const localStorage = useLocalStorage();

  const mapState = useSelector((state: RootStateType) => state.map);
  const getBoolean = (value: any) => (value === 'true' ? true : false);

  const [mapOptionsModal, setMapOptionsModal] = useState<boolean>(false);
  const [planned, setPlanned] = useState<string>('');
  const [driver, setDriver] = useState<boolean>(false);
  const [actual, setActual] = useState<boolean>(false);

  const [selected, setSelected] = useState<Number>(0);

  // const plannedChange = (value: any) => {
  //   debugger;
  //   planned ? setPlanned(false) : setPlanned(true);
  //   localStorage.set('planned', JSON.stringify(!planned));
  //   dispatch(setPlannedRoute(!planned));
  // };
  const getselectValue = (value: string) => {
    switch (value) {
      case 'off':
        setSelected(0);
        break;
      case 'pin':
        setSelected(1);
        break;
      case 'route':
        setSelected(2);
        break;
      default:
        setSelected(0);
        break;
    }
  };
  const selectOff = () => {
    setSelected(0);
    localStorage.set('planned', 'off');
    dispatch(setPlannedRoute('off'));
  };
  const selectPin = () => {
    setSelected(1);
    localStorage.set('planned', 'pin');
    dispatch(setPlannedRoute('pin'));
  };
  const selectRoute = () => {
    setSelected(2);
    localStorage.set('planned', 'route');
    dispatch(setPlannedRoute('route'));
  };

  const driverChange = () => {
    driver ? setDriver(false) : setDriver(true);
    localStorage.set('driver', JSON.stringify(!driver));
    dispatch(setDriverRoute(!driver));
  };
  const actualChange = () => {
    actual ? setActual(false) : setActual(true);
    localStorage.set('actual', JSON.stringify(!actual));
    dispatch(setActualRoute(!actual));
  };

  useEffect(() => {
    setActual(getBoolean(localStorage.get('actual')));
    setDriver(getBoolean(localStorage.get('driver')));
    getselectValue(localStorage.get('planned') ?? 'off');
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <Modal isOpen={mapOptionsModal} toggle={() => setMapOptionsModal(!mapOptionsModal)} className="modal-dialog-centered">
        <ModalHeader toggle={() => setMapOptionsModal(!mapOptionsModal)}>Legend</ModalHeader>
        <ModalBody>
          <>
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <img
                  src={require('@src/assets/images/markers/marker-status-0.png')}
                  style={{ marginRight: '10px', width: '22px' }}
                />
                Not Visited
              </Col>
              <Col lg={7} sm={7} xs={6}></Col>
            </Row>
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <img
                  src={require('@src/assets/images/markers/marker-status-1.png')}
                  style={{ marginRight: '10px', width: '22px' }}
                />
                Completed
              </Col>
              <Col lg={7} sm={7} xs={6}></Col>
            </Row>
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <img
                  src={require('@src/assets/images/markers/marker-status-3.png')}
                  style={{ marginRight: '10px', width: '22px' }}
                />
                Canceled
              </Col>
              <Col lg={7} sm={7} xs={6}></Col>
            </Row>
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <img
                  src={require('@src/assets/images/markers/marker-driver.svg')}
                  style={{ marginRight: '10px', width: '22px' }}
                />
                Driver Location
              </Col>
              <Col lg={7} sm={7} xs={6}></Col>
            </Row>
            {/* <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <Navigation color="orange" size={20} style={{ marginRight: '10px' }} />
                GPS Disabled
              </Col>
              <Col lg={7} sm={7} xs={6}></Col>
            </Row> */}
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <Map color="#13b92a" size={20} style={{ marginRight: '10px' }} />
                Planned Route
              </Col>
              <Col lg={7} sm={7} xs={6} className="p-1">
                <ButtonGroup>
                  <Button color="primary" onClick={selectOff} size="sm" active={selected === 0}>
                    Off
                  </Button>
                  <Button color="primary" onClick={selectPin} size="sm" active={selected === 1}>
                    Pin
                  </Button>
                  <Button color="primary" onClick={selectRoute} size="sm" active={selected === 2}>
                    Route
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <Map color="#3593ff" size={20} style={{ marginRight: '10px' }} />
                Driver Route
              </Col>
              <Col lg={7} sm={7} xs={6} className="p-1">
                <Toggle checked={driver} onChange={driverChange} offstyle="btn-secondary" onstyle="btn-primary" />
              </Col>
            </Row>
            <Row>
              <Col lg={5} sm={5} xs={6} className="p-1 ps-5">
                <Map color="#b711e0" size={20} style={{ marginRight: '10px' }} />
                Actual Route
              </Col>
              <Col lg={7} sm={7} xs={6} className="p-1">
                <Toggle checked={actual} onChange={actualChange} offstyle="btn-secondary" onstyle="btn-primary" />
              </Col>
            </Row>
          </>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setMapOptionsModal(!mapOptionsModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <div className="map-options-btn">
        <UncontrolledButtonDropdown>
          <Button color="primary" size="md" onClick={() => setMapOptionsModal(true)} className="btn-icon btn-round">
            <Grid size={14} />
          </Button>
        </UncontrolledButtonDropdown>
      </div>
    </>
  );
};

export default Home;
