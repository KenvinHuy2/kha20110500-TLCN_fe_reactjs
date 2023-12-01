import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import React, { memo } from 'react';
import { NumericFormat } from 'react-number-format';
import './styles.scss';

const ProductCard = ({ isAdmin, productId, name, image, price, markers }) => {
  return (
    <>
      <Badge.Ribbon text={markers && markers[0] ? markers[0].name : null} color='#0c713d'>
        <div className='product-card p-1'>
          <div className='product-card-image'>
            <img src={image} alt={name} />
          </div>
          <h6 className='text-center text capitalize'>{name}</h6>
          <h4 className='text-center'>
            <NumericFormat value={price} displayType='text' thousandSeparator=',' />
          </h4>
          <div className='product-card-actions'>
            {isAdmin ? (
              <>
                <Space size='middle'>
                  <Button size='large' icon={<EditOutlined />}>
                    Cập nhật
                  </Button>
                  <Button size='large' icon={<DeleteOutlined />} danger>
                    Xoá
                  </Button>
                </Space>
              </>
            ) : (
              <Button size='large' className='btn-order'>
                Đặt hàng
              </Button>
            )}
          </div>
        </div>
      </Badge.Ribbon>
    </>
  );
};

export default memo(ProductCard);
