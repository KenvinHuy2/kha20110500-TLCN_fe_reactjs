import React, { Suspense, memo } from 'react';

const LazyLoadComponent = ({ component }) => {
  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>{component}</Suspense>
    </>
  );
};

export default memo(LazyLoadComponent);
