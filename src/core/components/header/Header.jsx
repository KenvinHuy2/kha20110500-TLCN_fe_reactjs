import {
  DownOutlined,
  GiftOutlined,
  HistoryOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Dropdown, Space } from 'antd';
import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { storeActions, storeSelectors } from '../../store';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(storeSelectors.selectCurrentUser);
  const products = useSelector(storeSelectors.selectProducts);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    dispatch(storeActions.resetCart());
    dispatch(storeActions.resetCurrentUser());
    return navigate('/');
  };

  const subMenuItem = useMemo(() => {
    return [
      {
        key: '1',
        label: (
          <NavLink to='thong-tin-ca-nhan'>
            <Button size='large' type='text' icon={<UserOutlined />}>
              Thông tin cá nhân
            </Button>
          </NavLink>
        ),
      },
      {
        key: '2',
        label: (
          <NavLink to='lich-su-dat-hang'>
            <Button size='large' type='text' icon={<HistoryOutlined />}>
              Lịch sử đặt hàng
            </Button>
          </NavLink>
        ),
      },
      {
        key: '3',
        label: (
          <NavLink to='khuyen-mai-cua-toi'>
            <Button size='large' type='text' icon={<GiftOutlined />}>
              Khuyến mãi của tôi
            </Button>
          </NavLink>
        ),
      },
      {
        key: '4',
        label: (
          <Button size='large' type='text' icon={<LogoutOutlined />} danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        ),
      },
    ];
  }, []);

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
              <Space size='small'>
                {currentUser ? (
                  <>
                    <NavLink to='/gio-hang'>
                      <Badge
                        count={products && products.length ? products.length : null}
                        color='#0c713d'>
                        <Button size='large' icon={<ShoppingCartOutlined />} className='btn-cart'>
                          Giỏ hàng
                        </Button>
                      </Badge>
                    </NavLink>
                    {currentUser.isAdmin && (
                      <NavLink to='/admin'>
                        <Button size='large' type='dashed' icon={<SettingOutlined />}>
                          Quản lý cửa hàng
                        </Button>
                      </NavLink>
                    )}
                    <Dropdown menu={{ items: subMenuItem }}>
                      <Button
                        type='text'
                        size='large'
                        icon={<DownOutlined />}
                        className='user-menu-btn'>
                        Xin chào, {currentUser.fullName.split(' ').pop()}
                      </Button>
                    </Dropdown>
                  </>
                ) : (
                  <Space>
                    <NavLink to='/dang-ky'>
                      <Button size='large' icon={<PlusOutlined />} className='btn-cart'>
                        Đăng ký tài khoản
                      </Button>
                    </NavLink>
                    <NavLink to='/dang-nhap'>
                      <Button type='text' size='large' icon={<LoginOutlined />}>
                        Đăng nhập
                      </Button>
                    </NavLink>
                  </Space>
                )}
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
