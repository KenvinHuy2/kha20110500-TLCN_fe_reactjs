import { DeleteOutlined, DollarOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty, Image, Select, Space, Tooltip } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DynamicTable } from '../../core/components';
import { AlertService } from '../../core/services';
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

  const handleChangeProductSize = (changeSize, product) => {
    const oldProduct = {
      amount: 0,
      size: product.size,
      image: product.image,
      productId: product.productId,
    };
    const newProduct = {
      size: changeSize,
      image: product.image,
      amount: product.amount,
      productId: product.productId,
    };
    dispatch(
      storeActions.addProductToCart({
        userId: currentUser._id,
        products: [oldProduct, newProduct],
      }),
    );
  };

  const handleUpdateAmount = async (product) => {
    try {
      const { value: newAmount } = await AlertService.alertWithInputNumber(product.amount);
      if (+newAmount === product.amount) {
        return;
      }
      dispatch(
        storeActions.addProductToCart({
          userId: currentUser._id,
          products: [
            {
              amount: newAmount - product.amount,
              size: product.size,
              image: product.image,
              productId: product.productId,
            },
          ],
        }),
      );
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    }
  };

  const handleRemoveProduct = (product) => {
    dispatch(
      storeActions.addProductToCart({
        userId: currentUser._id,
        products: [
          {
            amount: 0,
            size: product.size,
            image: product.image,
            productId: product.productId,
          },
        ],
      }),
    );
  };

  useEffect(() => {
    dispatch(storeActions.getCartByUserId(currentUser._id));
  }, []);

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
            size='large'
            options={sizeOptions}
            value={value}
            onChange={(changeSize) => handleChangeProductSize(changeSize, product)}
          />
        ),
      },
      {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
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
          <Space>
            <Tooltip title='Sửa số lượng'>
              <Button
                type='primary'
                size='large'
                icon={<EditOutlined />}
                onClick={() => handleUpdateAmount(product)}></Button>
            </Tooltip>
            <Tooltip title='Xoá sản phẩm'>
              <Button
                type='primary'
                danger
                size='large'
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveProduct(product)}></Button>
            </Tooltip>
          </Space>
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
                  rowKey='_id'
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
          <NavLink to='/thanh-toan-don-hang'>
            <Button size='large' type='primary' icon={<DollarOutlined />} disabled={!totalPrice}>
              Thanh toán
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Cart;
