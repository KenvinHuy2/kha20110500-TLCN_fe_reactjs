import { Carousel, Image } from 'antd';
import React, { memo } from 'react';
import './styles.scss';

const ImagesCarousel = ({ images, minHeight = 362 }) => {
  return (
    <>
      <Carousel>
        {images.map((url, idx) => (
          <div key={`carousel-${idx}-${new Date().getTime}`} className='w-100 h-100 bg-light'>
            <Image
              src={url}
              height='100%'
              width='100%'
              style={{ objectFit: 'contain', verticalAlign: 'middle', minHeight }}
              alt={`carousel-${idx}-${new Date().getTime}`}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default memo(ImagesCarousel);
