import React from 'react'
import Img from '../../../../assets/story-home-1.jpeg';
import './styles.scss'
 function StoryHome() {
  return (
    <div className='story-home'>
        <img src={Img} alt="" style={{width:'30%'}}/>
        <div style={{width:'30%'}}>
            <h2>TỪ NHỮNG MẦM TRÀ, CHÚNG TÔI TẠO RA NIỀM ĐAM MÊ</h2>
            <div style={{marginBottom:'20px'}}>Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức, Phúc Long liên tục là thương hiệu tiên phong với nhiều ý tưởng sáng tạo đi đầu trong ngành trà và cà phê. </div>
            <div>Chúng tôi tin rằng từng sản phẩm trà và cà phê sẽ càng thêm hảo hạng khi được tạo ra từ sự phấn đấu không ngừng cùng niềm đam mê. Và chính kết nối dựa trên niềm tin, sự trung thực và tin yêu sẽ góp phần mang đến những nét đẹp trong văn hóa thưởng trà và cà phê ngày càng bay cao, vươn xa.</div>
        </div>
    </div>
  )
}
export default StoryHome