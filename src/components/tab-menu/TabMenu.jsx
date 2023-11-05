import React from 'react'
import './styles.scss'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

 function TabMenu() {
  const navigate = useNavigate()
    const menu = [
        {title:"TRANG CHỦ",path:'/'},
        {title:"TRÀ SỮA",path:'/drinks'},
        {title:"CÀ PHÊ",path:'/drinks'},
        {title:"TRÀ",path:'/drinks'},
        {title:"THỨC UỐNG",path:'/drinks'},
        {title:"VỀ CHÚNG TÔI",path:'/'}
    ]
  return (
    <div className='tab-menu'>
        {menu.map(item=>{
            return <div onClick={()=>{navigate(item.path)}}>
                {item.title}
            </div>
        })}
        <div>
        <SearchOutlined style={{fontSize:'24px'}}/>
        </div>
    </div>
  )
}
export default TabMenu
