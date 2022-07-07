import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect } from 'react';
import { ICameraModal } from './IOrderDetailProp';

const VideoModal: FunctionComponent<ICameraModal> = ({ WebcamStreamCapture }: any) => {
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <div
      id="video-Modal"
      className={`menu menu-box-bottom menu-box-detached rounded-m`}
      style={{ display: 'inherit', textAlign: 'center' }}
      data-menu-height="780"
      data-menu-effect="menu-over"
    >
      <WebcamStreamCapture />
    </div>
  );
};
export default VideoModal;
