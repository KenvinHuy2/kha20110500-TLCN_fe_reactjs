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
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);


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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sample Data',
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
    reset,
  } = useForm({
    defaultValues: { ...DEFAULT_FILTER_OPTIONS },
  });

  const handleSearch = async (formValues) => {
    const filterOptions = { ...formValues, startDate: moment(formValues.startDate).format('YYYY-MM-DD'), endDate: moment(formValues.endDate).format('YYYY-MM-DD') }
    console.log(formValues.startDate, moment(formValues.startDate).format('YYYY-MM-DD'))
    try {
      dispatch(storeActions.showLoading());
      const orders = await StatisticService.getStatistics(filterOptions);

      if (orders.length > 1) {
        console.log("a")
        const labels = [];
        const dataPoints = [];
        orders.forEach(item => {
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
      }else{

        const labels = Object.keys(orders);
        const dataPoints = Object.values(orders);
        console.log(labels,dataPoints)
    
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
    plugins: {
      title: {
        display: true,
        text: 'Sample Line Chart',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Ngày',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Trung bình tiền',
        },
      },
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
      <Line data={chartData} options={options} />

    </div>
  </div>;
};

export default Statistics;
