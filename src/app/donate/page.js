'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Heart, HelpCircle, Globe, Zap, Coffee, Banknote, Sparkles, Copy, Check, Info, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

// CRC16-CCITT (Poly: 0x1021, Init: 0xFFFF) implementation as provided by user
function crc16ccitt(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        crc ^= (c << 8) & 0xFFFF;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
            crc = crc & 0xFFFF; // Ensure 16-bit
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

// QRIS Generation logic as provided by user
function generateQRIS(baseString, amount) {
    if (!amount || amount <= 0) return baseString;

    let cleanBase = baseString;
    const crcIndex = baseString.lastIndexOf("6304");
    if (crcIndex !== -1) {
        cleanBase = baseString.substring(0, crcIndex);
    }

    const amountStr = amount.toString();
    const amountLen = amountStr.length.toString().padStart(2, '0');
    const amountTag = `54${amountLen}${amountStr}`;

    let injectedString = cleanBase;

    // Use standard insertion points for QRIS (after tag 53 or before tag 58)
    if (cleanBase.includes("5303360")) {
        injectedString = cleanBase.replace("5303360", "5303360" + amountTag);
    } else if (cleanBase.includes("5802ID")) {
        injectedString = cleanBase.replace("5802ID", amountTag + "5802ID");
    } else {
        injectedString = cleanBase + amountTag;
    }

    const stringToSign = injectedString + "6304";
    const crc = crc16ccitt(stringToSign);
    return stringToSign + crc;
}

const BASE_QRIS = "00020101021126610014COM.GO-JEK.WWW01189360091435688656990210G5688656990303UMI51440014ID.CO.QRIS.WWW0215ID10243341199880303UMI5204581253033605802ID5914qreatip studio6013JAKARTA TIMUR61051311062070703A01630460A8";

export default function DonatePage() {
    const [amount, setAmount] = useState('10000')
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
        return generateQRIS(BASE_QRIS, amount)
    }, [amount])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const svg = document.getElementById('donation-qr');
        if (!svg) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `amaninktp-qris-${amount}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

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
                                <div className={styles.logoIcon}>
                                    <Image src="/images/logos/qris.svg" alt="QRIS" fill />
                                </div>
                                QRIS
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'bank' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('bank')}
                            >
                                <div className={styles.logoIcon}>
                                    <Image src="/images/logos/jago.svg" alt="Bank Jago" fill />
                                </div>
                                Bank Jago
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'intl' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('intl')}
                            >
                                <div className={styles.logoIcon}>
                                    <Image src="/images/logos/paypal.svg" alt="PayPal" fill />
                                </div>
                                PayPal
                            </button>
                        </div>

                        <div className={styles.paymentContent}>
                            <div className={styles.methodGrid}>
                                {activeTab === 'qris' && (
                                    <div className={styles.paymentCard}>
                                        <div className={styles.qrisSection}>
                                            <div style={{ position: 'relative', width: '80px', height: '30px', marginBottom: '10px' }}>
                                                <Image src="/images/logos/qris.svg" alt="QRIS Logo" fill style={{ objectFit: 'contain' }} />
                                            </div>
                                            <h3 className={styles.methodTitle}>QRIS Interaktif</h3>
                                            <p style={{ fontSize: '15px', color: '#64748B', margin: '15px 0' }}>
                                                Scan menggunakan aplikasi pembayaran pilihan Anda.
                                            </p>

                                            <div className={styles.amountInputWrapper}>
                                                <input
                                                    type="text"
                                                    className={styles.amountInput}
                                                    value={formatCurrency(amount)}
                                                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                                                    placeholder="Minimal Rp 1.000"
                                                />
                                            </div>

                                            {amount && parseInt(amount) >= 1000 && (
                                                <div className={styles.qrisContainer}>
                                                    <QRCodeSVG
                                                        id="donation-qr"
                                                        value={qrisValue}
                                                        size={220}
                                                        level="M"
                                                        includeMargin={false}
                                                    />
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                                        <Sparkles size={14} color="#E91E63" />
                                                        <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#E91E63', letterSpacing: '2px', margin: 0 }}>QRIS AKTIF</p>
                                                    </div>
                                                </div>
                                            )}

                                            {parseInt(amount) < 1000 && (
                                                <p style={{ color: '#E91E63', fontSize: '12px', marginTop: '10px' }}>Minimal donasi Rp 1.000</p>
                                            )}

                                            <button
                                                onClick={handleDownload}
                                                disabled={!amount || parseInt(amount) < 1000}
                                                className={styles.copyBtn}
                                                style={{ marginTop: '20px', width: '100%', maxWidth: '220px' }}
                                            >
                                                <Download size={18} /> Simpan Gambar QR
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'bank' && (
                                    <div className={styles.paymentCard}>
                                        <div style={{ position: 'relative', width: '100px', height: '40px', marginBottom: '10px' }}>
                                            <Image src="/images/logos/jago.svg" alt="Bank Jago Logo" fill style={{ objectFit: 'contain' }} />
                                        </div>
                                        <h3 className={styles.methodTitle}>Transfer Bank Jago</h3>
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
                                    </div>
                                )}

                                {activeTab === 'intl' && (
                                    <div className={styles.paymentCard}>
                                        <div style={{ position: 'relative', width: '120px', height: '40px', marginBottom: '10px' }}>
                                            <Image src="/images/logos/paypal.svg" alt="PayPal Logo" fill style={{ objectFit: 'contain' }} />
                                        </div>
                                        <h3 className={styles.methodTitle}>Donasi Internasional</h3>
                                        <div style={{ margin: '30px 0', padding: '20px', background: 'rgba(0,112,186,0.05)', borderRadius: '24px' }}>
                                            <Coffee size={50} color="#0070BA" strokeWidth={1} />
                                            <p style={{ marginTop: '15px', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
                                                Mendukung donasi via PayPal yang aman dan terpercaya.
                                            </p>
                                        </div>
                                        <a href="https://paypal.me/faisalridwan" target="_blank" rel="noopener noreferrer" className={styles.paypalBtn}>
                                            <Heart size={20} /> Dukung via PayPal
                                        </a>
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
                            <HelpCircle size={24} /> FAQ
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
