import React, { MouseEventHandler } from 'react';

export interface IModalModel {
  handleRegisterModal?: any;
  showRegisterModal?: boolean;
  showForgetPasswordModal?: boolean;
  showEnterCodeModal?: boolean;
  mobileNumber?: string;
  handleEditmobileNo?: any;
  resend?: any;
}
