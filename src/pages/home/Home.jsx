import { Button } from 'antd';
import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div id='home' style={{ backgroundImage: `url('assets/images/phuc_long_trang_chu_bg.png')` }}>
        <div className='container home-intro'>
          <img src='/assets/images/phuc_long_trang_chu_1.jpeg' alt='phuc_long_trang_chu_1' />
          <div>
            <h4>TỪ NHỮNG MẦM TRÀ, CHÚNG TÔI TẠO RA NIỀM ĐAM MÊ</h4>
            <p>
              Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng
              cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức,
              La Long liên tục là thương hiệu tiên phong với nhiều ý tưởng sáng tạo đi đầu trong
              ngành trà và cà phê.
            </p>
            <p>
              Chúng tôi tin rằng từng sản phẩm trà và cà phê sẽ càng thêm hảo hạng khi được tạo ra
              từ sự phấn đấu không ngừng cùng niềm đam mê. Và chính kết nối dựa trên niềm tin, sự
              trung thực và tin yêu sẽ góp phần mang đến những nét đẹp trong văn hóa thưởng trà và
              cà phê ngày càng bay cao, vươn xa.
            </p>
            <NavLink to='/thuc-uong'>
              <Button size='large'>Xem thêm</Button>
            </NavLink>
          </div>
        </div>
        <div className='container home-intro'>
          <img src='/assets/images/phuc_long_trang_chu_2.jpeg' alt='phuc_long_trang_chu_2' />
          <div>
            <h4>ĐỘI NGŨ NHÂN VIÊN TRÀN ĐẦY NHIỆT HUYẾT</h4>
            <p>
              Trong suốt quá trình hoạt động và phát triển, đội ngũ quản lý và nhân viên của Phúc
              Long Coffee & Tea, qua bao thế hệ, đã cùng nhau xây dựng, nuôi dưỡng niềm đam mê dành
              cho trà và cà phê với mong muốn được thử thách bản thân trong ngành dịch vụ năng động
              và sáng tạo.
            </p>
            <NavLink to='/thuc-uong'>
              <Button size='large'>Xem thêm</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
