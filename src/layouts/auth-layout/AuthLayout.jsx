import React from 'react'
import Header from '../../components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import TabMenu from '../../components/tab-menu/TabMenu'
import './styles.scss'
import Logo from '../../assets/logo.png'

export default function AuthLayout() {
    return (
        <>
            <Header />
            <TabMenu />
            <div className='auth'>
                <div className='auth-content'>
                    <div className='logo'><img src={Logo} alt="" /></div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
