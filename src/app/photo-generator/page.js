
import PhotoGeneratorClient from './PhotoGeneratorClient'

export const metadata = {
    title: 'Buat Pas Foto Otomatis Online - Ganti Background & Ukuran | Amanin Data',
    description: 'Ubah foto biasa menjadi pas foto resmi (2x3, 3x4, 4x6, Visa) secara otomatis. Ganti warna latar belakang (Merah/Biru) dan sesuaikan ukuran dengan mudah. Gratis dan instan.',
    keywords: 'buat pas foto, pas foto online, ganti background foto, ukuran foto 3x4, foto 4x6, visa photo maker, background merah, background biru, amanin data, edit foto online',
    alternates: {
        canonical: '/photo-generator',
    },
}

export default function PhotoGeneratorPage() {
    return <PhotoGeneratorClient />
}
