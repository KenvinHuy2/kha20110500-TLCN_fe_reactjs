import { Button, Form } from 'antd';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { DynamicTable, FormDropdown, FormInput } from '../../../core/components';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import FormRangePicker from '../../../core/components/form-range-picker/FormRangePicker';

const Orders = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      search: '',
      donHang: '',
      thanhToan: '',
      vanChuyen: '',
      time:'',
    },
  });

  const tableColumns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        render: (value) => <div>a</div>,
        align: 'center',
      },
    ];
  }, []);

  const handleClearFilterOptions = () => {
    reset({
      search: '',
      donHang: '',
      thanhToan: '',
      vanChuyen: '',
      time: '',
    });
  };

  return (
    <>
      <h2 className='pt-3 pl-3 m-0 text-uppercase'>Quản lý đơn hàng</h2>
      <hr />
      <div className='pt-2 px-3'>
        <Form
          autoComplete='false'
          layout='horizontal'
          className='search-bar-form'
          onFinish={handleSubmit()}>
          <div className='row'>
            <div className='col-md-12 col-xs-12'>
              <FormInput
                placeholder='Tìm đơn hàng'
                name='search'
                control={control}
                error={errors.search}
              />
            </div>
            <div className='col-md-3 col-xs-12'>
              <FormDropdown
                placeholder='Chọn đơn hàng'
                allowClear={false}
                name='donHang'
                control={control}
                error={errors.donHang}
                dropdownOptions={[]}
              />
            </div>
            <div className='col-md-3 col-xs-12'>
              <FormDropdown
                placeholder='Chọn thanh toán'
                allowClear={false}
                name='thanhToan'
                control={control}
                error={errors.thanhToan}
                dropdownOptions={[]}
              />
            </div>
            <div className='col-md-3 col-xs-12'>
              <FormDropdown
                placeholder='Chọn vận chuyển'
                allowClear={false}
                name='vanChuyen'
                control={control}
                error={errors.vanChuyen}
                dropdownOptions={[]}
              />
            </div>
            <div className='col-md-3 col-xs-12'>
              <FormRangePicker
                allowClear={false}
                name='time'
                control={control}
                error={errors.time}
                dropdownOptions={[]}
                placeholder={['Ngày Bắt Đầu', 'Ngày Kết Thúc']}
              />
            </div>
            <div className='col-md-12 col-xs-12 text-center'>
              <Button htmlType='submit' type='primary' size='large' icon={<SearchOutlined />}>
                Tìm kiếm
              </Button>
              <Button danger className='ml-3' htmlType='button' type='primary' size='large' icon={<ClearOutlined />} onClick={handleClearFilterOptions} >
                Bỏ lọc
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className='pt-2'>
          <DynamicTable
            cols={tableColumns}
            dataSrc={[]}
            hasBorder
            rowKey='_id'
          />
        </div>
    </>
  );
};

export default Orders;
