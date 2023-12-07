import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
        <div className='text-center'>
          <Button
            size='large'
            type='primary'
            icon={<ArrowLeftOutlined />}
            onClick={handleNavigateToPreviousPage}>
            Quay lại trang trước
          </Button>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
