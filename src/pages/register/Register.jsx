import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { authService } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const onFinish = (values) => {
        authService.signUp(values).then((data) => {
            setTimeout(() => {
                navigate('/login')
            }, 1000);
            messageApi.open({
                type: 'success',
                content: 'Đăng ký thành công',
            });
        }).catch(err => messageApi.open({
            type: 'error',
            content: err.response.data.message,
        }));
    };
    return <>
        {contextHolder}
        <div className='form-title'>Đăng Ký</div>
        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="name"
            >
                <Input size='large' placeholder='Nhập tên của bạn' />
            </Form.Item>

            <Form.Item
                name="email"
            >
                <Input size='large' placeholder='Nhập email của bạn' />
            </Form.Item>
            <Form.Item
                name="password"
            >
                <Input.Password size='large' placeholder='Nhập mật khẩu của bạn' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{ marginTop: '20px' }}>
                    Đăng Ký
                </Button>
                <div style={{ marginTop: 20 }}>Bạn đã có tài khoản?<span style={{ fontWeight: 500, color: '#5800c3', marginLeft: 10, cursor: 'pointer' }} onClick={()=>navigate('/login')}>Đăng nhập</span> </div>

            </Form.Item>
        </Form>
    </>;
};

export default Register;
