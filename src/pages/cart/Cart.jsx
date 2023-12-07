import { DollarOutlined } from '@ant-design/icons';
import { Button, Empty, List, Avatar } from 'antd';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import './styles.scss';
import { useSelector } from 'react-redux';
import { storeSelectors } from '../../core/store';

const Cart = () => {
  const products = useSelector(storeSelectors.selectProducts);
  return (
    <>
      <div className='container-fluid' id='cart'>
        <div className='pt-4'>
          <h1 className='text-center page-title'>GIỎ HÀNG</h1>
        </div>
        <div className='py-3 d-flex align-items-center justify-content-center'>
          <img src='/assets/images/divider.png' alt='divider' />
        </div>
        <div className='py-3'>
          {products && products.length ? (
            <>
              <ul className='list-products'>
                {products.map((product) => (
                  <li key={product._id} className='list-product-item'>
                    {product.name}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Empty description='Không có sản phẩm nào trong giỏ hàng' />
          )}
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
