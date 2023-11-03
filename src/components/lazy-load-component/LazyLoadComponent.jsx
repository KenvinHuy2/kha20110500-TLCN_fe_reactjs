import React, { Suspense } from 'react';

const LazyLoadComponent = ({ component }) => {
    return (
        <>
            <Suspense fallback={<div>Loading....</div>}>{component}</Suspense>
        </>
    );
};

export default LazyLoadComponent;
