import { FunctionComponent } from 'react';

interface RemoveConfirmModalProps {
  confirmModalVisible?: boolean;
  accept: any;
  reject: any;
}

const ConfirmModal: FunctionComponent<RemoveConfirmModalProps> = ({ confirmModalVisible, accept, reject }) => {
  return (
    <>
      <div
        className={`menu menu-box-modal rounded-m ${confirmModalVisible ? 'menu-active' : ''}`}
        data-menu-height="200"
        data-menu-width="320"
      >
        <h1 className="text-center font-700 mt-3 pb-1">تایید ثبت درخواست</h1>
        <p className="boxed-text-l">آیا از ثبت درخواست جدید برای مشتری اطمینان دارید ؟</p>
        <div className="row me-3 ms-3 mb-0">
          <div className="col-6">
            <a
              className="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-700 bg-green-dark"
              onClick={accept}
            >
              بله
            </a>
          </div>
          <div className="col-6">
            <a
              onClick={reject}
              className="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-700 bg-red-dark"
            >
              خیر
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
