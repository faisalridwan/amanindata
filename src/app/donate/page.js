'use client'

import { useState, useMemo } from 'react'
import { Heart, HelpCircle, Shield, Globe, Zap, Coffee, CreditCard, Banknote, Sparkles, Copy, Check, Info } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

// Standard CRC16-CCITT for QRIS
function calculateCRC16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export default function DonatePage() {
    const [amount, setAmount] = useState('50000')
    const [activeTab, setActiveTab] = useState('qris')
    const [copied, setCopied] = useState(false)

    const faqs = [
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
            a: "Sangat terjamin. Kami tidak mengelola dana atau menyimpan informasi kartu/rekening Anda secara langsung. Semua transaksi diproses melalui platform donasi pihak ketiga yang terpercaya dan memiliki izin resmi. Keamanan transaksi Anda dilindungi dengan enkripsi standar industri."
        },
        {
            q: "Selain materi, apa lagi yang bisa saya berikan untuk membantu?",
            a: "Dukungan tidak selalu harus berupa uang. Anda bisa membantu kami dengan melaporkan bug, memberikan saran fitur baru, atau menyebarkan informasi tentang AmaninKTP agar lebih banyak orang menyadari pentingnya melindungi privasi dokumen."
        },
        {
            q: "Apakah donatur akan mendapatkan fitur eksklusif atau akun premium?",
            a: "Tidak, kami tidak menerapkan sistem 'Fitur Berbayar'. Seluruh fitur AmaninKTP tersedia secara penuh untuk setiap pengguna. Donasi yang Anda berikan adalah kontribusi murni (support) untuk mendukung keberlangsungan layanan agar tetap tersedia bagi publik secara cuma-cuma."
        },
        {
            q: "Berapa nominal minimal untuk berdonasi?",
            a: "Kami tidak menetapkan batas minimal. Kami percaya bahwa kebaikan tidak diukur dari angkanya, melainkan dari niat untuk membantu. Sekecil apa pun kontribusi Anda, hal tersebut sangat berharga dalam memperpanjang usia operasional AmaninKTP."
        }
    ]

    const formatCurrency = (val) => {
        const num = val.toString().replace(/\D/g, '')
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num || 0)
    }

    const qrisValue = useMemo(() => {
        // Base QRIS Payload (Point of Initiation Method: 12 for Dynamic)
        const base = `00020101021226670014ID.CO.QRIS.WWW01189360052300000000000215ID10200523123450303ID5144`
        const mid = `0014ID.CO.QRIS.WWW0215ID1020052312345520400005303360`
        const amtStr = amount.toString()
        const tagAmount = `54${amtStr.length.toString().padStart(2, '0')}${amtStr}`
        const suffix = `5802ID5910AmaninKTP6007Jakarta6304`

        const fullPayloadWithoutCRC = base + mid + tagAmount + suffix
        const crc = calculateCRC16(fullPayloadWithoutCRC)
        return fullPayloadWithoutCRC + crc
    }, [amount])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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

                        <div className={styles.tabsContainer}>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'qris' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('qris')}
                            >
                                <Zap size={18} /> QRIS
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'bank' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('bank')}
                            >
                                <Banknote size={18} /> Transfer Bank
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'intl' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('intl')}
                            >
                                <Globe size={18} /> Internasional
                            </button>
                        </div>

                        <div className={styles.paymentContent}>
                            <div className={styles.methodGrid}>
                                {activeTab === 'qris' && (
                                    <div className={styles.paymentCard}>
                                        <div className={styles.qrisSection}>
                                            <h3 className={styles.methodTitle}><Zap size={24} color="#E91E63" /> QRIS Interaktif</h3>
                                            <p style={{ fontSize: '15px', color: '#64748B', margin: '15px 0' }}>
                                                Donasi instan via Dana, GoPay, OVO, ShopeePay, atau m-Banking.
                                            </p>

                                            <div className={styles.amountInputWrapper}>
                                                <input
                                                    type="text"
                                                    className={styles.amountInput}
                                                    value={formatCurrency(amount)}
                                                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                                                    placeholder="Contoh: 50.000"
                                                />
                                            </div>

                                            {amount && parseInt(amount) > 0 && (
                                                <div className={styles.qrisContainer}>
                                                    <QRCodeSVG
                                                        value={qrisValue}
                                                        size={220}
                                                        level="H"
                                                        includeMargin={false}
                                                    />
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                                        <Sparkles size={14} color="#E91E63" />
                                                        <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#E91E63', letterSpacing: '2px', margin: 0 }}>QRIS DINAMIS</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'bank' && (
                                    <div className={styles.paymentCard}>
                                        <h3 className={styles.methodTitle}><Banknote size={24} color="#FFD200" /> Transfer Bank Jago</h3>
                                        <div className={styles.bankDetails}>
                                            <div className={styles.bankIcon}>Jago</div>
                                            <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>PT Bank Jago Tbk</p>
                                            <div className={styles.accountNumber}>105003774949</div>
                                            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>A.N. Faisal Ridwan Siregar</p>

                                            <button
                                                className={styles.copyBtn}
                                                onClick={() => handleCopy('105003774949')}
                                            >
                                                {copied ? <><Check size={16} color="#4CAF50" /> Tersalin!</> : <><Copy size={16} /> Salin Nomor Rekening</>}
                                            </button>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic' }}>
                                            Mohon tambahkan pesan "Donasi AmaninKTP" jika memungkinkan.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'intl' && (
                                    <div className={styles.paymentCard}>
                                        <h3 className={styles.methodTitle}><Globe size={24} color="#0070BA" /> Donasi Internasional</h3>
                                        <div style={{ margin: '40px 0', padding: '20px', background: 'rgba(0,112,186,0.05)', borderRadius: '24px' }}>
                                            <Coffee size={60} color="#0070BA" strokeWidth={1} />
                                            <p style={{ marginTop: '20px', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
                                                Mendukung donasi dari luar negeri melalui platform PayPal yang aman dan terpercaya.
                                            </p>
                                        </div>
                                        <a href="https://paypal.me/faisalridwan" target="_blank" rel="noopener noreferrer" className={styles.paypalBtn}>
                                            <Heart size={20} /> Dukung via PayPal
                                        </a>
                                        <p style={{ marginTop: '20px', fontSize: '13px', color: '#64748B' }}>
                                            <Info size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            Konversi mata uang akan dilakukan otomatis oleh PayPal.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div className={styles.comingSoon}>
                                <Sparkles size={16} color="#FFD700" /> Metode pembayaran lainnya segera hadir
                            </div>
                        </div>
                    </div>

                    <section className={styles.thankYouSection}>
                        <h2 className={styles.thankYouTitle}>
                            <Sparkles color="#FFD700" size={32} /> Terima Kasih Atas Kebaikan Anda
                        </h2>
                        <p className={styles.thankYouDesc}>
                            Setiap donasi yang Anda berikan bukan sekadar angka, melainkan bentuk kepercayaan dan semangat bagi kami untuk terus menjaga privasi jutaan masyarakat Indonesia. Dukungan Anda membantu kami membiayai infrastruktur server, pemeliharaan sistem, dan riset fitur keamanan baru.
                            <br /><br />
                            Semoga kebaikan Anda mendapatkan balasan yang berlipat ganda, dilancarkan rezekinya, dan menjadi amal jariyah yang terus mengalir manfaatnya. Terima kasih telah menjadi bagian penting dalam perjalanan menjaga keamanan data pribadi di Indonesia.
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
