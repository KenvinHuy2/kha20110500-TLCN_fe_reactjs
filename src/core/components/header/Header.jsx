import { LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React, { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles.scss';
import { AlertService } from '../../services';

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
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    AlertService.success("Đăng xuất thành công");
  }
  return (
    <>
      <header id='client-header'>
        <div className='container'>
          <div className='header-top'>
            <div className='logo-delivery'>
              <NavLink to='/'>
                <img src='/assets/images/logo.jpeg' alt='Logo' width={64} height={64} />
                <h3 className='page-title'>LaKong - Coffee & Teas</h3>
              </NavLink>
            </div>
            <div className='actions'>
              <Space size='middle'>
                {!user?.email ? <NavLink to='/dang-nhap'>
                  <Button type='text' size='large' icon={<LoginOutlined />}>
                    Đăng nhập
                  </Button>
                </NavLink> :
                  <Button type='text' size='large' icon={<LoginOutlined />} onClick={handleLogout}>
                    Đăng xuất
                  </Button>
                }

                <NavLink to='/gio-hang'>
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
