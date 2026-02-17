
import MergePDFClient from './MergePDFClient'

export const metadata = {
    title: 'Gabung PDF & Gambar Online - Satukan File Jadi PDF | Amanin Data',
    description: 'Gabungkan banyak file PDF dan Gambar (JPG/PNG) menjadi satu dokumen PDF yang rapi secara online. Urutkan halaman dengan mudah, pratinjau hasil, dan download instan. 100% Gratis, Aman, dan Tanpa Batasan Jumlah File.',
    keywords: 'gabung pdf, merge pdf, satukan pdf, combine pdf, jpg to pdf, png to pdf, gambar ke pdf, pdf merger free, amanin data, online pdf tool, tanpa upload, client-side',
    alternates: {
        canonical: '/merge',
    },
}

export default function MergePage() {
    return <MergePDFClient />
}
