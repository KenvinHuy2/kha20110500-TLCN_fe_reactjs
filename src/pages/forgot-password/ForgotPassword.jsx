import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { authService } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const onFinish = (values) => {
        authService.forgotPass(values).then((data) => {
            messageApi.open({
                type: 'success',
                content: data.message,
            });
        }).catch(err => messageApi.open({
            type: 'error',
            content: err.response.data.message,
        }));
    };
    return <>
        {contextHolder}
        <div className='form-title'>Quên Mật Khẩu</div>
        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="email"
            >
                <Input size='large' placeholder='Nhập email của bạn' />
            </Form.Item>

       
            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{ marginTop: '20px' }}>
                    Xác Nhận
                </Button>
                <div style={{ marginTop: 20 }}><span style={{ fontWeight: 500, color: '#5800c3', marginLeft: 10, cursor: 'pointer' }} onClick={()=>navigate('/login')}>Quay lại</span> </div>
            </Form.Item>
        </Form>
    </>
};

export default ForgotPassword;
