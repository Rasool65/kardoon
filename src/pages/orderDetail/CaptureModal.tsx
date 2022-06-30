import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from 'reactstrap';
import { ICameraModal } from './IOrderDetailProp';

const CaptureModal: FunctionComponent<ICameraModal> = ({ capturMenuVisible, WebcamCapture }: any) => {
  useEffect(() => {
    CustomFunctions();
  }, [capturMenuVisible]);

  return (
    <div
      id="capture-Modal"
      className={`menu menu-box-bottom menu-box-detached rounded-m ${capturMenuVisible ? 'menu-active' : ''}`}
      style={{ display: 'inherit', textAlign: 'center' }}
      data-menu-height="650"
      data-menu-effect="menu-over"
    >
      <WebcamCapture />
    </div>
  );
};
export default CaptureModal;
