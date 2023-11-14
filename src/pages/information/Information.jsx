import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { authService } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import './style.scss'

const Information = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const onFinish = (values) => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
        });
    };
    return (
        <>
            {contextHolder}
            <div className='form-title information' style={{ cursor: 'pointer' }}>Thông tin cá nhân /<span style={{ color: 'gray', marginLeft: 10 }} onClick={()=>navigate('/change-password')}>Đổi mật khẩu</span> </div>
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
                    initialValue={userInfo.email}
                >
                    <Input size='large' />
                </Form.Item>

                <Form.Item
                    name="phone"
                >
                    <Input size='large' placeholder='Số điện thoại của bạn' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size='large' style={{ marginTop: '20px' }}>
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default Information