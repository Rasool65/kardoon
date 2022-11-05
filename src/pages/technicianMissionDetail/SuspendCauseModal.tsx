import Select from 'react-select';
import { FunctionComponent } from 'react';
import { IMissionDetailResultModel, IStatusMission } from '@src/models/output/missionDetail/IMissionDetailListResultModel';
import { Button, Spinner } from 'reactstrap';

interface SuspendCouseModalProps {
  suspendReasonModalVisible: boolean;
  missionDetail?: IMissionDetailResultModel;
  statusList?: IStatusMission[];
  onChange: any;
  onClick: any;
  loading: boolean;
}

const SuspendCauseModal: FunctionComponent<SuspendCouseModalProps> = ({
  suspendReasonModalVisible,
  missionDetail,
  statusList,
  onChange,
  onClick,
  loading,
}) => {
  return (
    <div
      className={`menu menu-box-modal rounded-m ${suspendReasonModalVisible ? 'menu-active' : ''}`}
      data-menu-height="400"
      data-menu-width="340"
    >
      <div className="me-3 ms-3 mt-3">
        <h2 className="font-500 mb-0 pt-1">منتظر لغو</h2>
        <p className="font-13 mb-1 pt-1">لطفأ دلیل انتخاب وضعیت منتظر لغو را وارد نمایید</p>
        {missionDetail?.statusTitle && (
          <Select
            isMulti
            isClearable
            className="select-city"
            placeholder="انتخاب دلیل منتظر لغو"
            isSearchable={false}
            options={statusList![1].causeList ? statusList![1].causeList : []}
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

export default SuspendCauseModal;
