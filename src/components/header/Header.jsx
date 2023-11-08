import React, { useState } from 'react'
import './style.scss'
import Logo from '../../assets/logo.png'
import { Button } from 'antd'
import { LogoutOutlined, MailOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const [isLogin, setIsLogin] = useState(false)
    const navigate =  useNavigate();
    return (
        <div className='header'>
            <div className='logo'>
                <img src={Logo} alt="" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button type='primary' size='large' style={{ display: 'flex', alignItems: 'center' }}>Giỏ hàng<ShoppingCartOutlined style={{ fontSize: '20px' }} /></Button>
                {isLogin ? <>
                    <Button type='default' size='large'><MailOutlined style={{ fontSize: '20px' }} /></Button>
                    <Button type='default' size='large'><UserOutlined style={{ fontSize: '20px' }} /></Button>
                    <Button type='default' size='large' onClick={()=>setIsLogin(false)}><LogoutOutlined style={{ fontSize: '20px' }} /></Button>
                </> : <>
                    <Button type='default' size='large' onClick={()=>navigate('/login')}>Đăng nhập</Button>
                    <Button type='default' size='large' onClick={()=>navigate('/register')}>Đăng ký</Button>
                </>}
            </div>
        </div>
    )
}
