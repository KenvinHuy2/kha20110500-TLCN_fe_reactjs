import {
  CopyrightCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import './styles.scss';

const Footer = () => {
  return (
    <>
      <footer id='footer' className='p-4'>
        <div className='row'>
          <div className='col-md-3 col-xd-12'>
            <h6 className='text-uppercase'>địa chỉ</h6>
            <p>
              <strong className='mr-2'>Trụ sợ chính:</strong>Trường Đại Học Sư Phạm Kỹ Thuật Thành
              Phố Hồ Chí Minh
            </p>
            <p>
              <strong className='mr-2'>Nhà máy:</strong>Trường Đại Học Sư Phạm Kỹ Thuật Thành Phố Hồ
              Chí Minh
            </p>
            <p>
              <strong className='mr-2'>Địa chỉ:</strong>1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố
              Thủ Đức, Thành phố Hồ Chí Minh
            </p>
            <p>
              <strong className='mr-2'>SĐT:</strong>
              0123456789
            </p>
          </div>
          <div className='col-md-3 col-xd-12'>
            <h6 className='text-uppercase'>TUYỂN DỤNG</h6>
            <p>HTCH</p>
            <p>Kiosk</p>
            <p>Văn phòng</p>
            <p>Nhà máy</p>
            <h6 className='text-uppercase'>THẺ</h6>
            <p>Điều khoản & Điều kiện thành viên</p>
            <p>Điều khoản & Điều kiện Thẻ trả trước</p>
            <p>FAQ</p>
          </div>
          <div className='col-md-3 col-xd-12'>
            <h6 className='text-uppercase'>CÔNG TY</h6>
            <p>Tầm nhìn</p>
            <p>Sứ mệnh</p>
            <p>Giá trị cốt lõi</p>
            <p>Lĩnh vực hoạt động</p>
            <h6 className='text-uppercase'>KHUYẾN MÃI</h6>
            <p>Tin khuyến mãi</p>
          </div>
          <div className='col-md-3 col-xd-12'>
            <h6 className='text-uppercase'>LIÊN HỆ</h6>
            <p>Hệ thống cửa hàng Phúc Long Coffee & Tea</p>
            <h6 className='text-uppercase'>ĐIỀU KHOẢN SỬ DỤNG</h6>
            <p>Chính sách bảo mật thông tin</p>
            <p>Chính sách đặt hàng</p>
          </div>
        </div>
      </footer>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-between py-3'>
          <div>
            <span>
              <CopyrightCircleOutlined style={{ color: '#0c713d' }} />
            </span>
            <span className='ml-2' style={{ color: '#0c713d' }}>
              Trường Đại Học Sư Phạm Kỹ Thuật Thành Phố Hồ Chí Minh
            </span>
          </div>
          <Space size='middle'>
            <FacebookOutlined style={{ fontSize: 36, color: '#0c713d' }} />
            <InstagramOutlined style={{ fontSize: 36, color: '#0c713d' }} />
            <YoutubeOutlined style={{ fontSize: 36, color: '#0c713d' }} />
          </Space>
        </div>
      </div>
    </>
  );
};

export default Footer;
