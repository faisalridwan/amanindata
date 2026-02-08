'use client'

import { useState } from 'react'
import { Library, Package, ExternalLink, Code2, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function LibrariesPage() {
    const libraries = [
        {
            name: 'Next.js',
            ver: '15.1.6',
            desc: 'Framework React utama untuk performa dan SEO.',
            link: 'https://nextjs.org',
            icon: Globe
        },
        {
            name: 'React',
            ver: '19.0.0',
            desc: 'Library UI untuk membangun antarmuka interaktif.',
            link: 'https://react.dev',
            icon: Code2
        },
        {
            name: 'Lucide React',
            ver: 'Latest',
            desc: 'Koleksi icon open-source yang ringan dan konsisten.',
            link: 'https://lucide.dev',
            icon: Package
        },
        {
            name: 'jsPDF',
            ver: '2.5.2',
            desc: 'Generator PDF client-side untuk fitur export dokumen.',
            link: 'https://artskydj.github.io/jsPDF',
            icon: Library
        }
    ]

    return (
        <>
            <Navbar />

            <main className="container">
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}><Library size={32} /> Perpustakaan</h1>
                    <p className={styles.heroSubtitle}>
                        AmaninKTP dibangun dengan teknologi open-source terbaik.
                    </p>
                </header>

                <div className={styles.grid}>
                    {libraries.map((lib, index) => (
                        <div key={index} className={`neu-card no-hover ${styles.card}`}>
                            <div className={styles.cardHeader}>
                                <lib.icon size={28} className={styles.icon} />
                                <div>
                                    <h2>{lib.name}</h2>
                                    <span className={styles.version}>v{lib.ver}</span>
                                </div>
                            </div>
                            <p className={styles.desc}>{lib.desc}</p>
                            <a href={lib.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                Visit Website <ExternalLink size={14} />
                            </a>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    )
}
