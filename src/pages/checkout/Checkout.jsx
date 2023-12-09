import { CarOutlined, CreditCardOutlined, DollarOutlined, ShopOutlined } from '@ant-design/icons';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Alert, Button, Form, Image, Input, Radio } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicTable, FormInput } from '../../core/components';
import { DeliveryOptions, PaymentMethods } from '../../core/constants';
import { AlertService, OrdersService } from '../../core/services';
import { storeActions, storeSelectors } from '../../core/store';
import Payments from './payments/Payments';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

const deliveryOptions = [
  {
    label: DeliveryOptions.PICKUP,
    value: DeliveryOptions.PICKUP,
    icon: <ShopOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: DeliveryOptions.DELIVERY,
    value: DeliveryOptions.DELIVERY,
    icon: <CarOutlined style={{ fontSize: 24 }} />,
  },
];

const paymentOptions = [
  {
    label: PaymentMethods.CastAtShop,
    value: PaymentMethods.CastAtShop,
    icon: <DollarOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: PaymentMethods.CashOnDelivery,
    value: PaymentMethods.CashOnDelivery,
    icon: <CarOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: PaymentMethods.Credit,
    value: PaymentMethods.Credit,
    icon: <CreditCardOutlined style={{ fontSize: 36 }} />,
  },
];

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const getDeliveryStatus = (deliveryType) => {
  if (deliveryType === DeliveryOptions.DELIVERY) {
    return 'đang giao hàng';
  }
  return 'đã giao hàng';
};

const getPaymentStatus = (paymentMethod) => {
  if (paymentMethod === PaymentMethods.CashOnDelivery) {
    return 'chưa thanh toán';
  }
  return 'đã thanh toán';
};

const getOrderProducts = (products) => {
  return products.map((product) => {
    const { _id, ...rest } = product;
    return rest;
  });
};

const getDeliveryAddress = (deliveryType, formAddress, userAddress) => {
  if (deliveryType === DeliveryOptions.PICKUP) {
    return '1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh';
  }
  return formAddress.trim() || userAddress.trim();
};

