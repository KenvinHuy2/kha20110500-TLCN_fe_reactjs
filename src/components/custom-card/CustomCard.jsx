import React, { useState } from 'react'
import { Button, Card, Modal, Input } from 'antd';
import './styles.scss'

const { Meta } = Card;
const { TextArea } = Input;

export default function CustomCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [size, setSize] = useState("small");
    const [number, setNumber] = useState(1);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleTotal = () => {
        if (size == "small") {
            return 35000 * number
        } else if (size == "medium") {
            return 40000 * number
        } else if (size == "large") {
            return 45000 * number
        }
    }
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
                    <Button onClick={() => showModal()} type='default' size='large'>Đặt hàng</Button>
                </div>
            </Card>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered width={1000}>
                <div className='modal-card'>
                    <div className='modal-thumbnail'>
                        <img alt="example" src="https://phuclong.com.vn/uploads/dish/c4692e6548c0af-65000306hngtrcarameldaxay.png" />
                    </div>
                    <div className='modal-content'>
                        <h2>Hồng Trà Caramel Dừa Đá Xay</h2>
                        <div className='modal-item'>
                            <div>Kính cỡ</div>
                            <div>
                                <Button type={size == "small" ? 'primary' : 'default'} style={{ marginRight: 10 }} onClick={() => setSize("small")}>Nhỏ</Button>
                                <Button type={size == "medium" ? 'primary' : 'default'} style={{ marginRight: 10 }} onClick={() => setSize("medium")}>Trung bình</Button>
                                <Button type={size == "large" ? 'primary' : 'default'} onClick={() => setSize("large")}>Lớn</Button>
                            </div>
                        </div>
                        <div className='modal-item'>
                            <div>Số lượng</div>
                            <div>
                                <Button type='default' size='large' onClick={() => {
                                    if (number != 1) {
                                        setNumber(number - 1)
                                    }
                                }}>-</Button>
                                <Button type='default' size='large' disabled>{number}</Button>
                                <Button type='default' size='large' onClick={() => setNumber(number + 1)}>+</Button>
                            </div>
                        </div>
                        <div className='modal-item'>
                            <div>Ghi chú</div>
                            <div>
                                <TextArea rows={3} />
                            </div>
                        </div>
                        <div className='modal-item'>
                            <div>Giá</div>
                            <div style={{ fontSize: '26px', color: "#0C713D", fontWeight: "600" }}>
                                {handleTotal()} đ
                            </div>
                        </div>
                        <div >
                            <Button type='default' size='large' >Mua hàng</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
