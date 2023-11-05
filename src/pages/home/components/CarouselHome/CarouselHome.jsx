import React from 'react'
import { Carousel } from 'antd';
import Carousel1 from '../../../../assets/carousel-1.jpeg'
import Carousel2 from '../../../../assets/carousel-2.png'
import Carousel3 from '../../../../assets/carousel-3.jpeg'

 function CarouselHome() {
    const contentStyle = {
        width: '100%',
    };
    return (
        <div >
            <Carousel autoplay>
                <div>
                    <img src={Carousel1} style={contentStyle} alt=""/>
                </div>
                <div>
                    <img src={Carousel2} style={contentStyle} alt=""/>
                </div>
                <div>
                    <img src={Carousel3} style={contentStyle} alt=""/>
                </div>
            </Carousel>
        </div>
    )
}
export default CarouselHome
