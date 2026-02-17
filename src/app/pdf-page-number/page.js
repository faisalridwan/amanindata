
import PdfPageNumberClient from './PdfPageNumberClient'

export const metadata = {
    title: 'Nomor Halaman PDF Online - Tambah Halaman Otomatis | Amanin Data',
    description: 'Sisipkan nomor halaman pada dokumen PDF Anda dengan posisi dan format yang bisa disesuaikan. Gratis, cepat, dan tanpa watermark. Privasi aman diproses di browser.',
    keywords: 'nomor halaman pdf, page number pdf, tambah halaman pdf, number pdf pages, pdf editor online, amanin data, client-side pdf tool',
    alternates: {
        canonical: '/pdf-page-number',
    },
}

export default function PdfPageNumberPage() {
    return <PdfPageNumberClient />
}
