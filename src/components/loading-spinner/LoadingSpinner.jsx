import React from 'react';
import './styles.scss';
import { ClockLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <>
            <div id='spinner'>
                <ClockLoader color='#36d7b7' size={100} />
            </div>
        </>
    );
};

export default LoadingSpinner;
