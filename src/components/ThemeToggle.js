'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme()

    // Don't render anything until mounted to avoid hydration mismatch
    if (!mounted) {
        return <div className={styles.toggle} style={{ opacity: 0 }} />
    }

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggle}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            <span className={`${styles.icon} ${theme === 'light' ? styles.show : ''}`}>
                <Sun size={18} />
            </span>
            <span className={`${styles.icon} ${theme === 'dark' ? styles.show : ''}`}>
                <Moon size={18} />
            </span>
        </button>
    )
}
