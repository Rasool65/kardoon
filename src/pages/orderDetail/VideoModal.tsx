import { FunctionComponent } from 'react';
import { ICameraModal } from './IOrderDetailProp';

const VideoModal: FunctionComponent<ICameraModal> = ({ WebcamStreamCapture }: any) => {
  // useEffect(() => {
  //   CustomFunctions();
  // }, [WebcamStreamCapture]);
  return (
    <div
      id="video-Modal"
      className={`menu menu-box-bottom menu-box-detached rounded-m`}
      style={{ display: 'inherit', textAlign: 'center' }}
      data-menu-height="650"
      data-menu-effect="menu-over"
    >
      <WebcamStreamCapture />
    </div>
  );
};
export default VideoModal;
