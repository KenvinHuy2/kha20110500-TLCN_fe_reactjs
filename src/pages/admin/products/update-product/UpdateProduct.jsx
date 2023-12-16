import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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

const UpdateProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [images, setImages] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
    },
  });
  const dispatch = useDispatch();

  const setFormValue = (product) => {
    const formValues = {};
    for (let field in product) {
      switch (field) {
        case 'name': {
          formValues.name = product.name;
          break;
        }
        case 'productType': {
          formValues.productType = product.productType._id;
          break;
        }
        case 'markers': {
          formValues.markers = product.markers.map((marker) => marker._id);
          break;
        }
        case 'prices': {
          product.prices.forEach((price) => {
            formValues['size' + price.size] = price.size;
            formValues['priceForSize' + price.size] = price.price;
          });
          break;
        }
        case 'images': {
          setImages(product.images);
          break;
        }
        case 'desc': {
          formValues.desc = product.desc;
          break;
        }
        default: {
          break;
        }
      }
    }
    reset(formValues);
  };

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

  const getProductById = async () => {
    try {
      dispatch(storeActions.showLoading());
      const product = await ProductsService.getProductById(productId);
      setProduct(product);
      setFormValue(product);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const handleUpdateProduct = async (formValue) => {
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
    formData.append('oldImages', JSON.stringify(images));
    productImages.forEach((file) => {
      formData.append('images', file.originFileObj);
    });

    try {
      dispatch(storeActions.showLoading());
      await ProductsService.updateProduct(productId, formData);
      AlertService.success('Cập nhật sản phẩm thành công');
      setProductImages([]);
      getProductById();
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const handleRemoveFile = (file) => {
    setImages(images.filter((item) => item.uid !== file.uid));
  };

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

  const handleRemoveExistedImages = (removedUrl) => {
    setImages(images.filter((itemUrl) => itemUrl !== removedUrl));
  };

  useEffect(() => {
    getProductById();
    getProductTypesAndMarkers();
  }, []);

  return (
    <>
      <div className='container'>
        <Form layout='vertical' autoComplete='false' onFinish={handleSubmit(handleUpdateProduct)}>
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
            {images.map((url) => (
              <div
                className='d-flex align-items-center justify-content-between my-2 p-1 pr-3 border rounded'
                key={url}>
                <Image src={url} style={{ width: 120, height: 120, objectFit: 'contain' }} />
                <Button icon={<DeleteOutlined />} onClick={() => handleRemoveExistedImages(url)} />
              </div>
            ))}

            <div className='pt-2'>
              <Upload
                multiple
                id='upload'
                listType='picture'
                fileList={productImages}
                maxCount={5 - (product && product.images ? product.images.length : 0)}
                beforeUpload={(file) => {
                  if (!file.type.startsWith('image/')) {
                    AlertService.error('Chi cho phép tải lên hình ảnh');
                  }
                  if (file.size > 1024 * 1024 * 10) {
                    AlertService.error('Kích thước file tối đa là 10MB');
                  }
                  return false;
                }}
                onRemove={handleRemoveFile}
                onChange={handleUploadFile}>
                {productImages.length + images.length <= 5 && (
                  <Button htmlType='button' icon={<UploadOutlined />} size='large'>
                    Tải ảnh lên
                  </Button>
                )}
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
              Cập nhật sản phẩm
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateProduct;
