import { FunctionComponent, ReactNode } from 'react';
import { Spinner } from 'reactstrap';

export const LoadingComponent: any = () => {
  return (
    <>
      <div className="text-center">
        <Spinner />
      </div>
    </>
  );
};

export default LoadingComponent;
