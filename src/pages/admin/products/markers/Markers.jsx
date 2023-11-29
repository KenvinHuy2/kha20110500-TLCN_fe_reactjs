import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DynamicTable, FormInput, FormModal } from '../../../../core/components';
import { AlertService, MarkersService } from '../../../../core/services';
import { storeActions } from '../../../../core/store';

const Markers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [markers, setMarkers] = useState([]);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      markerName: '',
    },
  });

  const tableColumns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        render: (value) => value.slice(-7, -1),
        align: 'center',
      },
      {
        title: 'Tên marker',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: null,
        dataIndex: null,
        key: 'actions',
        render: (_, marker) => {
          return (
            <Space size='middle'>
              <Button type='primary' icon={<EditOutlined />}>
                Sửa
              </Button>
              <Button type='primary' icon={<DeleteOutlined />} danger>
                Xoá
              </Button>
            </Space>
          );
        },
        align: 'center',
      },
    ];
  }, []);

  const clearAndCloseForm = () => {
    reset();
    setIsOpen(false);
  };

  const handleCreateMarker = async (formData) => {
    try {
      dispatch(storeActions.showLoading());
      const marker = await MarkersService.createMarker(formData);
      setMarkers([marker, ...markers]);
      reset();
      setIsOpen(false);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  useEffect(() => {
    const getAllMarkers = async () => {
      try {
        dispatch(storeActions.showLoading());
        const markers = await MarkersService.getAllMarkers();
        setMarkers(markers);
      } catch (error) {
        AlertService.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };

    getAllMarkers();
  }, []);

  return (
    <>
      <div className='pt-2 px-3'>
        <div className='d-flex align-items-center justify-content-end'>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            onClick={() => setIsOpen(true)}>
            Thêm marker
          </Button>
        </div>
        <div className='pt-2'>
          <DynamicTable
            cols={tableColumns}
            dataSrc={markers}
            hasFilters
            searchByFields={['name']}
            hasBorder
          />
        </div>
        <FormModal
          title='Thêm marker'
          isOpen={isOpen}
          onCancel={clearAndCloseForm}
          onSubmit={handleSubmit(handleCreateMarker)}
          okBtnText='Tạo'
          cancelBtnText='Huỷ'>
          <Form name='create-marker-form' layout='vertical' autoComplete='false'>
            <FormInput
              label='Tên marker'
              name='markerName'
              control={control}
              error={errors.markerName}
              placeholder='Nhập tên marker'
              rules={{
                required: 'Tên không được để trống',
              }}
            />
          </Form>
        </FormModal>
      </div>
    </>
  );
};

export default Markers;
