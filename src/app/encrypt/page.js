
import EncryptClient from './EncryptClient'

export const metadata = {
    title: 'Enkripsi File Online - Amankan Data Rahasia (AES-GCM) | Amanin Data',
    description: 'Enkripsi dan dekripsi file (PDF, Gambar, Dokumen) secara lokal di browser menggunakan algoritma AES-GCM 256-bit. File Anda aman dan tidak bisa dibuka tanpa password.',
    keywords: 'enkripsi file, file encryptor, aes 256 encryption, amankan file, password protect file, amanin data security',
    alternates: {
        canonical: '/encrypt',
    },
}

export default function EncryptPage() {
    return <EncryptClient />
}
