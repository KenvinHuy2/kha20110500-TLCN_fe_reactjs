import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToPreviousPage = () => {
    return navigate(-1);
  };

  return (
    <>
      <div className='container'>
        <div className='text-center p-5'>
          <Empty description='Trang không tìm thấy' />
          <div className='pt-3'>
            <Button
              size='large'
              type='primary'
              icon={<ArrowLeftOutlined />}
              onClick={handleNavigateToPreviousPage}>
              Quay lại trang trước
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
