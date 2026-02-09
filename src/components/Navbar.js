'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileImage, PenTool, BookOpen, Shield, Info, Heart, Menu, X, Minimize2, EyeOff, User, Camera, ChevronDown } from 'lucide-react'
import styles from './Navbar.module.css'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const pathname = usePathname()

    // Main Links (Left)
    const mainLinks = [
        { href: '/', label: 'Watermark', icon: FileImage },
        { href: '/signature', label: 'Tanda Tangan', icon: PenTool },
    ]

    // Product Dropdown Items
    const productItems = [
        { href: '/compress', label: 'Kompres Foto', icon: Minimize2, desc: 'Perkecil ukuran foto tanpa kurangi kualitas.' },
        { href: '/redact', label: 'Sensor Data', icon: EyeOff, desc: 'Sensor & blur data pribadi di dokumen.' },
        { href: '/merge-pdf', label: 'Gabung PDF', icon: FileImage, desc: 'Satukan banyak file PDF jadi satu.' },
        { href: '/nik-parser', label: 'Cek NIK', icon: User, desc: 'Cek informasi daerah & lahir dari NIK.' },
        { href: '/photo-generator', label: 'Pas Foto', icon: Camera, desc: 'Buat pas foto otomatis background merah/biru.' },
    ]

    // Info/Footer Items in Dropdown
    const infoItems = [
        { href: '/guide', label: 'Cara Pakai', icon: BookOpen },
        { href: '/privacy', label: 'Privasi', icon: Shield },
        { href: '/about', label: 'About', icon: Info },
    ]

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContent}`}>
                <Link href="/" className={styles.logo}>
                    📄 Amanin Data
                </Link>

                <button
                    className={styles.menuToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
                    {/* Main Links */}
                    {mainLinks.map((item) => (
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

                    {/* Mega Menu Dropdown */}
                    <li
                        className={styles.dropdownWrapper}
                        onMouseEnter={() => window.innerWidth > 900 && setIsDropdownOpen(true)}
                        onMouseLeave={() => window.innerWidth > 900 && setIsDropdownOpen(false)}
                    >
                        <button
                            className={`${styles.navItem} ${isDropdownOpen ? styles.active : ''}`}
                            onClick={toggleDropdown}
                            style={{ width: '100%', justifyContent: 'flex-start' }} // Mobile adjustment
                        >
                            <span>Produk Lainnya</span>
                            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                            </span>
                        </button>

                        <div className={`${styles.dropdownContainer} ${isDropdownOpen ? styles.show : ''}`}>
                            <div className={styles.dropdownGrid}>
                                {productItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={styles.dropdownItem}
                                        onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}
                                    >
                                        <div className={styles.itemIcon}>
                                            <item.icon size={18} />
                                        </div>
                                        <div className={styles.itemContent}>
                                            <span className={styles.itemTitle}>{item.label}</span>
                                            <span className={styles.itemDesc}>{item.desc}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className={styles.dropdownFooter}>
                                {infoItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={styles.footerLink}
                                        onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}
                                    >
                                        <item.icon size={14} /> {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </li>

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
