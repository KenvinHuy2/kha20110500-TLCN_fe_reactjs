import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Space } from 'antd';
import React, { memo, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { storeActions } from '../../store';

const ProductCard = ({ isAdmin, productId, name, image, price, markers, prices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("S");
  const dispatch = useDispatch()

  const handleCancel = () => {
    setNumber(1)
    setIsModalOpen(false);
  };

  const handleTotal = () => {
    const sizeChoose = prices.find(i => i.size == size)
    return sizeChoose.price * number
  }
  const handleAddProduct = () => {
    setIsModalOpen(false);
    dispatch(storeActions.addProducts({ productId, total: handleTotal(), name, number, size,image }))
  }

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
              <Button size='large' className='btn-order' onClick={() => setIsModalOpen(true)}>
                Đặt hàng
              </Button>
            )}
          </div>
        </div>
      </Badge.Ribbon>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered width={1000}>
        <div className='modal-card'>
          <div className='modal-thumbnail'>
            <img alt="example" src={image} />
          </div>
          <div className='modal-content-card'>
            <h2>{name}</h2>
            <div className='modal-item-card'>
              <div>Kính cỡ</div>
              <div>
                <Button type={size == "S" ? 'primary' : 'default'} style={{ marginRight: 10 }} onClick={() => setSize("S")}>Nhỏ</Button>
                <Button type={size == "M" ? 'primary' : 'default'} style={{ marginRight: 10 }} onClick={() => setSize("M")}>Trung bình</Button>
                <Button type={size == "L" ? 'primary' : 'default'} onClick={() => setSize("L")}>Lớn</Button>
              </div>
            </div>
            <div className='modal-item-card'>
              <div>Số lượng</div>
              <div>
                <Button type='default' size='large' onClick={() => {
                  if (number != 1) {
                    setNumber(number - 1)
                  }
                }}>-</Button>
                <Button type='default' size='large' disabled>{number}</Button>
                <Button type='default' size='large' onClick={() => setNumber(number + 1)}>+</Button>
              </div>
            </div>
            <div className='modal-item-card'>
              <div>Giá</div>
              <div style={{ fontSize: '26px', color: "#0C713D", fontWeight: "600" }}>
                <NumericFormat value={handleTotal()} displayType='text' thousandSeparator=',' />
              </div>
            </div>
            <div >
              <Button type='default' size='large' onClick={handleAddProduct}>Mua hàng</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(ProductCard);
