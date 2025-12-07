import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { GiTechnoHeart } from 'react-icons/gi'
import { PiBagFill } from 'react-icons/pi'
import { FaUserAstronaut } from 'react-icons/fa'

const MobileBottomNav = () => {
  const loc = useLocation();
  const items = [
    { to: '/', label: 'Home', icon: <AiOutlineHome /> },
    { to: '/search', label: 'Search', icon: <AiOutlineSearch /> },
    { to: '/my-list', label: 'Wishlist', icon: <GiTechnoHeart /> },
    { to: '/my-order', label: 'Orders', icon: <PiBagFill /> },
    { to: '/my-account', label: 'Account', icon: <FaUserAstronaut /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-t z-100 lg:hidden">
      <ul className="flex items-center justify-between px-2">
        {items.map((it) => {
          const active = loc.pathname === it.to;
          return (
            <li key={it.to} className="flex-1 text-center py-2">
              <Link to={it.to} className={`flex flex-col items-center justify-center text-[12px] ${active ? 'text-red-500' : 'text-gray-700'}`}>
                <div className="text-xl">{it.icon}</div>
                <span className="mt-1 text-[11px]">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default MobileBottomNav
