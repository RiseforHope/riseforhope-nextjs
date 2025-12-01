'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DonateButton from './DonateButton';

// 1. DEFINE LOGOS
const MAIN_LOGO = 'https://res.cloudinary.com/dvexnl19a/image/upload/v1764609683/logo-r4h-tree-blue_3x_q47uen.png';
const WHITE_LOGO = 'https://res.cloudinary.com/dvexnl19a/image/upload/v1764609719/loho-r4h-white_3x_sakbjh.png';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isOpen]);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Volunteer', path: '/volunteer' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <>
            <header className={`site-header ${isOpen ? 'active' : ''}`}>
                <Link href="/" className="site-logo">
                    <img
                        src={isOpen ? WHITE_LOGO : MAIN_LOGO}
                        alt="Rise For Hope Logo"
                        style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                    />
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                    <div className="desktop-donate-btn">
                        {/* UPDATED: Wrapped in Link to /donate */}
                        <Link href="/donate" style={{ textDecoration: 'none' }}>
                            <DonateButton label="Donate ❤" />
                        </Link>
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <div className="burger-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </header>

            <nav className={`nav-overlay ${isOpen ? 'active' : ''}`}>
                <ul className="nav-list">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    <li style={{ marginTop: '20px', opacity: 1, transform: 'translateY(0)' }}>
                        {/* UPDATED: Wrapped in Link to /donate (and closes menu on click) */}
                        <Link href="/donate" onClick={toggleMenu} style={{ textDecoration: 'none' }}>
                            <DonateButton className="nav-donate-btn" label="Make a Donation" />
                        </Link>
                    </li>
                </ul>
            </nav>

            <style jsx>{`
        .desktop-donate-btn { display: block; }
        
        @media (max-width: 768px) {
           .desktop-donate-btn { display: none; }
        }
      `}</style>
        </>
    );
}