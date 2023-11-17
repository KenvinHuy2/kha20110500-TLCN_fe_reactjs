import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { authService } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const onFinish = (values) => {
        authService.signIn(values).then((data) => {
            localStorage.setItem('user', JSON.stringify({ ...data, email: values.email }));
            setTimeout(() => {
                navigate('/')
            }, 1000);
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
        }).catch(err => messageApi.open({
            type: 'error',
            content: err.response?.data.message,
        }));
    };
    return (
        <>
            {contextHolder}
            <div className='form-title'>Đăng Nhập</div>
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

                <Form.Item
                    name="password"
                >
                    <Input.Password size='large' placeholder='Nhập mật khẩu của bạn' />
                </Form.Item>

                <Form.Item>
                    <div style={{ textAlign: 'right', fontWeight: 500, color: '#5800c3', cursor: 'pointer' }} onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</div>
                    <Button type="primary" htmlType="submit" size='large' style={{ marginTop: '20px' }}>
                        Đăng Nhập
                    </Button>
                    <div style={{ marginTop: 20 }}>Bạn chưa có tài khoản?<span style={{ fontWeight: 500, color: '#5800c3', marginLeft: 10, cursor: 'pointer' }} onClick={() => navigate('/register')}>Đăng ký</span> </div>
                </Form.Item>
            </Form>
        </>

    )
}

export default Login