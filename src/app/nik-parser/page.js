
import NikParserClient from './NikParserClient'

export const metadata = {
    title: 'Cek NIK KTP Online - Validasi Tanggal Lahir & Asal Wilayah | Amanin Data',
    description: 'Alat parsing NIK KTP untuk mengetahui tanggal lahir, jenis kelamin, dan wilayah asal secara offline. Data NIK Anda tidak dikirim ke server (Aman 100%).',
    keywords: 'cek nik, parse nik ktp, arti nik, cek ktp online, validasi nik, data kependudukan, amanin data, privacy first',
    alternates: {
        canonical: '/nik-parser',
    },
}

export default function NikParserPage() {
    return <NikParserClient />
}
