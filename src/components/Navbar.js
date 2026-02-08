'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileImage, PenTool, BookOpen, Shield, Info, Heart, Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'Watermark Dokumen', icon: FileImage },
        { href: '/signature', label: 'Tanda Tangan', icon: PenTool },
        { href: '/guide', label: 'Cara Pakai', icon: BookOpen },
        { href: '/privacy', label: 'Privacy', icon: Shield },
        { href: '/about', label: 'About', icon: Info },
    ]

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContent}`}>
                <Link href="/" className={styles.logo}>
                    📄 AmaninKTP
                </Link>

                <button
                    className={styles.menuToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/donate"
                            className={`${styles.navItem} ${styles.navCta}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Heart size={16} />
                            <span>Donasi</span>
                        </Link>
                    </li>
                    <li className={styles.themeToggleItem}>
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
