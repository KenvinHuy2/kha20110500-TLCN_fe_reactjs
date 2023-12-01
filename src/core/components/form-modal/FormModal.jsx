import { Button, Modal } from 'antd';
import React from 'react';

const FormModal = ({
  isOpen,
  title,
  width,
  children,
  cancelBtnText,
  okBtnText,
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  return (
    <>
      <Modal
        open={isOpen}
        title={title || 'Modal title'}
        footer={null}
        onCancel={onCancel}
        centered
        width={width || 520}>
        <hr />
        {children}
        <hr />
        <div className='d-flex justify-content-between align-items-center'>
          <Button htmlType='button' onClick={onCancel} size='large'>
            {cancelBtnText || 'Cancel'}
          </Button>
          <Button type='primary' htmlType='submit' onClick={onSubmit} size='large'>
            {okBtnText || 'Ok'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormModal;
