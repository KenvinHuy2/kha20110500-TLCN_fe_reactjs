import { DeleteOutlined } from '@ant-design/icons';
import { Button, Descriptions, Image, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicTable } from '../../core/components';
import { DeliveryStatus, OrderStatus, PaymentStatus } from '../../core/constants';
import { AlertService, OrdersService } from '../../core/services';
import { storeActions, storeSelectors } from '../../core/store';

const colorMap = {
  [PaymentStatus.NOT_YET_PAY]: 'orange',
  [PaymentStatus.PAID]: 'green',
  [DeliveryStatus.IN_PROGRESS]: 'blue',
  [DeliveryStatus.DELIVERED_SUCCESS]: 'green',
  [DeliveryStatus.DELIVERED_FAILED]: 'red',
  [OrderStatus.IN_PROGRESS]: 'blue',
  [OrderStatus.SUCCESS]: 'green',
  [OrderStatus.FAILED]: 'red',
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector(storeSelectors.selectCurrentUser);

  const handleCancelOrder = async (order) => {
    try {
      const { value: notes } = await AlertService.alertWithTextArea();
      const changes = {
        notes,
        orderStatus: OrderStatus.FAILED,
        deliveryStatus: DeliveryStatus.DELIVERED_FAILED,
      };
      dispatch(storeActions.showLoading());
      const updatedOrders = await OrdersService.updateOrder(order._id, changes);
      const orderIdx = orders.findIndex((o) => o._id === updatedOrders._id);
      if (orderIdx !== -1) {
        orders[orderIdx] = JSON.parse(JSON.stringify(updatedOrders));
        setOrders([...orders]);
      }
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const mainTableColumns = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        render: (value) => value.slice(0, 8),
        align: 'center',
      },
      {
        title: 'Tình trạng đơn hàng',
        key: 'orderStatus',
        dataIndex: 'orderStatus',
        render: (value) => (
          <Tag color={colorMap[value]}>
            <span className='text-capitalize'>{value}</span>
          </Tag>
        ),
        align: 'center',
      },
      {
        title: 'Tổng tiền',
        key: 'totalBill',
        dataIndex: 'totalBill',
        render: (value) => <NumericFormat value={value} displayType='text' thousandSeparator=',' />,
        align: 'center',
      },
      {
        title: 'Ngày đặt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (value) => moment(value).format('HH:mm - DD/MM/YYYY'),
        align: 'center',
      },
      {
        title: 'Ghi chú',
        key: 'notes',
        dataIndex: 'notes',
        render: (value) => (
          <div
            style={{
              width: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
            {value}
          </div>
        ),
      },
      {
        title: '',
        key: 'actions',
        dataIndex: null,
        render: (_, order) => (
          <>
            {order.orderStatus === OrderStatus.IN_PROGRESS && (
              <Button
                size='large'
                type='primary'
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleCancelOrder(order)}>
                Huỷ
              </Button>
            )}
          </>
        ),
        align: 'center',
      },
    ];
  }, [orders.length]);

  const subTableColumns = useMemo(() => {
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

  useEffect(() => {
    const getOrders = async () => {
      try {
        dispatch(storeActions.showLoading());
        const orders = await OrdersService.getOrdersByUserId(currentUser._id);
        setOrders(orders);
      } catch (error) {
        AlertService.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <div className='container pb-5'>
        <div className='pt-5'>
          <h1 className='text-center page-title'>LỊCH SỬ ĐẶT HÀNG</h1>
        </div>
        <div className='py-3 center-box'>
          <img src='/assets/images/divider.png' alt='divider' />
        </div>
        <Table
          rowKey='_id'
          columns={mainTableColumns}
          dataSource={orders}
          pagination={{ pageSize: 12, hideOnSinglePage: true }}
          expandable={{
            expandedRowRender: (order) => (
              <>
                {order.orderStatus === OrderStatus.FAILED && (
                  <Descriptions title='Lý do huỷ' column={1}>
                    <Descriptions.Item label=''>
                      <em>{order.notes}</em>
                    </Descriptions.Item>
                  </Descriptions>
                )}
                <Descriptions title='Thông tin thanh toán' column={1}>
                  <Descriptions.Item label='Hình thức thanh toán'>
                    <span className='text-capitalize'>{order.paymentMethod}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label='Trạng thái'>
                    <Tag color={colorMap[order.paymentStatus]}>
                      <span className='text-capitalize'>{order.paymentStatus}</span>
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions title='Thông tin vận chuyển' column={1}>
                  <Descriptions.Item label='Hình thức vận chuyên'>
                    <span className='text-capitalize'>{order.deliveryType}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label='Tình trạng'>
                    <Tag color={colorMap[order.deliveryStatus]}>
                      <span className='text-capitalize'>{order.deliveryStatus}</span>
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions title='Thông tin người nhận' column={1}>
                  <Descriptions.Item label='Người nhận'>{order.fullName}</Descriptions.Item>
                  <Descriptions.Item label='Số điện thoại'>{order.phone}</Descriptions.Item>
                  <Descriptions.Item label='Địa chỉ giao hàng'>
                    {order.deliveryAddress}
                  </Descriptions.Item>
                </Descriptions>
                <hr />
                <h5 className='text-center page-title'>Chi Tiết Sản Phẩm</h5>
                <DynamicTable cols={subTableColumns} dataSrc={order.products} rowKey='_id' />
              </>
            ),
          }}
        />
      </div>
    </>
  );
};

export default OrderHistory;
