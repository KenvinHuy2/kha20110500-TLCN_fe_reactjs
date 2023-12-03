import { LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const menus = [
  {
    id: 'trang-chu',
    path: '/',
    label: 'trang chủ',
  },
  {
    id: 'ca-phe',
    path: '/ca-phe',
    label: 'cà phê',
  },
  {
    id: 'tra',
    path: '/tra',
    label: 'trà',
  },
  {
    id: 'thuc-uong',
    path: '/thuc-uong',
    label: 'thức uống',
  },
  {
    id: 'khuyen-mai',
    path: '/khuyen-mai',
    label: 'khuyến mãi',
  },
  {
    id: 've-chung-toi',
    path: '/ve-chung-toi',
    label: 'về chúng tôi',
  },
];

const Header = () => {
  return (
    <>
      <header id='client-header'>
        <div className='container'>
          <div className='header-top'>
            <div className='logo-delivery'>
              <img src='/assets/images/delivery.png' alt='Logo delivery' />
            </div>
            <div className='logo-main'>LOGO</div>
            <div className='actions'>
              <Space size='middle'>
                <NavLink to='/dang-nhap'>
                  <Button type='text' size='large' icon={<LoginOutlined />}>
                    Đăng nhập
                  </Button>
                  <Button size='large' icon={<ShoppingCartOutlined />} className='btn-cart'>
                    Giỏ hàng
                  </Button>
                </NavLink>
              </Space>
            </div>
          </div>
        </div>
        <div className='border-top'>
          <div className='container'>
            <div className='menus'>
              {menus.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className='text-uppercase font-weight-600 menu-item'>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
