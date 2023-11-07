import React from 'react'
import { Button, Form, Input } from 'antd';

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div className='form-title'>Đăng Nhập</div>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                >
                    <Input size='large' placeholder='Nhập số điện thoại của bạn' />
                </Form.Item>

                <Form.Item
                    name="password"
                >
                    <Input.Password size='large' placeholder='Nhập mật khẩu của bạn' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size='large' style={{ marginTop: '20px' }}>
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default Login