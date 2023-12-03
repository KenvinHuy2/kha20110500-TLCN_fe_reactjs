import { Carousel } from 'antd';
import React, { memo } from 'react';
import './styles.scss';

const BannerCarousel = ({ images }) => {
  return (
    <>
      <Carousel autoplay>
        {images.map((url, idx) => (
          <div key={`carousel-${idx}-${new Date().getTime}`} className='banner-carouse-image'>
            <img src={url} alt={`carousel-${idx}-${new Date().getTime}`} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default memo(BannerCarousel);
