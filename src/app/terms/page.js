'use client'

import { useState } from 'react'
import { FileText, CheckCircle, AlertTriangle, Scale, Users, Shield } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DonationModal from '@/components/DonationModal'
import styles from './page.module.css'

export default function TermsPage() {
    const [isDonationOpen, setIsDonationOpen] = useState(false)

    return (
        <>
            <Navbar onDonateClick={() => setIsDonationOpen(true)} />

            <main className="container">
                <header className={styles.hero}>
                    <h1><FileText size={32} /> Syarat & Ketentuan</h1>
                    <p>Terakhir diperbarui: 08 Februari 2026</p>
                </header>

                <section className={`neu-card no-hover ${styles.content}`}>
                    <div className={styles.intro}>
                        <p>
                            Selamat datang di AmaninKTP. Dengan mengakses dan menggunakan layanan kami,
                            Anda menyetujui syarat dan ketentuan berikut. Mohon baca dengan seksama sebelum menggunakan aplikasi.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.highlightCard}>
                            <CheckCircle size={32} />
                            <h3>Penggunaan Gratis</h3>
                            <p>Layanan kami 100% gratis tanpa biaya tersembunyi.</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <Shield size={32} />
                            <h3>Privasi Terjaga</h3>
                            <p>Kami tidak menyimpan atau mengakses dokumen Anda.</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <Users size={32} />
                            <h3>Tanggung Jawab Pengguna</h3>
                            <p>Pengguna bertanggung jawab atas penggunaan layanan.</p>
                        </div>
                    </div>

                    <article className={styles.termsText}>
                        <h3>1. Penerimaan Syarat</h3>
                        <p>
                            Dengan mengakses atau menggunakan AmaninKTP, Anda menyatakan bahwa Anda telah membaca, memahami, dan setuju
                            untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak
                            menggunakan layanan kami.
                        </p>

                        <h3>2. Deskripsi Layanan</h3>
                        <p>
                            AmaninKTP menyediakan layanan watermarking dokumen dan pembuatan tanda tangan digital secara gratis.
                            Layanan ini beroperasi sepenuhnya di sisi klien (browser), artinya semua pemrosesan dilakukan di perangkat Anda
                            dan tidak ada data yang dikirim atau disimpan di server kami.
                        </p>

                        <h3>3. Penggunaan yang Dilarang</h3>
                        <p>Anda dilarang menggunakan layanan kami untuk:</p>
                        <ul>
                            <li>Pemalsuan dokumen atau identitas</li>
                            <li>Aktivitas ilegal atau penipuan</li>
                            <li>Melanggar hak kekayaan intelektual pihak lain</li>
                            <li>Menyebarkan konten berbahaya atau virus</li>
                            <li>Mencoba merusak, mengganggu, atau mengeksploitasi sistem kami</li>
                        </ul>

                        <h3>4. Batasan Tanggung Jawab</h3>
                        <p>
                            Layanan kami disediakan "sebagaimana adanya" tanpa jaminan apapun. Kami tidak bertanggung jawab atas
                            kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau
                            ketidakmampuan menggunakan layanan kami.
                        </p>

                        <h3>5. Hak Kekayaan Intelektual</h3>
                        <p>
                            Semua konten, desain, logo, dan kode sumber AmaninKTP dilindungi hak cipta. Anda dilarang menyalin,
                            memodifikasi, atau mendistribusikan materi kami tanpa izin tertulis. Dokumen yang Anda proses tetap
                            menjadi milik Anda sepenuhnya.
                        </p>

                        <h3>6. Perubahan Layanan</h3>
                        <p>
                            Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan kapan saja tanpa pemberitahuan
                            sebelumnya. Kami juga dapat memperbarui Syarat & Ketentuan ini secara berkala.
                        </p>

                        <h3>7. Hukum yang Berlaku</h3>
                        <p>
                            Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
                            Setiap perselisihan yang timbul akan diselesaikan di pengadilan yang berwenang di Indonesia.
                        </p>

                        <h3>8. Kontak</h3>
                        <p>
                            Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami melalui
                            halaman <a href="/contact">Kontak</a> atau email ke legal@qreatip.com.
                        </p>
                    </article>
                </section>
            </main>

            <Footer onDonateClick={() => setIsDonationOpen(true)} />
            <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
        </>
    )
}
