import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { storeSelectors } from '../../store';
import './styles.scss';

const LoadingSpinner = () => {
  const isLoading = useSelector(storeSelectors.selectIsLoading);

  if (!isLoading) {
    return undefined;
  }

  return (
    <>
      <div id='spinner'>
        <ClockLoader color='#36d7b7' size={100} loading />
      </div>
    </>
  );
};

export default memo(LoadingSpinner);
