import { Tabs } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertService, UsersService } from '../../../../core/services';
import { storeActions } from '../../../../core/store';
import UpdateUser from './update-user/UpdateUser';
import UserOrders from './user-orders/UserOrders';

const UserDetail = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(undefined);
  const dispatch = useDispatch();
  const tabItems = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Chi tiết người dùng',
        children: <UpdateUser user={user} />,
      },
      {
        key: '2',
        label: 'Danh sách đơn hàng đã đặt',
        children: <UserOrders userId={user ? user._id : null} />,
      },
    ];
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(storeActions.showLoading());
        const user = await UsersService.getUserById(userId);
        setUser(user);
      } catch (error) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          setUser(null);
        } else {
          AlertService.error(error?.response?.data?.message || error.message);
        }
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };
    getUser();
  }, []);

  if (!userId) {
    return navigate(-1);
  }

  if (user === null) {
    return <>Không tìm thấy người dùng</>;
  }

  return (
    <>
      <Tabs defaultActiveKey='1' centered items={tabItems} />
    </>
  );
};

export default UserDetail;
