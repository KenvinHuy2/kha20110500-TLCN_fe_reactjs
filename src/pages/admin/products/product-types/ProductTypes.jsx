import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DynamicTable, FormInput, FormModal } from '../../../../core/components';
import { AlertService, ProductTypesService } from '../../../../core/services';
import { storeActions } from '../../../../core/store';

const ProductTypes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      productTypeName: '',
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
        title: 'Tên loại sản phẩm',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: null,
        dataIndex: null,
        key: 'actions',
        render: (_, productType) => {
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

  const handleCreateProductType = async (formData) => {
    try {
      dispatch(storeActions.showLoading());
      const newProductType = await ProductTypesService.createProductType(formData);
      setProductTypes([newProductType, ...productTypes]);
      reset();
      setIsOpen(false);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  useEffect(() => {
    const getAllProductTypes = async () => {
      try {
        dispatch(storeActions.showLoading());
        const productTypes = await ProductTypesService.getAllProductTypes();
        setProductTypes(productTypes);
      } catch (error) {
        AlertService.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };

    getAllProductTypes();
  }, []);

  return (
    <>
      <div className='pt-2 px-3'>
        <div className='d-flex align-items-center justify-content-start'>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            onClick={() => setIsOpen(true)}>
            Thêm loại sản phẩm
          </Button>
        </div>
        <div className='pt-2'>
          <DynamicTable
            cols={tableColumns}
            dataSrc={productTypes}
            hasFilters
            searchByFields={['name']}
            hasBorder
            rowKey='_id'
          />
        </div>
        <FormModal
          title='Thêm loại sản phẩm'
          isOpen={isOpen}
          onCancel={clearAndCloseForm}
          onSubmit={handleSubmit(handleCreateProductType)}
          okBtnText='Tạo'
          cancelBtnText='Huỷ'>
          <Form name='create-product-type-form' layout='vertical' autoComplete='false'>
            <FormInput
              label='Tên loại sản phẩm'
              name='productTypeName'
              control={control}
              error={errors.productTypeName}
              placeholder='Nhập tên loại sản phẩm'
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

export default ProductTypes;
