'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const menuItems = [
    { name: 'Inicio', path: '/', icon: 'bi-house-door' },
    { name: 'Productos', path: '/products', icon: 'bi-bag' },
    { name: 'Mis compras', path: '/myOrders', icon: 'bi-bag-check' },
    { name: 'Favoritos', path: '/favourite', icon: 'bi-heart' },
  ];

  return (
    <>
      {/* Sidebar vertical para pantallas grandes - dentro del layout flex */}
      <aside className="sidebar-desktop d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-light shadow-sm" style={{ width: '220px', minHeight: '100vh' }}>
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <Link 
                href={item.path} 
                className={`nav-link d-flex align-items-center gap-2 ${pathname === item.path || (item.path.startsWith('/profile') && pathname.startsWith('/profile')) ? 'active' : 'text-dark'}`}
                style={{ borderRadius: '0.5rem', fontWeight: 500 }}
              >
                <i className={`bi ${item.icon} fs-5`}></i>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;