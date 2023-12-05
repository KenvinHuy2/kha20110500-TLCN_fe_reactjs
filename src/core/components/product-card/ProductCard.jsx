import {
  DeleteOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Badge, Button, Form, InputNumber, Modal, Space } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import FormDropdown from '../form-dropdown/FormDropdown';
import ImagesCarousel from '../images-carousel/ImagesCarousel';
import './styles.scss';

const sizeOptions = [
  {
    label: 'S',
    value: 'S',
  },
  {
    label: 'M',
    value: 'M',
  },
  {
    label: 'L',
    value: 'L',
  },
];

const ProductCard = ({
  name,
  desc,
  price,
  prices,
  images,
  isAdmin,
  markers,
  productId,
  defaultImage,
}) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isOpenPlaceOrder, setIsOpenPlaceOrder] = useState(false);

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      amount: 1,
      size: 'S',
    },
  });

  const totalPrice = useMemo(() => {
    const currentSize = getValues().size;
    const currentAmount = getValues().amount;
    const pricePerSize = prices.find((item) => item.size === currentSize);

    if (pricePerSize && currentAmount >= 0) {
      return currentAmount * pricePerSize.price;
    }
    return 0;
  }, [watch('amount'), watch('size')]);

  return (
    <>
      <Badge.Ribbon text={markers && markers[0] ? markers[0].name : null} color='#0c713d'>
        <div className='product-card p-1'>
          <div className='product-card-image'>
            <img src={defaultImage} alt={name} />
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
              <>
                <Space size='middle'>
                  <Button
                    size='large'
                    className='btn-order'
                    onClick={() => setIsOpenPlaceOrder(true)}>
                    Đặt hàng
                  </Button>
                  {desc && (
                    <Button size='large' type='dashed' onClick={() => setIsShowDetail(true)}>
                      Mô tả
                    </Button>
                  )}
                </Space>
              </>
            )}
          </div>
        </div>
      </Badge.Ribbon>
      <Modal
        centered
        open={isOpenPlaceOrder}
        footer={null}
        onCancel={() => setIsOpenPlaceOrder(false)}
        width={'800px'}>
        <div className='p-2'>
          <div className='row'>
            <div className='col-5'>
              <ImagesCarousel images={images} />
            </div>
            <div className='col-7 position-relative'>
              <h4 className='page-title text-center'>{name}</h4>
              <hr />
              <Form layout='vertical' autoComplete='false' style={{ minHeight: 300 }}>
                <div style={{ width: 330 }}>
                  <FormDropdown
                    label='Size'
                    name='size'
                    control={control}
                    error={errors.size}
                    dropdownOptions={sizeOptions}
                    rules={{
                      required: 'Vui lòng chọn kích cỡ',
                    }}
                  />
                </div>
                <div className='form-group'>
                  <div>
                    <label>Số lượng</label>
                  </div>
                  <Controller
                    name='amount'
                    control={control}
                    rules={{
                      required: 'Vui lòng nhập số lượng',
                      validate: (value) => {
                        if (!value || +value < 1) {
                          return 'Số lượng phải lớn hơn 1';
                        }
                      },
                    }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        size='large'
                        min={1}
                        max={100}
                        controls={false}
                        addonAfter={
                          <div className='p-1'>
                            <Button
                              size='large'
                              htmlType='button'
                              type='primary'
                              shape='circle'
                              icon={<PlusOutlined />}
                              onClick={() => setValue('amount', +watch('amount') + 1)}
                            />
                          </div>
                        }
                        addonBefore={
                          <div className='p-1'>
                            <Button
                              danger
                              size='large'
                              htmlType='button'
                              type='primary'
                              shape='circle'
                              icon={<MinusOutlined />}
                              onClick={() => setValue('amount', +watch('amount') - 1)}
                            />
                          </div>
                        }
                        className='product-amount'
                      />
                    )}
                  />
                </div>
                <div className='pt-4 d-flex align-items-center-justify-content-start'>
                  <h5 className='page-title text-uppercase'>
                    <span className='mr-2'>TỒNG TIỀN:</span>
                    <NumericFormat value={totalPrice} displayType='text' thousandSeparator=',' />
                  </h5>
                </div>
                <div className='product-actions'>
                  <Button size='large' type='primary' icon={<ShoppingCartOutlined />}>
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    size='large'
                    type='dashed'
                    onClick={() => setIsOpenPlaceOrder(false)}
                    className='mx-3 w-50'>
                    Đóng
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        open={isShowDetail}
        footer={null}
        onCancel={() => setIsShowDetail(false)}
        width={'800px'}>
        <h4 className='page-title text-center'>Mô tả sản phẩm</h4>
        <hr />
        <div className='product-desc'>
          <div dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
        <hr />
        <div className='text-center'>
          <Button size='large' onClick={() => setIsShowDetail(false)}>
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default memo(ProductCard);
