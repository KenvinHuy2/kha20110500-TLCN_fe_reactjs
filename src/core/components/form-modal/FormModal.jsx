import { Button, Modal } from 'antd';
import React from 'react';

const FormModal = ({
  isOpen,
  title,
  width,
  children,
  okBtnText,
  cancelBtnText,
  onCancel = () => {},
  onSubmit = () => {},
  isUseDefaultFooter = true,
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
        {isUseDefaultFooter && (
          <>
            <hr />
            <div className='d-flex justify-content-between align-items-center'>
              <Button htmlType='button' onClick={onCancel} size='large'>
                {cancelBtnText || 'Cancel'}
              </Button>
              <Button size='large' type='primary' htmlType='submit' onClick={onSubmit}>
                {okBtnText || 'Ok'}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default FormModal;
