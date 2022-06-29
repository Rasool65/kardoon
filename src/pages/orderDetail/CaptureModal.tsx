import { CustomFunctions } from '@src/utils/custom';
import React, { FunctionComponent, useEffect } from 'react';
import Webcam from 'react-webcam';
import { IModalModel } from './../authentication/ModalModel';


const CaptureModal: FunctionComponent<IModalModel> = ({ capturMenuVisible }: any) => {
 
  useEffect(() => {
    CustomFunctions();
  }, [capturMenuVisible]);
  return (
        <div
          id="capture-Modal"
          className={`menu menu-box-bottom menu-box-detached rounded-m ${capturMenuVisible ? 'menu-active' : ''}`}
          style={{ display: 'inherit' }}
          data-menu-height="600"
          data-menu-effect="menu-over"
        >
        <Webcam />
        </div>
  );
};
export default CaptureModal;
