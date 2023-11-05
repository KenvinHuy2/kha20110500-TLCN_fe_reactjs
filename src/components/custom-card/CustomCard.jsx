import React from 'react'
import { Button, Card } from 'antd';

const { Meta } = Card;
export default function CustomCard() {
    return (
        <div>
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img alt="example" src="https://phuclong.com.vn/uploads/dish/c4692e6548c0af-65000306hngtrcarameldaxay.png" />}
            >
                <Meta title="Hồng Trà Caramel Dừa Đá Xay" />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ margin: '15px 0', fontSize: '22px', fontWeight: '600', color: '#0C713D' }}>70000 đ</div>
                    <Button type='default' size='large'>Đặt hàng</Button>
                </div>
            </Card>
        </div>
    )
}
