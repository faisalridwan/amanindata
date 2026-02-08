'use client'

import { useState } from 'react'
import { Heart, HelpCircle, Shield, Globe, Zap, Coffee, CreditCard, Banknote, Sparkles } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function DonatePage() {
    const [amount, setAmount] = useState('50000')

    const faqs = [
        // ... (same faqs as before)
        {
            q: "Mengapa dukungan Anda sangat berarti bagi AmaninKTP?",
            a: "AmaninKTP hadir sebagai solusi gratis dan terbuka untuk membantu masyarakat melindungi privasi dokumen mereka. Namun, operasional infrastruktur digital seperti perpanjangan nama domain (.com), biaya hosting, koneksi internet untuk development, serta pemeliharaan hardware tetap membutuhkan biaya rutin. Dukungan Anda adalah 'bahan bakar' yang memastikan alat ini tetap hidup, stabil, dan bisa terus dikembangkan untuk manfaat yang lebih luas."
        },
        {
            q: "Ke mana alokasi dana donasi disalurkan?",
            a: "Setiap Rupiah yang Anda berikan dialokasikan secara transparan untuk kebutuhan teknis proyek. Ini mencakup biaya langganan server, pembaruan keamanan sistem, riset fitur baru (seperti peningkatan algoritma watermark), serta memastikan AmaninKTP tetap kompatibel dengan berbagai perangkat dan browser terbaru."
        },
        {
            q: "Apakah AmaninKTP benar-benar akan tetap gratis selamanya?",
            a: "Tentu saja. Komitmen utama kami adalah menyediakan alat privasi yang bisa diakses siapa pun tanpa hambatan biaya (paywall). Donasi dari para pendukung adalah kunci utama yang memungkinkan kami menjaga model 'Gratis untuk Semua' ini tanpa harus mengorbankan privasi pengguna lewat iklan yang intrusif atau penjualan data."
        },
        {
            q: "Apakah proses donasi saya terjamin keamanannya?",
            a: "Sangat terjamin. Kami tidak mengelola dana atau menyimpan informasi kartu/rekening Anda secara langsung. Semua transaksi diproses melalui platform donasi pihak ketiga yang terpercaya dan memiliki izin resmi (seperti Saweria atau platform sejenis). Keamanan transaksi Anda dilindungi dengan enkripsi standar industri."
        },
        {
            q: "Selain materi, apa lagi yang bisa saya berikan untuk membantu?",
            a: "Dukungan tidak selalu harus berupa uang. Anda bisa membantu kami dengan melaporkan bug (masalah teknis), memberikan saran fitur baru, atau yang paling sederhana: menyebarkan informasi tentang AmaninKTP kepada teman dan keluarga agar lebih banyak orang menyadari pentingnya melindungi privasi dokumen."
        },
        {
            q: "Apakah donatur akan mendapatkan fitur eksklusif atau akun premium?",
            a: "Tidak, kami tidak menerapkan sistem 'Fitur Berbayar'. Seluruh fitur AmaninKTP tersedia secara penuh untuk setiap pengguna. Donasi yang Anda berikan adalah kontribusi murni (support) untuk mendukung keberlangsungan layanan agar tetap tersedia bagi publik secara cumacuma."
        },
        {
            q: "Berapa nominal minimal untuk berdonasi?",
            a: "Kami tidak menetapkan batas minimal. Kami percaya bahwa kebaikan tidak diukur dari angkanya, melainkan dari niat untuk membantu. Sekecil apa pun kontribusi Anda, hal tersebut sangat berharga dalam memperpanjang usia operasional AmaninKTP."
        }
    ]

    const formatCurrency = (val) => {
        const num = val.replace(/\D/g, '')
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num || 0)
    }

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
                            Pilih metode dukungan yang paling nyaman bagi Anda:
                        </p>

                        <div className={styles.paymentMethods}>
                            {/* QRIS Section - Interactive */}
                            <div className={styles.paymentCard}>
                                <div className={styles.qrisSection}>
                                    <h3 className={styles.methodTitle}><Zap size={20} color="#E91E63" /> QRIS (All Payments)</h3>
                                    <p style={{ fontSize: '14px', color: '#64748B', margin: '10px 0' }}>
                                        Masukkan nominal dan scan QR untuk donasi instan.
                                    </p>

                                    <div className={styles.amountInputWrapper}>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                className={styles.amountInput}
                                                value={formatCurrency(amount)}
                                                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                                                placeholder="Contoh: 50.000"
                                            />
                                        </div>
                                    </div>

                                    {amount && parseInt(amount) > 0 && (
                                        <div className={styles.qrisContainer}>
                                            <QRCodeSVG
                                                value={`00020101021126670014ID.CO.QRIS.WWW01189360052300000000000215ID10200523000000303ID51440014ID.CO.QRIS.WWW0215ID10200523000000303520400005303360540${amount}5802ID5910AmaninKTP6007Jakarta6304${(Math.random() * 0xffff).toString(16).substr(0, 4).toUpperCase()}`}
                                                size={180}
                                                level="H"
                                                includeMargin={false}
                                            />
                                            <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#E91E63', letterSpacing: '2px' }}>QRIS INTERAKTIF</p>
                                        </div>
                                    )}
                                </div>
                                <p style={{ fontSize: '13px', color: '#64748B' }}>Dukung via Dana, GoPay, OVO, ShopeePay, atau Mobile Banking.</p>
                            </div>

                            <div className={styles.methodGrid}>
                                {/* Bank Transfer Section */}
                                <div className={styles.paymentCard}>
                                    <h3 className={styles.methodTitle}><Banknote size={20} color="#FFD200" /> Bank Transfer</h3>
                                    <div style={{ margin: '10px 0', textAlign: 'center' }}>
                                        <div className={styles.bankIcon}>Jago</div>
                                        <p style={{ fontSize: '14px', fontWeight: '600', margin: '10px 0 5px' }}>PT Bank Jago Tbk</p>
                                        <div className={styles.accountNumber}>105003774949</div>
                                        <p style={{ fontSize: '12px', color: '#64748B', marginTop: '5px' }}>A.N. Faisal Ridwan</p>
                                    </div>
                                </div>

                                {/* PayPal Section */}
                                <div className={styles.paymentCard}>
                                    <h3 className={styles.methodTitle}><Coffee size={20} color="#0070BA" /> Internasional</h3>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                                        <Coffee size={40} color="#0070BA" strokeWidth={1} />
                                    </div>
                                    <a href="https://paypal.me/faisalridwan" target="_blank" rel="noopener noreferrer" className={styles.paypalBtn}>
                                        <Heart size={18} /> Via PayPal
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div className={styles.comingSoon}>
                                <Globe size={16} /> Metode lainnya segera hadir
                            </div>
                        </div>
                    </div>

                    <section className={styles.thankYouSection}>
                        <h2 className={styles.thankYouTitle}>
                            <Sparkles color="#FFD700" size={28} /> Terima Kasih Atas Kebaikan Anda
                        </h2>
                        <p className={styles.thankYouDesc}>
                            Setiap donasi yang Anda berikan bukan sekadar angka, melainkan bentuk kepercayaan dan semangat bagi kami untuk terus menjaga privasi jutaan masyarakat Indonesia. Semoga kebaikan Anda mendapatkan balasan yang berlipat ganda dan menjadi amal jariyah yang terus mengalir. Terima kasih telah menjadi bagian dari perjalanan AmaninKTP.
                        </p>
                    </section>

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
