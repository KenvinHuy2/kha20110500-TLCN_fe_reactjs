import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { authService } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import './style.scss'

const ChangePassword = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const onFinish = (values) => {
        authService.changePass(values).then((data) => {
            console.log(data)
            messageApi.open({
                type: 'success',
                content: 'Cập nhật thành công',
            });
        }).catch(err => messageApi.open({
            type: 'error',
            content: err.response.data.message,
        }));
    };
    return (
        <>
            {contextHolder}
            <div className='form-title' style={{ cursor: 'pointer' }}><span style={{ color: 'gray', marginLeft: 10 }} onClick={()=>navigate('/information')}>Thông tin cá nhân </span> / Đổi mật khẩu</div>
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
                    <Input size='large' disabled/>
                </Form.Item>

                <Form.Item
                    name="oldPassword"
                >
                    <Input.Password size='large' placeholder='Nhập mật khẩu cũ của bạn' />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                >
                    <Input.Password size='large' placeholder='Nhập mật khẩu mới của bạn' />
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

export default ChangePassword