const getOrderStatus = (deliveryType) => {
  if (deliveryType === DeliveryOptions.PICKUP) {
    return 'hoàn tất';
  }
  return 'đang xử lý';
};

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentIntents, setPaymentIntents] = useState(null);
  const [options, setOptions] = useState({
    appearance: {
      theme: 'stripe',
    },
    clientSecret: null,
  });

  const dispatch = useDispatch();
  const products = useSelector(storeSelectors.selectProducts);
  const currentUser = useSelector(storeSelectors.selectCurrentUser);
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      notes: '',
      phone: '',
      fullName: '',
      deliveryAddress: '',
      deliveryType: DeliveryOptions.PICKUP,
      paymentMethod: PaymentMethods.CastAtShop,
    },
  });

  const handleCheckout = async (formValues) => {
    const orderProducts = getOrderProducts(products);
    const deliveryStatus = getDeliveryStatus(formValues.deliveryType);
    const paymentStatus = getPaymentStatus(formValues.paymentMethod);
    const deliveryAddress = getDeliveryAddress(
      formValues.deliveryType,
      formValues.deliveryAddress,
      currentUser.address,
    );
    const orderStatus = getOrderStatus();

    const payload = {
      userId: currentUser._id,
      paymentMethod: formValues.paymentMethod,
      paymentStatus,
      deliveryType: formValues.deliveryType,
      deliveryStatus,
      orderStatus,
      products: orderProducts,
      totalBill,
      notes: formValues.notes,
      fullName: formValues.fullName.trim() || currentUser.fullName.trim(),
      phone: formValues.phone || currentUser.phone,
      deliveryAddress,
    };
    try {
      dispatch(storeActions.showLoading());
      const order = await OrdersService.createOrder(payload);
      dispatch(storeActions.resetCart());
      AlertService.success(`Đặt hàng thành công. ID đơn hàng: ${order.orderId}`);
      return navigate('/lich-su-dat-hang');
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const tableColumns = useMemo(() => {
    return [
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
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'center',
      },
    ];
  }, []);

  const totalBill = useMemo(() => {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  }, [products]);

  useEffect(() => {
    const initCheckout = async () => {
      try {
        dispatch(storeActions.showLoading());
        dispatch(storeActions.getCartByUserId(currentUser._id));
        if (totalBill >= 2000) {
          const paymentIntents = await OrdersService.createPaymentIntents(totalBill);
          setPaymentIntents(paymentIntents);
          setOptions({ ...options, clientSecret: paymentIntents.client_secret });
        }
        reset({
          fullName: currentUser?.fullName || '',
          phone: currentUser?.phone || null,
          deliveryAddress: currentUser?.address || null,
        });
      } catch (error) {
        AlertService.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };

    initCheckout();
  }, []);

  return (
    <>
      <div className='container-fluid p-5'>
        <h3 className='text-center page-title'>THANH TOÁN ĐƠN HÀNG</h3>
        <div className='py-3 center-box'>
          <img src='/assets/images/divider.png' alt='divider' />
        </div>
        <div className='container py-3'>
          <Form layout='vertical' onFinish={handleSubmit(handleCheckout)}>
            <h4 className='page-title'>HÌNH THỨC VẬN CHUYỂN</h4>
            <Form.Item>
              <Controller
                name='deliveryType'
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    {deliveryOptions.map((option) => (
                      <div key={option.value} className='p-3'>
                        <Radio value={option.value} className='checkout-option'>
                          <span className='mx-2'>{option.icon}</span>
                          <span>{option.label}</span>
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                )}
              />
            </Form.Item>
            {watch('deliveryType') === DeliveryOptions.DELIVERY && (
              <>
                <FormInput
                  label='Người nhận'
                  control={control}
                  error={errors.fullName}
                  name='fullName'
                  placeholder='Nhập tên người nhận'
                  rules={{
                    required: 'Tên người nhận không được để trống',
                  }}
                />
                <FormInput
                  label='Số điện thoại'
                  control={control}
                  error={errors.phone}
                  name='phone'
                  placeholder='Nhập số điện thoại'
                  rules={{
                    required: 'Số điện thoại không được để trống',
                    pattern: {
                      value: /^(\+84|0)(3|5|7|8|9)(\d{8})$/,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  }}
                />
                <FormInput
                  label='Địa chỉ giao hàng'
                  control={control}
                  error={errors.deliveryAddress}
                  name='deliveryAddress'
                  placeholder='Địa chỉ giao hàng'
                  rules={{
                    required: 'Vui lòng nhập địa chỉ giao hàng',
                  }}
                />
              </>
            )}
            <hr />
            <h4 className='page-title'>PHƯƠNG THỨC THANH TOÁN</h4>
            <Form.Item>
              <Controller
                name='paymentMethod'
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    {paymentOptions.map((option) => (
                      <div key={option.value} className='p-3'>
                        <Radio value={option.value} className='checkout-option'>
                          <span className='mx-2'>{option.icon}</span>
                          <span>{option.label}</span>
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                )}
              />
            </Form.Item>
            {watch('paymentMethod') === PaymentMethods.Credit ? (
              options && options.clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <Payments />
                </Elements>
              ) : (
                <Alert
                  message='Hệ thống thanh toán bằng thẻ tín dụng hiện đang bị lỗi. Vui lòng chọn phương thức thanh toán khác'
                  type='error'
                />
              )
            ) : null}
            <hr />
            <h4 className='page-title'>GHI CHÚ</h4>
            <Form.Item>
              <Controller
                name='notes'
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    rows={3}
                    placeholder='Thêm ghi chú (nếu có)'
                    {...field}
                    onResize={() => {}}
                    autoSize={false}
                  />
                )}
              />
            </Form.Item>
            <hr />
            <div className='d-flex align-items-center justify-content-end'>
              <div className='w-50 text-right'>
                <div className='checkout-detail'>
                  <h4 className='page-title'>TỔNG TIỀN:</h4>
                  <h4 className='page-title'>
                    <NumericFormat value={totalBill} displayType='text' thousandSeparator=',' />
                  </h4>
                </div>
                <div className='checkout-detail'>
                  <span>Tổng tiền sản phẩm: </span>
                  <NumericFormat value={totalBill} displayType='text' thousandSeparator=',' />
                </div>
                <div className='checkout-detail'>
                  <span>Phí vận chuyển: </span>
                  <NumericFormat value={0} displayType='text' thousandSeparator=',' />
                </div>
              </div>
            </div>
            <hr />
            <div className='checkout-detail'>
              <Button size='large' type='dashed'>
                Quay lại giỏ hàng
              </Button>
              <Button
                size='large'
                type='primary'
                className='ml-4'
                htmlType='submit'
                disabled={!totalBill}>
                Thanh toán
              </Button>
            </div>
          </Form>
        </div>
        <hr />
        <h4 className='page-title text-center'>CHI TIẾT ĐƠN HÀNG</h4>
        <DynamicTable cols={tableColumns} dataSrc={products} rowKey='_id' />
      </div>
    </>
  );
};

export default Checkout;
