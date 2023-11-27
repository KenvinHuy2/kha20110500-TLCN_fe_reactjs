import React, { memo } from 'react';
import { ClockLoader } from 'react-spinners';
import './styles.scss';

const LoadingSpinner = () => {
  return (
    <>
      <div id='spinner'>
        <ClockLoader color='#36d7b7' size={100} />
      </div>
    </>
  );
};

export default memo(LoadingSpinner);
