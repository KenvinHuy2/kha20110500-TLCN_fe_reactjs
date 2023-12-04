import React from 'react';
import { useForm } from 'react-hook-form';
import { DeliveryOptions, PaymentMethods } from '../../core/constants';
import { CarOutlined, DollarOutlined } from '@ant-design/icons';

const deliveryOptions = [
  {
    label: DeliveryOptions.PICKUP,
    value: DeliveryOptions.PICKUP,
  },
  {
    value: DeliveryOptions.DELIVERY,
    value: DeliveryOptions.DELIVERY,
  },
];

const paymentOptions = [
  {
    label: PaymentMethods.CashOnDelivery,
    value: PaymentMethods.CashOnDelivery,
  },
  {
    label: PaymentMethods.Credit,
    value: PaymentMethods.Credit,
  },
];

const Checkout = () => {
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryType: DeliveryOptions.PICKUP,
      paymentMethod: PaymentMethods.CashOnDelivery,
    },
  });
  return (
    <>
      <div className='container-fluid p-3'>
        <div className='row'>
          <div className='col-md-7 col-xs-12 border-right'>
            <div>
              <h3 className='page-title'>Thông tin vận chuyển</h3>
            </div>
            <hr />
            <div>
              <h3 className='page-title'>Hình thức thanh toán</h3>
            </div>
          </div>
          <div className='col-md-5 col-xs-12'>
            <h3 className='text-center page-title'>Chi tiết người đặt hàng</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
