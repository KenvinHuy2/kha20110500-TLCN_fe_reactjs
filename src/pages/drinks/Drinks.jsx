import React from 'react'
import './styles.scss'
import CustomCard from '../../components/custom-card/CustomCard'

function Drinks() {
  let item = [
    {
      id: "654f909cb06b852c90b1ccc3",
      name: "Hồng Trà Caramel Dừa Đá Xa",
      image: [
          "https://phuclong.com.vn/uploads/dish/c4692e6548c0af-65000306hngtrcarameldaxay.png",
          "https://phuclong.com.vn/uploads/dish/c4692e6548c0af-65000306hngtrcarameldaxay.png"
      ],
      type: "loai san pham 4",
      price: 100000,
      countInStock: 100,
      description: "chưa có mô tả",
      discount: 0,
      selled: 0,
      createdAt: "2023-11-11T14:33:00.087Z",
      updatedAt: "2023-11-11T14:33:00.087Z",
  },
  ]

  return (

    <div className='drinks'>
      <div className='title'>THỨC UỐNG</div>
      <div className='drinks-container'>
        <CustomCard item={item[0]}/>
        <CustomCard item={item[0]}/>
        <CustomCard item={item[0]}/>
        <CustomCard item={item[0]}/>
        <CustomCard item={item[0]}/>
      </div>
      
    </div>
  )
}

export default Drinks