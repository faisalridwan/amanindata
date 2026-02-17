'use client'

import { useState } from 'react'
import { Library, Package, ExternalLink, Code2, Globe, FileText, Scissors, Image, ScanText, FileDiff, Shield } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function LibrariesPage() {
    const libraries = [
        {
            name: 'Next.js',
            ver: '16.1.6',
            desc: 'Framework React utama untuk performa, routing, dan optimasi SEO.',
            link: 'https://nextjs.org',
            github: 'https://github.com/vercel/next.js',
            icon: Globe
        },
        {
            name: 'React',
            ver: '19.0.0',
            desc: 'Library JavaScript untuk membangun antarmuka pengguna berbasis komponen.',
            link: 'https://react.dev',
            github: 'https://github.com/facebook/react',
            icon: Code2
        },
        {
            name: 'Lucide React',
            ver: '0.563.0',
            desc: 'Koleksi icon open-source yang ringan, konsisten, dan mudah digunakan.',
            link: 'https://lucide.dev',
            github: 'https://github.com/lucide-icons/lucide',
            icon: Package
        },
        {
            name: 'pdf-lib',
            ver: '1.17.1',
            desc: 'Manipulasi PDF yang powerful dengan fitur merge, split, dan modifikasi halaman.',
            link: 'https://pdf-lib.js.org/',
            github: 'https://github.com/Hopding/pdf-lib',
            icon: FileText
        },
        {
            name: 'jsPDF',
            ver: '4.1.0',
            desc: 'Library untuk pembuatan dokumen PDF langsung di sisi klien (browser).',
            link: 'https://artskydj.github.io/jsPDF',
            github: 'https://github.com/parallax/jsPDF',
            icon: Library
        },
        {
            name: 'PDF.js',
            ver: '5.4.624',
            desc: 'Library standar untuk membaca dan merender file PDF di web.',
            link: 'https://mozilla.github.io/pdf.js',
            github: 'https://github.com/mozilla/pdf.js',
            icon: Library
        },
        {
            name: 'browser-image-compression',
            ver: '2.0.2',
            desc: 'Kompresi gambar cerdas di sisi klien dengan tetap menjaga kualitas visual.',
            link: 'https://github.com/Donaldcwl/browser-image-compression',
            github: 'https://github.com/Donaldcwl/browser-image-compression',
            icon: Image
        },
        {
            name: 'background-removal',
            ver: '1.7.0',
            desc: 'Penghapus latar belakang otomatis berbasis AI yang berjalan sepenuhnya di browser.',
            link: 'https://img.ly/showcases/cesdk/background-removal',
            github: 'https://github.com/imgly/background-removal-js',
            icon: Scissors
        },
        {
            name: 'qrcode.react',
            ver: '4.2.0',
            desc: 'Komponen React untuk menghasilkan kode QR yang elegan dan fungsional.',
            link: 'https://zpao.github.io/qrcode.react',
            github: 'https://github.com/zpao/qrcode.react',
            icon: Code2
        }
    ]

    const additionalLibraries = [
        {
            name: 'Tesseract.js',
            ver: '5.0.0',
            desc: 'OCR engine berbasis WebAssembly untuk ekstraksi teks dari gambar di browser.',
            link: 'https://tesseract.projectnaptha.com/',
            github: 'https://github.com/naptha/tesseract.js',
            icon: ScanText
        },
        {
            name: 'diff',
            ver: '5.1.0',
            desc: 'Library javascript untuk perbandingan teks (diffing) yang akurat.',
            link: 'https://github.com/kpdecker/jsdiff',
            github: 'https://github.com/kpdecker/jsdiff',
            icon: FileDiff
        },
        {
            name: 'crypto-js',
            ver: '4.2.0',
            desc: 'Standar algoritma kriptografi (MD5, SHA1, SHA256) untuk hashing data.',
            link: 'https://cryptojs.gitbook.io/docs/',
            github: 'https://github.com/brix/crypto-js',
            icon: Shield
        },
        {
            name: 'html-to-image',
            ver: '1.11.11',
            desc: 'Konversi elemen DOM HTML menjadi gambar (PNG/JPEG) untuk fitur mockup.',
            link: 'https://github.com/bubkoo/html-to-image',
            github: 'https://github.com/bubkoo/html-to-image',
            icon: Image
        },
        {
            name: 'jszip',
            ver: '3.10.1',
            desc: 'Membuat, membaca, dan mengedit file .zip untuk fitur bulk processing.',
            link: 'https://stuk.github.io/jszip/',
            github: 'https://github.com/Stuk/jszip',
            icon: Package
        },
        {
            name: 'heic2any',
            ver: '0.0.4',
            desc: 'Konversi file gambar HEIC/HEIF ke format web standard (JPEG/PNG).',
            link: 'https://alexcorvi.github.io/heic2any/',
            github: 'https://github.com/alexcorvi/heic2any',
            icon: Image
        }
    ]

    const allLibraries = [...libraries, ...additionalLibraries].sort((a, b) => a.name.localeCompare(b.name))

    return (
        <>
            <Navbar />

            <main className="container">
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>📦 Pustaka & <span>Teknologi</span></h1>
                    <p className={styles.heroSubtitle}>
                        Amanin Data dibangun dengan teknologi open-source terbaik.
                    </p>
                </header>

                <div className={styles.grid}>
                    {allLibraries.map((lib, index) => (
                        <div key={index} className={`neu-card no-hover ${styles.card}`}>
                            <div className={styles.cardHeader}>
                                <lib.icon size={28} className={styles.icon} />
                                <div>
                                    <h2>{lib.name}</h2>
                                    <span className={styles.version}>v{lib.ver}</span>
                                </div>
                            </div>
                            <p className={styles.desc}>{lib.desc}</p>
                            <div className={styles.links}>
                                <a href={lib.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    Visit Website <ExternalLink size={14} />
                                </a>
                                <a href={lib.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                                    <Code2 size={14} /> View Source
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    )
}
