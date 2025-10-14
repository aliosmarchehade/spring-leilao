import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import "./Sidebar.css";

import { Car, Gear, CaretDoubleRight, CaretDoubleLeft, SignOut, SteeringWheel, CarProfile, Palette, Engine, Speedometer } from '@phosphor-icons/react';
import { ListBullets } from '@phosphor-icons/react/dist/ssr';
import { Fuel } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
export default function AppSidebar({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth()
    const location = useLocation();
    const navigateTo = useNavigate()
    const navigate = (path) => {
        navigateTo(`/admin${path}`)
    };

    const isActive = (path) => location.pathname.includes(path);

    const menuItems = [
        { label: collapsed ? '' : `Olá Admin    `, icon: <Speedometer weight='fill' size={collapsed ? 27 : 25} color={isActive('/admin/dashboard') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/dashboard') },
        { label: collapsed ? '' : 'Carros', icon: <CarProfile weight='fill' size={collapsed ? 27 : 25} color={isActive('/admin/cars') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/cars') },
        { label: collapsed ? '' : 'Categoria', icon: <SteeringWheel weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/colors') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/colors') },

    ];
    
    return (
        <div >
            <Sidebar
                showCloseIcon={false}
                visible={true}
                onHide={() => { }}
                className='main-content'
                style={{
                    width: collapsed ? '60px' : '15rem',
                    transition: 'width 0.3s',
                    zIndex: 1,
                    pointerEvents: 'auto',
                }}
            >
                <div className="content-sidebar">
                    <div className="header-sidebar">
                       
                    </div>

                    <div className="overflow-y-auto flex-1 menu-container">
                        <Menu
                            model={menuItems}
                            className="w-full border-none bg-transparent"
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </div>

                  
                </div>
            </Sidebar>
            <div
                className="main-content"
                style={{
                    marginLeft: collapsed ? '60px' : '15rem',
                    transition: 'margin-left 0.3s',
                    width: `auto`,

                }}
            >
                {children}
            </div>
        </div>
    );
}