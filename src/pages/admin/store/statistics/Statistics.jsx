import { SearchOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDatePicker, FormDropdown } from '../../../../core/components';
import { OrderStatus } from '../../../../core/constants';
import moment from 'moment';
import { StatisticService } from '../../../../core/services/statistic.service';
import { AlertService } from '../../../../core/services';
import { useDispatch } from 'react-redux';
import { storeActions } from '../../../../core/store';
import { Line } from '@ant-design/plots';

const DEFAULT_FILTER_OPTIONS = {
  orderStatus: OrderStatus.IN_PROGRESS,
  statisticBy: "date",
  startDate: moment().date('MM/DD/YYYY'),
  endDate: moment().date('MM/DD/YYYY'),
};
const orderStatusOptions = [
  {
    label: OrderStatus.IN_PROGRESS,
    value: OrderStatus.IN_PROGRESS,
  },
  {
    label: OrderStatus.SUCCESS,
    value: OrderStatus.SUCCESS,
  },
  {
    label: OrderStatus.FAILED,
    value: OrderStatus.FAILED,
  },
];

const formatOptions = [
  {
    label: "Ngày",
    value: "date",
  },
  {
    label: "Tháng",
    value: "month",
  },
  {
    label: "Năm",
    value: "year",
  },
];

const Statistics = () => {
  const dispatch = useDispatch()
  const [data,setData]= useState([])

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { ...DEFAULT_FILTER_OPTIONS },
  });

  const handleSearch = async (formValues) => {
    const filterOptions = { ...formValues, startDate: moment(formValues.startDate).format('YYYY-MM-DD'), endDate: moment(formValues.endDate).format('YYYY-MM-DD') }
    console.log(formValues.startDate,moment(formValues.startDate).format('YYYY-MM-DD'))
    try {
      dispatch(storeActions.showLoading());
      const orders = await StatisticService.getStatistics(filterOptions);
      const convertedData = Object.entries(orders).map(([date, scales]) => ({
        Date: date,
        scales: scales
      }));
      setData(convertedData)

    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };
  const config = {
    data, 
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
  };
  return <div className='px-3'>
    <Form
      layout='vertical'
      className='search-bar-form'
      onFinish={handleSubmit(handleSearch)}>
      <div className='row' style={{ alignItems: 'center' }}>
        <div className='col-md-2 col-xs-12'>
          <FormDatePicker
            label='Từ ngày'
            name='startDate'
            control={control}
            placeholder='Từ ngày'
          />
        </div>
        <div className='col-md-2 col-xs-12'>
          <FormDatePicker
            label='Đến ngày'
            name='endDate'
            control={control}
            placeholder='Đến ngày'
          />
        </div>
        <div className='col-md-3 col-xs-12'>
          <FormDropdown
            label='Tìm kiếm theo'
            placeholder='Tìm kiếm theo'
            name='statisticBy'
            control={control}
            error={errors.paymentMethod}
            dropdownOptions={formatOptions}
          />
        </div>
        <div className='col-md-3 col-xs-12'>
          <FormDropdown
            label='Trạng thái đơn hàng'
            placeholder='Trạng thái đơn hàng'
            name='orderStatus'
            control={control}
            error={errors.orderStatus}
            dropdownOptions={orderStatusOptions}
          />
        </div>
        <div className='col-md-2 col-xs-12 text-center'>
          <Button htmlType='submit' type='primary' size='large' icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        </div>
      </div>
    </Form>
    <div>
      {data.length > 0 && <Line {...config} />}
    
    </div>
  </div>;
};

export default Statistics;
