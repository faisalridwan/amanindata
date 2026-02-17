
import GuideClient from './GuideClient'

export const metadata = {
    title: 'Panduan Penggunaan - Tutorial Edit Dokumen | Amanin Data',
    description: 'Cara menggunakan fitur-fitur Amanin Data: Watermark KTP, Tanda Tangan Digital, Hapus Background, hingga Enkripsi File. Tutorial langkah demi langkah.',
    keywords: 'panduan amanin data, tutorial edit pdf, cara watermark ktp, cara tanda tangan digital, bantuan penggunaan',
    alternates: {
        canonical: '/guide',
    },
}

export default function GuidePage() {
    return <GuideClient />
}
