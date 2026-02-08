'use client'

import { Heart, HelpCircle, Shield, Globe, Zap, Coffee } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function DonatePage() {
    const faqs = [
        {
            q: "Kenapa kamu harus mendukung AmaninKTP?",
            a: "AmaninKTP adalah tool gratis yang dapat digunakan oleh siapa saja. Meskipun begitu pengembangan dan pemeliharaannya tetap memerlukan biaya seperti perpanjang domain, akses internet, servis komputer (walau sangat jarang, tapi tetap diperlukan). Dukungan terhadap AmaninKTP membantu memastikan keberlangsungan dan kualitas pengembangan alat kesayangan kita ini, sehingga manfaatnya dapat terus dinikmati oleh pengguna secara luas."
        },
        {
            q: "Bagaimana donasi akan digunakan untuk mendukung AmaninKTP?",
            a: "Dukungan yang diberikan akan dimanfaatkan untuk berbagai keperluan, sebagai contoh; pengembangan fitur baru, peningkatan keamanan, pengembangan lebih lanjut dari AmaninKTP, termasuk perpanjang domain, dan akses internet."
        },
        {
            q: "Apakah donasi membantu memastikan AmaninKTP tetap gratis untuk digunakan?",
            a: "Ya, kami berkomitmen agar AmaninKTP dapat tersedia secara gratis untuk semua pengguna. Dukungan finansial dari para donatur akan sangat membantu memenuhi biaya operasional dan pengembangan tanpa mengenakan biaya kepada pengguna."
        }
    ]

    return (
        <>
            <Navbar />

            <main className="container">
                <div className={styles.donationPage}>
                    <header className={styles.hero}>
                        <h1 className={styles.heroTitle}>Dukung <span>AmaninKTP</span></h1>
                        <p className={styles.heroSubtitle}>
                            Bantu kami menjaga privasi dokumen masyarakat Indonesia tetap aman, gratis, dan open-source.
                        </p>
                    </header>

                    <div className={styles.card}>
                        <p className={styles.summary}>
                            AmaninKTP adalah proyek independen yang lahir dari kepedulian terhadap keamanan data pribadi.
                            Setiap baris kode ditulis untuk memastikan dokumen identitas Anda tetap menjadi milik Anda sepenuhnya.
                            Dukungan Anda sangat berarti bagi keberlangsungan proyek ini.
                        </p>

                        <div className={styles.donateAction}>
                            <a href="https://amaninktp.qreatip.com/#donate" className={styles.donateBtn}>
                                <Heart size={20} /> Donasi Sekarang
                            </a>
                        </div>
                    </div>

                    <section className={styles.faqSection}>
                        <h2 className={styles.faqTitle}>
                            <HelpCircle size={24} /> Pertanyaan Yang Sering Diajukan
                        </h2>

                        <div className={styles.faqList}>
                            {faqs.map((faq, i) => (
                                <div key={i} className={styles.faqItem}>
                                    <h3>{faq.q}</h3>
                                    <p>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    )
}
