'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileImage, Shield, CreditCard, Users, FileText, Building, File, Upload, Crop, Type, Palette, Download, Move, RotateCcw, PenTool, Eraser, Lock, Server, Zap, Trash2, Newspaper, Mail, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DonationModal from '@/components/DonationModal'
import styles from './page.module.css'

export default function AboutPage() {
    const [isDonationOpen, setIsDonationOpen] = useState(false)

    const documentTypes = [
        { icon: CreditCard, label: 'KTP', desc: 'Kartu Tanda Penduduk' },
        { icon: CreditCard, label: 'SIM', desc: 'Surat Izin Mengemudi' },
        { icon: Users, label: 'Kartu Keluarga', desc: 'Dokumen keluarga' },
        { icon: FileText, label: 'Paspor', desc: 'Dokumen perjalanan' },
        { icon: Building, label: 'NPWP', desc: 'Nomor Pokok Wajib Pajak' },
        { icon: File, label: 'Dokumen Lain', desc: 'Ijazah, akta, dll' },
    ]

    const watermarkFeatures = [
        { icon: Upload, title: 'Upload Fleksibel', desc: 'Klik, drag & drop, atau paste (Ctrl+V)' },
        { icon: Crop, title: 'Crop Gambar', desc: 'Potong area dengan grid guide' },
        { icon: Type, title: 'Teks Kustom', desc: 'Tulis watermark sesuai kebutuhan' },
        { icon: Palette, title: 'Warna & Style', desc: 'Atur font, warna, dan transparansi' },
        { icon: Move, title: 'Drag & Resize', desc: 'Posisi bebas di mode satu teks' },
        { icon: RotateCcw, title: 'Rotasi', desc: 'Putar watermark -180° hingga 180°' },
        { icon: Download, title: 'Export', desc: 'Download PNG atau PDF' },
        { icon: Shield, title: 'Auto Verifikasi', desc: 'Tambah tanggal otomatis' },
    ]

    const signatureFeatures = [
        { icon: PenTool, title: 'Kanvas Digital', desc: 'Tulis dengan mouse atau jari' },
        { icon: Palette, title: 'Pilihan Warna', desc: '5 warna pena tersedia' },
        { icon: Type, title: 'Ketebalan', desc: 'Atur tipis hingga tebal' },
        { icon: Eraser, title: 'Hapus & Ulang', desc: 'Clear canvas kapan saja' },
    ]

    const securityFeatures = [
        { icon: Lock, title: '100% Client-Side', desc: 'Semua proses di browser Anda' },
        { icon: Server, title: 'Tanpa Upload', desc: 'Data tidak dikirim ke server' },
        { icon: Zap, title: 'Tanpa Login', desc: 'Langsung pakai tanpa akun' },
        { icon: Trash2, title: 'Tidak Disimpan', desc: 'Data hilang saat tab ditutup' },
    ]

    return (
        <>
            <Navbar onDonateClick={() => setIsDonationOpen(true)} />

            <main className="container">
                {/* Hero */}
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>Tentang <span>AmaninKTP</span></h1>
                    <p className={styles.heroSubtitle}>
                        Aplikasi gratis untuk melindungi dokumen identitas dengan watermark. 100% aman, 100% privat.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/" className={styles.ctaBtn}>
                            <Shield size={18} /> Mulai Watermark
                        </Link>
                    </div>
                </header>

                {/* Document Types Section */}
                <section className={styles.docSection}>
                    <h2 className={styles.sectionTitle}>
                        <FileImage size={24} /> Melindungi Berbagai Dokumen Anda
                    </h2>
                    <p className={styles.sectionDesc}>
                        Aman dari penyalahgunaan digital! Watermark KTP membantu melindungi berbagai dokumen penting Anda — dari KTP, SIM, hingga paspor — dengan mudah dan profesional.
                    </p>
                    <div className={styles.docGrid}>
                        {documentTypes.map((doc, i) => (
                            <div key={i} className={`neu-card no-hover ${styles.docCard}`}>
                                <doc.icon size={28} />
                                <h3>{doc.label}</h3>
                                <p>{doc.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Watermark Features */}
                <section className={styles.featureSection}>
                    <h2 className={styles.sectionTitle}>
                        <FileImage size={24} /> Fitur Watermark KTP
                    </h2>
                    <div className={styles.featureGrid}>
                        {watermarkFeatures.map((f, i) => (
                            <div key={i} className={styles.featureCard}>
                                <f.icon size={20} />
                                <div>
                                    <h4>{f.title}</h4>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Signature Features */}
                <section className={styles.featureSection}>
                    <h2 className={styles.sectionTitle}>
                        <PenTool size={24} /> Fitur Tanda Tangan
                    </h2>
                    <div className={styles.featureGrid}>
                        {signatureFeatures.map((f, i) => (
                            <div key={i} className={styles.featureCard}>
                                <f.icon size={20} />
                                <div>
                                    <h4>{f.title}</h4>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className={styles.featureSection}>
                    <h2 className={styles.sectionTitle}>
                        <Shield size={24} /> Keamanan & Privasi
                    </h2>
                    <div className={styles.featureGrid}>
                        {securityFeatures.map((f, i) => (
                            <div key={i} className={styles.featureCard}>
                                <f.icon size={20} />
                                <div>
                                    <h4>{f.title}</h4>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Press / Media Section (Merged) */}
                <section className={`${styles.featureSection} ${styles.pressSection}`}>
                    <h2 className={styles.sectionTitle}>
                        <Newspaper size={24} /> Pers & Media
                    </h2>
                    <p className={styles.sectionDesc}>Informasi untuk jurnalis dan partner media.</p>

                    <div className={styles.pressGrid}>
                        <div className={`neu-card no-hover ${styles.pressCard}`}>
                            <h3>Tentang Kami</h3>
                            <p>AmaninKTP adalah aplikasi web gratis buatan Indonesia yang berjalan 100% di browser pengguna tanpa upload ke server, menjamin privasi data.</p>
                        </div>

                        <div className={`neu-card no-hover ${styles.pressCard}`}>
                            <h3>Statistik</h3>
                            <div className={styles.pressStats}>
                                <span><strong>100%</strong> Client-Side</span>
                                <span><strong>0</strong> Data Disimpan</span>
                                <span><strong>Gratis</strong> Selamanya</span>
                            </div>
                        </div>

                        <div className={`neu-card no-hover ${styles.pressCard}`}>
                            <h3>Media Kit</h3>
                            <p>Download logo dan aset media.</p>
                            <a href="#" className={styles.textLink} onClick={(e) => e.preventDefault()}>Download Media Kit →</a>
                        </div>

                        <div className={`neu-card no-hover ${styles.pressCard}`}>
                            <h3>Kontak Media</h3>
                            <p>Untuk wawancara & pertanyaan:</p>
                            <a href="mailto:press@qreatip.com" className={styles.textLink}>press@qreatip.com →</a>
                        </div>
                    </div>

                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <span className={styles.date}>Februari 2026</span>
                            <h4>Peluncuran AmaninKTP v2.0</h4>
                            <p>Fitur baru: crop, drag & drop, export PDF, desain baru.</p>
                        </div>
                        <div className={styles.timelineItem}>
                            <span className={styles.date}>Januari 2026</span>
                            <h4>Peluncuran AmaninKTP v1.0</h4>
                            <p>Rilis perdana watermark & tanda tangan.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <h2>Siap Melindungi Dokumen Anda?</h2>
                    <p>Gratis, aman, dan mudah digunakan.</p>
                    <div className={styles.ctaButtons}>
                        <Link href="/" className={styles.ctaBtn}>
                            <Shield size={18} /> Watermark KTP
                        </Link>
                        <Link href="/signature" className={styles.ctaBtnAlt}>
                            <PenTool size={18} /> Tanda Tangan
                        </Link>
                    </div>
                </section>
            </main>

            <Footer onDonateClick={() => setIsDonationOpen(true)} />
            <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
        </>
    )
}
