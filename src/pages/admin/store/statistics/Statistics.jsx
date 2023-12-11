import { LineChartOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import {
  CategoryScale,
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormDatePicker, FormDropdown } from '../../../../core/components';
import { OrderStatus } from '../../../../core/constants';
import { AlertService } from '../../../../core/services';
import { StatisticService } from '../../../../core/services/statistic.service';
import { storeActions } from '../../../../core/store';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

const DEFAULT_FILTER_OPTIONS = {
  orderStatus: null,
  statisticBy: null,
  startDate: null,
  endDate: null,
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
    label: 'Ngày',
    value: 'date',
  },
  {
    label: 'Tháng',
    value: 'month',
  },
  {
    label: 'Năm',
    value: 'year',
  },
];

const Statistics = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...DEFAULT_FILTER_OPTIONS },
  });

  const handleCalculateStatistic = async (formValues) => {
    const filterOptions = {
      ...formValues,
      startDate:
        formValues.startDate && formValues.startDate.$d ? formValues.startDate.$d : undefined,
      endDate: formValues.endDate && formValues.endDate.$d ? formValues.endDate.$d : undefined,
    };

    try {
      dispatch(storeActions.showLoading());
      const orders = await StatisticService.getStatistics(filterOptions);

      if (orders.length > 1) {
        const labels = [];
        const dataPoints = [];
        orders.forEach((item) => {
          const date = Object.keys(item)[0];
          const value = item[date];
          labels.push(date);
          dataPoints.push(value);
        });
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: dataPoints,
            },
          ],
        });
      } else {
        const labels = Object.keys(orders);
        const dataPoints = Object.values(orders);

        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: dataPoints,
            },
          ],
        });
      }
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='px-3'>
      <Form
        layout='vertical'
        className='search-bar-form'
        onFinish={handleSubmit(handleCalculateStatistic)}>
        <div className='row' style={{ alignItems: 'center' }}>
          <div className='col-md-2 col-xs-12'>
            <FormDatePicker
              label='Từ ngày'
              name='startDate'
              control={control}
              placeholder='Từ ngày'
              error={errors.startDate}
              rules={{
                required: 'Vui lòng chọn giá trị',
              }}
            />
          </div>
          <div className='col-md-2 col-xs-12'>
            <FormDatePicker
              label='Đến ngày'
              name='endDate'
              control={control}
              placeholder='Đến ngày'
              error={errors.endDate}
              rules={{
                required: 'Vui lòng chọn giá trị',
              }}
            />
          </div>
          <div className='col-md-3 col-xs-12'>
            <FormDropdown
              label='Thống kê theo'
              placeholder='Chọn hình thức thống kê'
              name='statisticBy'
              control={control}
              error={errors.statisticBy}
              dropdownOptions={formatOptions}
              rules={{
                required: 'Vui lòng chọn giá trị',
              }}
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
              rules={{
                required: 'Vui lòng chọn giá trị',
              }}
            />
          </div>
          <div className='col-md-2 col-xs-12 text-center'>
            <Button htmlType='submit' type='primary' size='large' icon={<LineChartOutlined />}>
              Thống Kê
            </Button>
          </div>
        </div>
      </Form>
      <div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Statistics;
