import { DollarOutlined } from '@ant-design/icons';
import {Button, Empty } from 'antd';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import './styles.scss';
import { storeSelectors } from '../../core/store';
import { useSelector } from 'react-redux';

const Cart = () => {
  const products = useSelector(storeSelectors.selectProducts);
  console.log(products)
  return (
    <>
      <div className='container' id='cart'>
        <div className='pt-4'>
          <h1 className='text-center page-title'>GIỎ HÀNG</h1>
        </div>
        <div className='py-3 d-flex align-items-center justify-content-center'>
          <img src='/assets/images/divider.png' alt='divider' />
        </div>
        <div className='py-3'>
          {products.length > 0 ? <>
            {products.map((product, index) =>
              <div className='cart-card p-1' key={index}>
                <div className='cart-card-image'>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='cart-card-content'>
                <h6 className='cart-card-name'>{product.name}</h6>
                <div className='cart-card-sub'>
                  <div className='cart-card-size'>Size: <span>{product.size}</span></div>
                </div>
                </div>
              </div>
            )}
          </> : <div className='d-flex align-items-center justify-content-center'>
            <Empty description='Không có sản phẩm nào trong giỏ hàng' />
          </div>}
        </div>
      </div>
      <div className='card-total'>
        <div className='container d-flex justify-content-between align-items-center'>
          <h3 className='m-0 text-uppercase'>
            <span className='pr-5'>Tổng tiền:</span>
            <NumericFormat
              value={10000}
              displayType='text'
              thousandSeparator=','
              style={{ color: '#0c713d' }}
            />
          </h3>
          <Button size='large' type='primary' icon={<DollarOutlined />}>
            Thanh toán
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
