import React, { useState } from 'react'
import { Button, Card, Modal, Input } from 'antd';
import './styles.scss'
import { useDispatch } from 'react-redux';

const { Meta } = Card;
const { TextArea } = Input;

export default function CustomCard({ item }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [size, setSize] = useState("small");
    const [number, setNumber] = useState(1);
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleTotal = () => {
        if (size == "small") {
            return item.price * number
        } else if (size == "medium") {
            return (item.price + 5000) * number
        } else if (size == "large") {
            return (item.price + 10000) * number
        }
    }
    return (
        <div>
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img alt="example" src={item?.image[0]} />}
            >
                <Meta title={item.name} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ margin: '15px 0', fontSize: '22px', fontWeight: '600', color: '#0C713D' }}>{item.price} đ</div>
                    <Button onClick={() => showModal()} type='default' size='large'>Đặt hàng</Button>
                </div>
            </Card>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered width={1000}>
                <div className='modal-card'>
                    <div className='modal-thumbnail'>
                        <img alt="example" src={item?.image[0]} />
                    </div>
                    <div className='modal-content'>
                        <h2>{item.name}</h2>
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
                            <Button type='default' size='large' onClick={()=>{

                            }}>Mua hàng</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
