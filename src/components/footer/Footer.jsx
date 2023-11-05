import React from 'react'
import './styles.scss'
import { FacebookFilled, InstagramFilled, TwitterSquareFilled, YoutubeFilled } from '@ant-design/icons'
function Footer() {
    return (
        <div className='footer'>
            <div className='left'>
                <div><span>Địa chỉ: </span>Phòng 702, Tầng 7, Tòa nhà Central Plaza, số 17 Lê Duẩn, phường Bến Nghé, quận 1, Hồ Chí Minh</div>
                <div><span>Điện thoại: </span>1900 234 518 (Ext.9100/ 9102)</div>
                <div><span>Fax: </span>(028) 6263 0379</div>
                <div><span>Email: </span>sale@trasuaLaKoong.com</div>
            </div>
            <div className='right'>
                <div>
                    <FacebookFilled />
                    <TwitterSquareFilled />
                    <InstagramFilled />
                    <YoutubeFilled />
                </div>
            </div>
        </div>
    )
}
export default Footer