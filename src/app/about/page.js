'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DonationModal from '@/components/DonationModal'
import styles from './page.module.css'

export default function AboutPage() {
    const [isDonationOpen, setIsDonationOpen] = useState(false)

    const watermarkFeatures = [
        {
            icon: '📁',
            title: 'Upload Fleksibel',
            description: 'Upload gambar dengan klik, drag & drop, atau paste dari clipboard (Ctrl+V). Mendukung format JPG, PNG, WebP, dan lainnya.'
        },
        {
            icon: '✂️',
            title: 'Crop Gambar',
            description: 'Potong gambar dengan mudah. Tampilan grid membantu komposisi yang sempurna. Resize area crop dengan drag handles.'
        },
        {
            icon: '🔲',
            title: 'Watermark Menyeluruh',
            description: 'Watermark tersebar di seluruh gambar dengan pola diagonal. Sangat sulit dihapus dan melindungi seluruh dokumen.'
        },
        {
            icon: '📍',
            title: 'Watermark Satu Teks',
            description: 'Posisi watermark bebas. Drag untuk pindahkan, tarik sudut untuk resize, tarik atas untuk rotate. Interaksi langsung di canvas.'
        },
        {
            icon: '📅',
            title: 'Auto Tanggal',
            description: 'Tambahkan tanggal secara otomatis ke watermark. Format: "Verifikasi DD/MM/YYYY". Teks dapat diedit sesuai kebutuhan.'
        },
        {
            icon: '🔤',
            title: 'Pilihan Font',
            description: 'Tersedia berbagai font: Arial, Times New Roman, PT Sans, Poppins, dan Georgia. Sesuaikan dengan kebutuhan dokumen.'
        },
        {
            icon: '🎨',
            title: 'Kustomisasi Lengkap',
            description: 'Atur ukuran font (10-100px), rotasi (-180° s/d 180°), transparansi (5-100%), dan warna sesuai keinginan.'
        },
        {
            icon: '💾',
            title: 'Download PNG & PDF',
            description: 'Unduh hasil dalam format PNG (kualitas tinggi) atau PDF (siap cetak). Nama file otomatis berformat profesional.'
        }
    ]

    const signatureFeatures = [
        {
            icon: '✍️',
            title: 'Kanvas Digital',
            description: 'Buat tanda tangan langsung di browser menggunakan mouse atau jari (touchscreen). Hasil halus dan natural.'
        },
        {
            icon: '🎨',
            title: 'Pilihan Warna',
            description: '5 pilihan warna pena: Hitam, Biru, Merah, Hijau, dan Ungu. Sesuaikan dengan kebutuhan dokumen.'
        },
        {
            icon: '📏',
            title: 'Ketebalan Garis',
            description: 'Atur ketebalan garis dari 1px hingga 10px. Buat tanda tangan tebal yang jelas atau tipis yang elegan.'
        },
        {
            icon: '🖼️',
            title: 'Background Transparan',
            description: 'Hasil tanda tangan memiliki background transparan (PNG). Langsung bisa ditempelkan pada dokumen digital.'
        }
    ]

    const securityFeatures = [
        {
            icon: '🔒',
            title: '100% Client-Side',
            description: 'Seluruh proses dilakukan di browser Anda. Tidak ada data yang dikirim ke server kami. Aman dan privat.'
        },
        {
            icon: '🚫',
            title: 'Tanpa Upload',
            description: 'Gambar KTP dan tanda tangan tidak pernah meninggalkan perangkat Anda. Server hanya mengirim kode website.'
        },
        {
            icon: '⚡',
            title: 'Tanpa Login',
            description: 'Tidak perlu mendaftar atau login. Langsung pakai tanpa memberikan email atau data pribadi apapun.'
        },
        {
            icon: '🗑️',
            title: 'Tidak Disimpan',
            description: 'Setelah Anda menutup tab browser, semua data hilang permanen. Tidak ada database yang menyimpan gambar.'
        }
    ]

    return (
        <>
            <Navbar onDonateClick={() => setIsDonationOpen(true)} />

            <main className="container">
                {/* Hero */}
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        Tentang <span>AmaninKTP</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Aplikasi gratis untuk melindungi foto KTP dan membuat tanda tangan digital.
                        100% aman, tanpa upload ke server.
                    </p>
                    <Link href="/" className={styles.ctaBtn}>
                        🛡️ Mulai Watermark Sekarang
                    </Link>
                </header>

                {/* Watermark Features */}
                <section className={styles.featureSection}>
                    <h2 className={styles.sectionTitle}>🖼️ Fitur Watermark KTP</h2>
                    <p className={styles.sectionDesc}>
                        Lindungi foto KTP Anda dengan watermark profesional. Semua fitur didesain untuk kemudahan dan keamanan maksimal.
                    </p>
                    <div className={styles.featureGrid}>
                        {watermarkFeatures.map((feature, index) => (
                            <div key={index} className={`neu-card no-hover ${styles.featureCard}`}>
                                <span className={styles.featureIcon}>{feature.icon}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Signature Features */}
                <section className={styles.featureSection}>
                    <h2 className={styles.sectionTitle}>✍️ Fitur Tanda Tangan Digital</h2>
                    <p className={styles.sectionDesc}>
                        Buat tanda tangan digital profesional untuk dokumen Anda. Mudah, cepat, dan berkualitas tinggi.
                    </p>
                    <div className={styles.featureGrid}>
                        {signatureFeatures.map((feature, index) => (
                            <div key={index} className={`neu-card no-hover ${styles.featureCard}`}>
                                <span className={styles.featureIcon}>{feature.icon}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security Features */}
                <section className={styles.featureSection}>
                    <h2 className={styles.sectionTitle}>🔐 Keamanan & Privasi</h2>
                    <p className={styles.sectionDesc}>
                        Kami mengutamakan keamanan data Anda. Berikut adalah jaminan privasi yang kami berikan.
                    </p>
                    <div className={styles.featureGrid}>
                        {securityFeatures.map((feature, index) => (
                            <div key={index} className={`neu-card no-hover ${styles.featureCard}`}>
                                <span className={styles.featureIcon}>{feature.icon}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className={styles.howSection}>
                    <h2 className={styles.sectionTitle}>📖 Cara Menggunakan</h2>

                    <div className={styles.howGrid}>
                        <div className={`neu-card no-hover ${styles.howCard}`}>
                            <h3>🖼️ Watermark KTP</h3>
                            <ol className={styles.stepList}>
                                <li>Buka halaman utama atau klik "Watermark KTP"</li>
                                <li>Upload gambar dengan klik, drag & drop, atau paste (Ctrl+V)</li>
                                <li>Crop gambar jika diperlukan</li>
                                <li>Pilih jenis watermark: Menyeluruh atau Satu Teks</li>
                                <li>Tulis teks watermark (otomatis terisi tanggal)</li>
                                <li>Atur font, ukuran, rotasi, transparansi, dan warna</li>
                                <li>Untuk mode "Satu Teks": drag untuk pindah, tarik sudut untuk resize</li>
                                <li>Download hasil sebagai PNG atau PDF</li>
                            </ol>
                        </div>

                        <div className={`neu-card no-hover ${styles.howCard}`}>
                            <h3>✍️ Tanda Tangan Online</h3>
                            <ol className={styles.stepList}>
                                <li>Buka halaman "TTD Online" dari menu</li>
                                <li>Pilih warna pena yang diinginkan</li>
                                <li>Atur ketebalan garis dengan slider</li>
                                <li>Gambar tanda tangan Anda di area putih</li>
                                <li>Jika salah, klik "Hapus" untuk mengulang</li>
                                <li>Klik "Download PNG" untuk menyimpan</li>
                                <li>Hasil memiliki background transparan</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* Tips */}
                <section className={`neu-card no-hover ${styles.tipsSection}`}>
                    <h2>💡 Tips Keamanan</h2>
                    <ul className={styles.tipsList}>
                        <li>
                            <strong>Gunakan watermark yang spesifik:</strong> Sertakan nama platform/perusahaan dan tanggal.
                            Contoh: "Hanya untuk verifikasi Shopee, 8 Feb 2026"
                        </li>
                        <li>
                            <strong>Mode Menyeluruh lebih aman:</strong> Watermark tersebar di seluruh gambar,
                            sangat sulit dihapus dengan editing
                        </li>
                        <li>
                            <strong>Transparansi 30-50% optimal:</strong> Cukup terlihat tapi data KTP tetap terbaca jelas
                        </li>
                        <li>
                            <strong>Simpan file asli dengan aman:</strong> Jangan pernah membagikan foto KTP tanpa watermark
                        </li>
                        <li>
                            <strong>Periksa sebelum mengirim:</strong> Pastikan watermark terlihat jelas pada hasil akhir
                        </li>
                    </ul>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <h2>Siap Melindungi KTP Anda?</h2>
                    <p>Gratis, aman, dan mudah digunakan. Mulai sekarang!</p>
                    <div className={styles.ctaButtons}>
                        <Link href="/" className={styles.ctaBtn}>
                            🛡️ Watermark KTP
                        </Link>
                        <Link href="/signature" className={styles.ctaBtnSecondary}>
                            ✍️ Tanda Tangan
                        </Link>
                    </div>
                </section>
            </main>

            <Footer onDonateClick={() => setIsDonationOpen(true)} />
            <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
        </>
    )
}
