import React, { useState } from 'react'
import './style.scss'
import Logo from '../../assets/logo.png'
import { Button, message } from 'antd'
import { LogoutOutlined, MailOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../slices/StoreSlices'

export default function Header() {
    const [messageApi, contextHolder] = message.useMessage();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const listProduct = useSelector(state => state.store.listProduct)
    const [isModal, setIsModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const calculateItemTotal = (item) => item.price * item.number;

    const calculateOverallTotal = () => {
        return listProduct?.reduce((total, item) => total + calculateItemTotal(item), 0);
    };
    return (
        <div className='header'>
            {contextHolder}
            <div className='logo'>
                <img src={Logo} alt="" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className='order'>
                    <Button type='primary' size='large' onClick={() => setIsModal(!isModal)} style={{ display: 'flex', alignItems: 'center' }}>Giỏ hàng<ShoppingCartOutlined style={{ fontSize: '20px' }} /></Button>
                    {isModal && <div className='order-content'>
                        {listProduct.slice().reverse().map(item => <div className='order-item'>
                            <img src={item.image[0]} alt='a' style={{ width: 100, height: 100 }} />
                            <div style={{ width: 200 }}>
                                <div style={{ fontWeight: '600', fontSize: 18, marginBottom: 10 }}>{item.name}</div>
                                <div> <span style={{ fontSize: 18, fontWeight: '500' }}>{item.number}</span> * <span style={{ fontSize: 18, fontWeight: '500' }}>{item.price}</span></div>
                            </div>
                            <div style={{ fontWeight: '600', fontSize: 18, cursor: 'pointer', color: 'red' }} onClick={() => {
                                dispatch(deleteProduct(item.idProduct))
                            }}>X</div>
                        </div>)}
                        <div style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', margin: '20px 0' }}>
                            Tổng tiền: <span style={{ fontSize: 24 }}>{calculateOverallTotal() || '0'}</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Button type='primary' size='large'>Thanh Toán</Button>
                        </div>
                    </div>}

                </div>
                {userInfo ? <>
                    <Button type='default' size='large'><MailOutlined style={{ fontSize: '20px' }} /></Button>
                    <Button type='default' size='large'><UserOutlined style={{ fontSize: '20px' }} onClick={() => navigate('/information')} /></Button>
                    <Button type='default' size='large' onClick={() => {
                        localStorage.removeItem('user')
                        navigate('/')
                        messageApi.open({
                            type: 'success',
                            content: 'Đăng xuất thành công',
                        });
                    }}><LogoutOutlined style={{ fontSize: '20px' }} /></Button>
                </> : <>
                    <Button type='default' size='large' onClick={() => navigate('/login')}>Đăng nhập</Button>
                    <Button type='default' size='large' onClick={() => navigate('/register')}>Đăng ký</Button>
                </>}
            </div>
        </div>
    )
}
