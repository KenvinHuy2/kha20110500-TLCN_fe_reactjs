import { DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Empty, Image, InputNumber, Select } from 'antd';
import React, { useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicTable } from '../../core/components';
import { storeActions, storeSelectors } from '../../core/store';
import './styles.scss';

const sizeOptions = [
  {
    label: 'S - Nhỏ',
    value: 'S',
  },
  {
    label: 'M - Vừa',
    value: 'M',
  },
  {
    label: 'L - Lớn',
    value: 'L',
  },
];

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(storeSelectors.selectProducts);
  const currentUser = useSelector(storeSelectors.selectCurrentUser);

  const handleChangeProductSize = (newSize, currentProduct) => {
    const oldProduct = {
      amount: 0,
      size: currentProduct.size,
      image: currentProduct.image,
      productId: currentProduct.productId,
    };
    const newProduct = {
      size: newSize,
      image: currentProduct.image,
      amount: currentProduct.amount,
      productId: currentProduct.productId,
    };
    dispatch(
      storeActions.addProductToCart({
        userId: currentUser._id,
        products: [oldProduct, newProduct],
      }),
    );
  };

  const handleRemoveProduct = (currentProduct) => {
    dispatch(
      storeActions.addProductToCart({
        userId: currentUser._id,
        products: [
          {
            amount: 0,
            size: currentProduct.size,
            image: currentProduct.image,
            productId: currentProduct.productId,
          },
        ],
      }),
    );
  };

  const tableColumns = useMemo(() => {
    return [
      {
        title: 'ID Sản phẩm',
        dataIndex: 'productId',
        key: '_id',
        render: (value) => value.slice(-8, -1),
        align: 'center',
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: 'Hỉnh ảnh',
        dataIndex: 'image',
        key: 'image',
        render: (value) => (
          <Image src={value} style={{ width: 120, height: 120, objectFit: 'contain' }} />
        ),
        align: 'center',
      },
      {
        title: 'Kích cỡ',
        dataIndex: 'size',
        key: 'size',
        align: 'center',
        render: (value, product) => (
          <Select
            options={sizeOptions}
            value={value}
            onChange={(size) => handleChangeProductSize(size, product)}
          />
        ),
      },
      {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        render: (value) => <InputNumber min={1} value={value} />,
      },
      {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (value) => <NumericFormat value={value} displayType='text' thousandSeparator=',' />,
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'center',
        render: (value) => <NumericFormat value={value} displayType='text' thousandSeparator=',' />,
      },
      {
        title: '',
        dataIndex: null,
        key: 'actions',
        render: (_, product) => (
          <Button
            type='primary'
            danger
            size='large'
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveProduct(product)}>
            Xoá
          </Button>
        ),
        align: 'center',
      },
    ];
  }, [products.length]);

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  }, [products]);

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
              <div className='container-fluid px-5'>
                <DynamicTable
                  hasBorder
                  cols={tableColumns}
                  dataSrc={products}
                  pageSize={Number.MAX_SAFE_INTEGER}
                />
              </div>
            </>
          ) : (
            <div className='pb-5'>
              <Empty description='Không có sản phẩm nào trong giỏ hàng' />
            </div>
          )}
        </div>
      </div>
      <div className='card-total'>
        <div className='container d-flex justify-content-between align-items-center'>
          <h3 className='m-0 text-uppercase'>
            <span className='pr-5'>Tổng tiền:</span>
            <NumericFormat
              value={totalPrice}
              displayType='text'
              thousandSeparator=','
              style={{ color: '#0c713d' }}
            />
          </h3>
          <Button size='large' type='primary' icon={<DollarOutlined />} disabled={!totalPrice}>
            Thanh toán
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
