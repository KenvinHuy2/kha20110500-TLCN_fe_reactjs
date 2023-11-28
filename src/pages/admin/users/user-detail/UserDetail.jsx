import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import UpdateUser from './update-user/UpdateUser';
import UserOrders from './user-orders/UserOrders';

const UserDetail = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const tabItems = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Chi tiết người dùng',
        children: <UpdateUser />,
      },
      {
        key: '2',
        label: 'Danh sách đơn hàng',
        children: <UserOrders />,
      },
    ];
  }, [user]);

  if (!userId) {
    return navigate(-1);
  }

  return (
    <>
      <Tabs defaultActiveKey='1' centered items={tabItems} />
    </>
  );
};

export default UserDetail;
