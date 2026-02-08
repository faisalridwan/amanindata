'use client'

import { useState } from 'react'
import { BookOpen, AlertTriangle, Lightbulb, MousePointer, Info, Shield, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DonationModal from '@/components/DonationModal'
import styles from './page.module.css'

export default function GuidePage() {
    const [isDonationOpen, setIsDonationOpen] = useState(false)

    // Using an array of objects for steps to ensure control over rendering
    const watermarkSteps = [
        {
            title: 'Buka Aplikasi',
            desc: 'Akses halaman utama Watermark KTP. Tidak perlu login atau mendaftar akun.'
        },
        {
            title: 'Upload Dokumen',
            desc: 'Klik area upload, atau drag & drop file gambar (JPG, PNG) Anda. Anda juga bisa paste langsung (Ctrl+V) jika sudah menscreenshot atau copy gambar.'
        },
        {
            title: 'Crop & Sesuaikan',
            desc: 'Jika gambar kurang pas, gunakan fitur Crop. Tarik sudut grid untuk memotong bagian yang tidak perlu agar fokus pada dokumen.'
        },
        {
            title: 'Pilih Mode Watermark',
            desc: 'Pilih **Menyeluruh** (Grid) untuk keamanan maksimal memenuhi seluruh dokumen, atau **Satu Teks** untuk menaruh watermark di posisi spesifik.'
        },
        {
            title: 'Isi Teks Watermark',
            desc: 'Ketik tujuan penggunaan, misalnya "VERIFIKASI PINJOL". Gunakan tombol **Tambah Verifikasi + Tanggal** untuk otomatis menambahkan tanggal hari ini.'
        },
        {
            title: 'Kustomisasi Tampilan',
            desc: 'Atur ukuran font, rotasi (miring), transparansi, dan warna agar watermark terbaca namun tidak menutupi informasi vital.'
        },
        {
            title: 'Download Aman',
            desc: 'Klik tombol **PNG** (gambar) atau **PDF** (dokumen). Proses selesai! File tersetempel dan siap digunakan.'
        }
    ]

    const signatureSteps = [
        {
            title: 'Masuk ke Tanda Tangan',
            desc: 'Klik menu **Tanda Tangan** di navigasi atas.'
        },
        {
            title: 'Buat Tanda Tangan',
            desc: 'Gunakan mouse, trackpad, atau layar sentuh (HP/Tablet) untuk menggambar tanda tangan Anda di kanvas.'
        },
        {
            title: 'Atur Gaya',
            desc: 'Sesuaikan ketebalan pena dan pilih warna (Hitam, Biru, atau Merah) sesuai kebutuhan dokumen.'
        },
        {
            title: 'Koreksi',
            desc: 'Jika salah, klik **Hapus** untuk membersihkan kanvas dan ulang kembali sampai sempurna.'
        },
        {
            title: 'Simpan',
            desc: 'Klik **Download TTD** untuk menyimpan sebagai format PNG Transparan (tanpa background) yang siap ditempel di dokumen Word/PDF manapun.'
        }
    ]

    return (
        <>
            <Navbar onDonateClick={() => setIsDonationOpen(true)} />

            <main className="container">
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}><BookOpen size={32} /> Cara Pakai</h1>
                    <p className={styles.heroSubtitle}>Panduan lengkap mengamankan dokumen Anda dengan AmaninKTP</p>
                </header>

                <div className={styles.guidesGrid}>
                    {/* Watermark Guide */}
                    <div className={`neu-card no-hover ${styles.guideCard}`}>
                        <div className={styles.cardHeader}>
                            <Shield size={24} className={styles.iconBlue} />
                            <h2>Panduan Watermark KTP</h2>
                        </div>
                        <div className={styles.stepList}>
                            {watermarkSteps.map((step, index) => (
                                <div key={index} className={styles.stepItem}>
                                    <div className={styles.stepNumber}>{index + 1}</div>
                                    <div className={styles.stepContent}>
                                        <h3>{step.title}</h3>
                                        <p>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cardFooter}>
                            <a href="/" className={styles.actionBtn}>Coba Watermark Sekarang</a>
                        </div>
                    </div>

                    {/* Signature Guide */}
                    <div className={`neu-card no-hover ${styles.guideCard}`}>
                        <div className={styles.cardHeader}>
                            <MousePointer size={24} className={styles.iconBlue} />
                            <h2>Panduan Tanda Tangan</h2>
                        </div>
                        <div className={styles.stepList}>
                            {signatureSteps.map((step, index) => (
                                <div key={index} className={styles.stepItem}>
                                    <div className={styles.stepNumber}>{index + 1}</div>
                                    <div className={styles.stepContent}>
                                        <h3>{step.title}</h3>
                                        <p>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cardFooter}>
                            <a href="/signature" className={`${styles.actionBtn} ${styles.btnAlt}`}>Buat Tanda Tangan</a>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <section className={styles.tipsSection}>
                    <h2 className={styles.sectionTitle}><Lightbulb size={24} /> Tips Keamanan Dokumen</h2>
                    <div className={styles.tipsGrid}>
                        <div className={styles.tipCard}>
                            <AlertTriangle size={24} className={styles.iconWarning} />
                            <div>
                                <h3>Jangan Polos</h3>
                                <p>Jangan pernah mengirim foto KTP/SIM "polos" tanpa watermark ke pihak yang tidak dikenal atau via chat sembarangan.</p>
                            </div>
                        </div>
                        <div className={styles.tipCard}>
                            <Info size={24} className={styles.iconInfo} />
                            <div>
                                <h3>Tulis Tujuan Spesifik</h3>
                                <p>Di watermark, tuliskan: "UNTUK VERIFIKASI [NAMA_APLIKASI] SAJA". Ini mempersulit penyalahgunaan untuk aplikasi lain.</p>
                            </div>
                        </div>
                        <div className={styles.tipCard}>
                            <CheckCircle size={24} className={styles.iconSuccess} />
                            <div>
                                <h3>Posisi Strategis</h3>
                                <p>Pastikan watermark menutupi sebagian data penting (tapi tetap terbaca) agar tidak bisa dicrop atau dihapus dengan mudah.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className={styles.faqSection}>
                    <h2 className={styles.sectionTitle}>Pertanyaan Umum (FAQ)</h2>
                    <div className={styles.faqGrid}>
                        <details className={styles.faqItem}>
                            <summary>Apakah data saya disimpan di server?</summary>
                            <p><strong>Tidak sama sekali.</strong> AmaninKTP bekerja 100% di browser Anda (Client-Side). File gambar Anda tidak pernah diupload ke internet. Saat Anda menutup tab, data hilang.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary>Apakah aplikasi ini gratis?</summary>
                            <p><strong>Ya, AmaninKTP 100% gratis</strong> tanpa biaya tersembunyi dan tanpa langganan. Kami berkomitmen untuk tetap menyediakan layanan ini secara gratis bagi semua pengguna.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary>Apakah akan ada iklan di website ini?</summary>
                            <p>Untuk menjaga kelangsungan layanan dan biaya operasional server, <strong>kemungkinan akan ada iklan</strong> yang ditampilkan di website ini ke depannya. Namun, kami akan memastikan iklan tidak mengganggu pengalaman pengguna dan fungsi utama aplikasi tetap berjalan dengan baik.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary>Bagaimana cara mendukung AmaninKTP?</summary>
                            <p>Anda dapat mendukung pengembangan AmaninKTP dengan <strong>berdonasi</strong> melalui tombol "Donasi" di menu. Dukungan Anda membantu kami membiayai server, pengembangan fitur baru, dan menjaga layanan tetap gratis untuk semua orang.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary>Bagaimana cara menghapus watermark?</summary>
                            <p>Tujuan watermark adalah <strong>agar sulit dihapus</strong> demi keamanan. Kami tidak menyediakan fitur penghapus watermark.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary>Apakah bisa di HP / Tablet?</summary>
                            <p>Bisa! AmaninKTP responsif dan ringan, bisa dibuka di browser Android (Chrome) maupun iOS (Safari).</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary>Kemana donasi akan digunakan?</summary>
                            <p>Donasi akan digunakan untuk: <strong>biaya server dan hosting</strong>, pengembangan fitur baru, pemeliharaan dan keamanan website, serta biaya operasional lainnya agar layanan tetap berjalan lancar.</p>
                        </details>
                    </div>
                </section>
            </main>

            <Footer onDonateClick={() => setIsDonationOpen(true)} />
            <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
        </>
    )
}
