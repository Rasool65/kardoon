import React, { MouseEventHandler } from "react";

export interface IModalModel {
  showRegisterModal?: boolean;
  showForgetPasswordModal?: boolean;
  showEnterCodeModal?: boolean;
  mobileNumber?: string;
  handleEditmobileNo?: any;
  resend?: any;
}
