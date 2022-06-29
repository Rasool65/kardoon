import { CustomFunctions } from '@src/utils/custom';
import React, { FunctionComponent, useEffect } from 'react';
import Webcam from 'react-webcam';
import { IModalModel } from './../authentication/ModalModel';


const VideoModal: FunctionComponent<IModalModel> = ({ videoMenuVisible }: any) => {
 
  useEffect(() => {
    CustomFunctions();
  }, [videoMenuVisible]);
  return (
        <div
          id="video-Modal"
          className={`menu menu-box-bottom menu-box-detached rounded-m ${videoMenuVisible ? 'menu-active' : ''}`}
          style={{ display: 'inherit' }}
          data-menu-height="600"
          data-menu-effect="menu-over"
        >
        <Webcam />
        </div>
  );
};
export default VideoModal;
