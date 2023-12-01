import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormDropdown, FormInput, FormTextArea } from '../../../../core/components';
import {
  AlertService,
  MarkersService,
  ProductTypesService,
  ProductsService,
} from '../../../../core/services';
import { storeActions } from '../../../../core/store';

const DEFAULT_FORM_VALUES = {
  name: '',
  desc: '',
  productType: null,
  markers: [],
  sizeS: 'S',
  priceForSizeS: null,
  sizeM: 'M',
  priceForSizeM: null,
  sizeL: 'L',
  priceForSizeL: null,
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [markers, setMarkers] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const [productImages, setProductImages] = useState([]);
  const handleUploadFile = (info) => {
    const { fileList } = info;

    if (fileList.length > 5) {
      AlertService.warn('Chỉ upload được tối đa 5 hình ảnh');
      return;
    }

    const hasInvalidImage = fileList.some((file) => !file.type.startsWith('image/'));
    if (hasInvalidImage) {
      AlertService.warn('Chỉ cho phép upload hình ảnh');
      return;
    }
    const newFileList = fileList.reduce((results, file) => {
      const isExisted = results.some((item) => item.name === file.name);
      if (!isExisted) {
        results.push(file);
      }
      return results;
    }, []);

    setProductImages(newFileList);
  };
  const handleRemoveFile = (file) => {
    setProductImages(productImages.filter((item) => item.uid !== file.uid));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });
  const handleCreateProduct = async (formValue) => {
    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('desc', formValue.desc);
    formData.append('productType', formValue.productType);
    formValue.markers.forEach((marker) => {
      formData.append('markers[]', marker);
    });
    const prices = ['S', 'M', 'L'].map((key) => ({
      size: formValue['size' + key],
      price: +formValue['priceForSize' + key],
    }));
    formData.append('prices', JSON.stringify(prices));
    productImages.forEach((file) => {
      formData.append('images', file.originFileObj);
    });

    try {
      dispatch(storeActions.showLoading());
      const product = await ProductsService.createProduct(formData);
      AlertService.success(`Thêm sản mới thành công. Id sản phẩm mới: ${product._id}`);
      setProductImages([]);
      reset(DEFAULT_FORM_VALUES);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  useEffect(() => {
    const getProductTypesAndMarkers = async () => {
      try {
        dispatch(storeActions.showLoading());
        const [markers, productTypes] = await Promise.all([
          MarkersService.getAllMarkers(),
          ProductTypesService.getAllProductTypes(),
        ]);
        setMarkers(markers.map((marker) => ({ value: marker._id, label: marker.name })));
        setProductTypes(
          productTypes.map((productType) => ({ value: productType._id, label: productType.name })),
        );
      } catch (error) {
        AlertService.error(error?.response?.data.message || error.message);
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };

    getProductTypesAndMarkers();
  }, []);

  return (
    <>
      <div className='container'>
        <Form layout='vertical' autoComplete='false' onFinish={handleSubmit(handleCreateProduct)}>
          <FormInput
            label='Tên sản phẩm'
            name='name'
            placeholder='Nhập tên sản phẩm'
            control={control}
            error={errors.name}
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormDropdown
                hasSearch
                label='Loại sản phẩm'
                name='productType'
                control={control}
                error={errors.productType}
                placeholder='Chọn loại sản phẩm'
                dropdownOptions={productTypes}
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormDropdown
                isMultiple
                label='Markers'
                name='markers'
                control={control}
                error={errors.markers}
                placeholder='Chọn markers'
                dropdownOptions={markers}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2 col-xs-6'>
              <FormInput
                label='Kích thước'
                name='sizeS'
                control={control}
                error={errors.sizeS}
                isReadOnly
              />
            </div>
            <div className='col-md-10 col-xs-6'>
              <FormInput
                label='Giá'
                name='priceForSizeS'
                control={control}
                error={errors.priceForSizeS}
                placeholder='Nhập giá cho size S'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2 col-xs-6'>
              <FormInput
                label='Kích thước'
                name='sizeM'
                control={control}
                error={errors.sizeM}
                isReadOnly
              />
            </div>
            <div className='col-md-10 col-xs-6'>
              <FormInput
                label='Giá'
                name='priceForSizeM'
                control={control}
                error={errors.priceForSizeM}
                placeholder='Nhập giá cho size M'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2 col-xs-6'>
              <FormInput
                label='Kích thước'
                name='sizeL'
                control={control}
                error={errors.sizeL}
                isReadOnly
              />
            </div>
            <div className='col-md-10 col-xs-6'>
              <FormInput
                label='Giá'
                name='priceForSizeL'
                control={control}
                error={errors.priceForSizeL}
                placeholder='Nhập giá cho size L'
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='upload'>Hình ảnh sản phẩm (tối đa 5 hình)</label>
            <div className='pt-2'>
              <Upload
                multiple
                id='upload'
                maxCount={5}
                fileList={productImages}
                onChange={handleUploadFile}
                onRemove={handleRemoveFile}
                beforeUpload={(file) => {
                  if (!file.type.startsWith('image/')) {
                    AlertService.error('Chi cho phép tải lên hình ảnh');
                    return false;
                  }
                  if (file.size > 1024 * 1024 * 10) {
                    AlertService.error('Kích thước file tối đa là 10MB');
                    return false;
                  }

                  return true;
                }}>
                <Button htmlType='button' icon={<UploadOutlined />} size='large'>
                  Tải ảnh lên
                </Button>
              </Upload>
            </div>
          </div>
          <FormTextArea
            label='Mô tả sản phẩm'
            name='desc'
            placeholder='Nhập mô tả sản phẩm'
            control={control}
            error={errors.desc}
          />
          <div className='form-group'>
            <Button htmlType='submit' type='primary' size='large' className='w-100'>
              Thêm sản phẩm
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;
