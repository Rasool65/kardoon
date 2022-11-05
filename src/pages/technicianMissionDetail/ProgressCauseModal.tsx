import Select from 'react-select';
import { IMissionDetailResultModel, IStatusMission } from '@src/models/output/missionDetail/IMissionDetailListResultModel';
import { FunctionComponent } from 'react';
import { Button, Spinner } from 'reactstrap';

interface ProgressCauseModalProps {
  progressReasonModalVisible: boolean;
  missionDetail?: IMissionDetailResultModel;
  statusList?: IStatusMission[];
  onChange: any;
  onClick: any;
  loading: boolean;
}

const ProgressCauseModal: FunctionComponent<ProgressCauseModalProps> = ({
  progressReasonModalVisible,
  missionDetail,
  statusList,
  onChange,
  onClick,
  loading,
}) => {
  return (
    <div
      className={`menu menu-box-modal rounded-m ${progressReasonModalVisible ? 'menu-active' : ''}`}
      data-menu-height="400"
      data-menu-width="340"
    >
      <div className="me-3 ms-3 mt-3">
        <h2 className="font-500 mb-0 pt-1">در حال بررسی</h2>
        <p className="font-13 mb-1 pt-1">لطفأ دلیل انتخاب وضعیت در حال بررسی را وارد نمایید</p>
        {missionDetail?.statusTitle && (
          <Select
            isMulti
            isClearable
            className="select-city"
            placeholder="انتخاب دلیل درحال بررسی"
            isSearchable={false}
            options={statusList![4].causeList ? statusList![4].causeList : []}
            onChange={onChange}
          />
        )}
        <Button
          style={{ width: '100%', marginTop: '10px' }}
          className="btn btn-full btn-m shadow-l rounded-s bg-highlight text-uppercase font-700 top-20 p-1"
          onClick={onClick}
        >
          {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'ثبت'}
        </Button>
      </div>
    </div>
  );
};

export default ProgressCauseModal;
