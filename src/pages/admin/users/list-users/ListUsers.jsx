import React, { useEffect, useMemo, useState } from 'react';
import { DynamicTable } from '../../../../core/components';
import { UsersService } from '../../../../core/services';
import { useDispatch } from 'react-redux';
import { storeActions } from '../../../../core/store';
import { Button, Space, Tag } from 'antd';
import moment from 'moment';
import { InfoOutlined } from '@ant-design/icons';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const tableColumns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        render: (value) => value.slice(-7, -1),
        align: 'center',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (value) => <span className='text-lowercase'>{value}</span>,
      },
      {
        title: 'Họ và tên',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (value) => <span className='text-capitalize'>{value}</span>,
      },
      {
        title: 'Điện thoại',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Vai trò',
        dataIndex: 'idAdmin',
        key: 'idAdmin',
        render: (value) => (
          <Tag color={value ? 'processing' : 'warning'}>{value ? 'Admin' : 'Khách hàng'}</Tag>
        ),
        align: 'center',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value) => moment(value).format('DD.MM.YYYY'),
        align: 'center',
      },
      {
        title: 'Tình trạng',
        dataIndex: 'isBlock',
        key: 'isBlock',
        render: (value) => (
          <Tag color={value ? '#f50' : '#87d068'}>{value ? 'Tạm khoá' : 'Đã kích hoạt'}</Tag>
        ),
        align: 'center',
      },
      {
        title: '',
        dataIndex: null,
        key: 'actions',
        render: (_, user) => {
          return (
            <Button type='primary' size='small'>
              Chi tiết
            </Button>
          );
        },
        align: 'center',
      },
    ];
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        dispatch(storeActions.showLoading());
        const users = await UsersService.getAllUsers();
        setUsers(users);
      } catch (error) {
      } finally {
        dispatch(storeActions.hideLoading());
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      <div className='px-4'>
        <DynamicTable
          cols={tableColumns}
          dataSrc={users}
          rowKey='_id'
          hasBorder
          hasFilters
          searchByFields={['email', 'fullName', 'phone']}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default ListUsers;
