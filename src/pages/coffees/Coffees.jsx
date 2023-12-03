import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Empty, Form, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormDropdown, FormInput, ProductCard } from '../../core/components';
import { AlertService, MarkersService, ProductsService } from '../../core/services';
import { storeActions } from '../../core/store';
import './styles.scss';

const Coffees = () => {
  const [markers, setMarkers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    name: undefined,
    productType: process.env.REACT_APP_COFFEE_PRODUCT_TYPE_ID,
    markers: undefined,
    page: 1,
  });
  const [pagination, setPagination] = useState({});

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      productType: process.env.REACT_APP_COFFEE_PRODUCT_TYPE_ID,
      markers: [],
    },
  });

  const handleSearchProducts = (formValue) => {
    setFilterOptions({
      ...filterOptions,
      name: formValue.name.trim() || undefined,
      productType: process.env.REACT_APP_COFFEE_PRODUCT_TYPE_ID,
      markers: formValue.markers && formValue.markers.length ? formValue.markers : undefined,
    });
  };

  const handleClearFilterOptions = () => {
    reset({
      name: '',
      productType: process.env.REACT_APP_COFFEE_PRODUCT_TYPE_ID,
      markers: [],
    });
    setFilterOptions({
      name: undefined,
      productType: process.env.REACT_APP_COFFEE_PRODUCT_TYPE_ID,
      markers: undefined,
      page: 1,
    });
  };

  const getAllProducts = async (filterOptions, page, pageSize) => {
    try {
      dispatch(storeActions.showLoading());
      const { products, pagination } = await ProductsService.getAllProducts(
        filterOptions,
        page,
        pageSize,
      );
      setProducts(products);
      setPagination(pagination);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  useEffect(() => {
    getAllProducts(filterOptions, filterOptions.page, 12);
  }, [filterOptions.name, filterOptions.markers, filterOptions.page]);

  useEffect(() => {
    const getAllProductTypesAndMarkers = async () => {
      try {
        dispatch(storeActions.showLoading());
        const markers = await MarkersService.getAllMarkers();
        setMarkers(markers.map((marker) => ({ label: marker.name, value: marker._id })));
      } catch (error) {
        AlertService.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };
    getAllProductTypesAndMarkers();
  }, []);

  return (
    <>
      <div id='coffees'>
        <div className='coffee-banner'>
          <img src='/assets/images/ca_phe_banner.jpeg' alt='Coffee banner' width='100%' />
        </div>
        <div className='pt-5'>
          <h1 className='text-center page-title'>HẠT CÀ PHÊ PHÚC LONG</h1>
        </div>
        <div className='py-3 center-box'>
          <img src='/assets/images/divider.png' alt='Coffee divider' />
        </div>
        <div className='container p-3'>
          <div className='search-bar px-4'>
            <Form
              autoComplete='false'
              layout='horizontal'
              onFinish={handleSubmit(handleSearchProducts)}>
              <div className='row'>
                <div className='col-md-4 col-xs-12'>
                  <FormInput
                    placeholder='Tên sản phẩm'
                    name='name'
                    control={control}
                    error={errors.name}
                  />
                </div>
                <div className='col-md-4 col-xs-12'>
                  <FormDropdown
                    isMultiple
                    allowClear={false}
                    placeholder='Chọn markers'
                    name='markers'
                    control={control}
                    error={errors.markers}
                    dropdownOptions={markers}
                  />
                </div>
                <div className='col-md-4 col-xs-12'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Button htmlType='submit' type='primary' size='large' icon={<SearchOutlined />}>
                      Tìm kiếm
                    </Button>
                    <Button
                      danger
                      className='ml-3'
                      htmlType='button'
                      type='primary'
                      size='large'
                      icon={<ClearOutlined />}
                      onClick={handleClearFilterOptions}>
                      Bỏ lọc
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div className='py-2 list-products'>
            {products.length ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  productId={product._id}
                  markers={product?.markers || []}
                  price={product?.defaultPrice?.price || 0}
                  image={product?.defaultImage || '/assets/images/no_images.jpeg'}
                />
              ))
            ) : (
              <div className='d-flex justify-content-center align-items-center w-100'>
                <Empty description='Không tìm thấy sản phẩm nào' />
              </div>
            )}
          </div>
          <div className='pt-1 pb-3'>
            <div className='d-flex justify-content-center align-items-center'>
              <Pagination
                hideOnSinglePage
                defaultCurrent={1}
                defaultPageSize={1}
                current={pagination.currentPage || 1}
                total={pagination.totalPages || 1}
                onChange={(page) => setFilterOptions({ ...filterOptions, page })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coffees;
