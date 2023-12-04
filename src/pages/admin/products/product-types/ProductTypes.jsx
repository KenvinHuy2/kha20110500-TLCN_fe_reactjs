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
  const [isCreate, setIsCreate] = useState(true);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);

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
              <Button
                type='primary'
                icon={<EditOutlined />}
                onClick={() => openUpdateProductTypeDialog(productType)}>
                Sửa
              </Button>
              <Button
                type='primary'
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteProductType(productType)}>
                Xoá
              </Button>
            </Space>
          );
        },
        align: 'center',
      },
    ];
  }, [productTypes.length]);

  const clearAndCloseForm = () => {
    reset({ productTypeName: '' });
    setIsOpen(false);
    setIsCreate(true);
    setSelectedProductType(null);
  };

  const handleCreateProductType = async (formData) => {
    try {
      dispatch(storeActions.showLoading());
      const newProductType = await ProductTypesService.createProductType(formData);
      reset();
      setIsOpen(false);
      setProductTypes([newProductType, ...productTypes]);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const openUpdateProductTypeDialog = (productType) => {
    reset({ productTypeName: productType.name });
    setSelectedProductType(productType);
    setIsCreate(false);
    setIsOpen(true);
  };

  const handleUpdateProductType = async (formValue) => {
    const { productTypeName } = formValue;
    if (productTypeName.toLowerCase() === selectedProductType.name.toLowerCase()) {
      clearAndCloseForm();
      return;
    }

    try {
      dispatch(storeActions.showLoading());
      const updatedProductType = await ProductTypesService.updateProductType(
        selectedProductType._id,
        formValue,
      );
      const idx = productTypes.findIndex((item) => item._id === updatedProductType._id);
      if (idx !== -1) {
        productTypes[idx] = {
          ...updatedProductType,
        };
        setProductTypes([...productTypes]);
        clearAndCloseForm();
      } else {
        AlertService.error('Không tìm thấy id sau khi cập nhật loại sản phẩm');
      }
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const handleDeleteProductType = async (productType) => {
    AlertService.confirm(`Bạn có chắc là muốn xoá loại sản phẩm: ${productType.name}`).then(
      async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            dispatch(storeActions.showLoading());
            await ProductTypesService.deleteProductType(productType._id);
            reset();
            setIsOpen(false);
            setProductTypes(productTypes.filter((item) => item._id !== productType._id));
          } catch (error) {
            AlertService.error(error?.response?.data?.message || error.message);
          } finally {
            dispatch(storeActions.hideLoading());
          }
        }
      },
    );
  };

  useEffect(() => {
    const getAllProductTypes = async () => {
      try {
        dispatch(storeActions.showLoading());
        const productTypes = await ProductTypesService.getAllProductTypes();
        setProductTypes([...productTypes]);
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
          isOpen={isOpen}
          cancelBtnText='Huỷ'
          onCancel={clearAndCloseForm}
          okBtnText={isCreate ? 'Tạo' : 'Cập nhật'}
          onSubmit={
            isCreate ? handleSubmit(handleCreateProductType) : handleSubmit(handleUpdateProductType)
          }
          title={isCreate ? 'Thêm loại sản phẩm' : 'Cập nhật loại sản phẩm'}>
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
