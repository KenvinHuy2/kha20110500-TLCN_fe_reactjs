import { Descriptions, Image, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicTable } from '../../../../../core/components';
import { AlertService, OrdersService } from '../../../../../core/services';
import { storeActions, storeSelectors } from '../../../../../core/store';

const colorMap = {
  'chưa thanh toán': 'orange',
  'đã thanh toán': 'green',
  'đang giao hàng': 'blue',
  'đã giao hàng': 'green',
  'đang xử lý': 'blue',
  'hoàn tất': 'green',
  'đã huỷ': 'red',
};

const UserOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

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
        const orders = await OrdersService.getOrdersByUserId(userId);
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
      <div className='px-3 pb-5'>
        <Table
          rowKey='_id'
          columns={mainTableColumns}
          dataSource={orders}
          pagination={{ pageSize: 12, hideOnSinglePage: true }}
          expandable={{
            expandedRowRender: (order) => (
              <>
                <Descriptions title='Thông tin thanh toán' column={1}>
                  <Descriptions.Item label='Hình thức thanh toán'>
                    {order.paymentMethod}
                  </Descriptions.Item>
                  <Descriptions.Item label='Trạng thái'>
                    <Tag color={colorMap[order.paymentStatus]}>
                      <span className='text-capitalize'>{order.paymentStatus}</span>
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions title='Thông tin vận chuyển' column={1}>
                  <Descriptions.Item label='Hình thức vận chuyên'>
                    {order.deliveryType}
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

export default UserOrders;
