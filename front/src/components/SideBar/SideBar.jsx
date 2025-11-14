import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import "./Sidebar.css";

import { Car, KeyReturn, Gear, CaretDoubleRight, CaretDoubleLeft, SignOut, SteeringWheel, CarProfile, Palette, Engine, Speedometer, ArrowURightDownIcon } from '@phosphor-icons/react';
import { ListBullets } from '@phosphor-icons/react/dist/ssr';

import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
export default function AppSidebar({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigateTo = useNavigate()
    
    const navigate = (path) => {
        if (path === '/dashboard') {
            navigateTo('/dashboard'); // Vai direto sem /admin
        } else {
            navigateTo(`/admin${path}`); // Adiciona /admin para as outras rotas
        }
    };

    const isActive = (path) => location.pathname.includes(path);

    const menuItems = [
        { label: collapsed ? '' : `Olá Admin    `, icon: <Speedometer weight='fill' size={collapsed ? 27 : 25} color={isActive('/admin/veiculos') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/veiculos') },
        { label: collapsed ? '' : 'Leilão', icon: <CarProfile weight='fill' size={collapsed ? 27 : 25} color={isActive('/admin/carros') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/carros') },
        { label: collapsed ? '' : 'Categoria', icon: <SteeringWheel weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/categoria') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/categoria') },
        { label: collapsed ? '' : 'Voltar', icon: <KeyReturn weight='fill' size={collapsed ? 25 : 25} color={isActive('/dashboard') ? "#155633" : "red"} />, className: 'text-green', command: () => navigate('/dashboard') },

    ];
    
    return (
        <div >
            <Sidebar
                showCloseIcon={false}
                visible={true}
                onHide={() => { }}
                className='main-content'
                modal={false}   
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