
import SplitPDFPageClient from './SplitPDFPageClient'

export const metadata = {
    title: 'Pisahkan Halaman PDF Online - Ekstrak Halaman Gratis | Amanin Data',
    description: 'Pisahkan file PDF menjadi beberapa bagian atau ambil halaman tertentu saja. Pilih rentang halaman yang diinginkan dan simpan sebagai file PDF baru. Cepat, Mudah, dan Aman karena diproses langsung di perangkat Anda (Client-Side).',
    keywords: 'pisah pdf, split pdf, ekstrak halaman pdf, potong pdf, ambil halaman pdf, pdf splitter, amanin data, privacy first, tanpa upload, gratis',
    alternates: {
        canonical: '/split',
    },
}

export default function SplitPage() {
    return <SplitPDFPageClient />
}
