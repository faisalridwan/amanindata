
import RotateWrapper from './RotateWrapper'

export const metadata = {
    title: 'Putar PDF Online Gratis - Rotasi Halaman PDF Permanen | Amanin Data',
    description: 'Putar orientasi halaman PDF (Portrait/Landscape) secara mudah dan permanen. Simpan hasil rotasi sebagai file PDF baru. Gratis, tanpa watermark, dan aman karena diproses di browser Anda.',
    keywords: 'putar pdf, rotasi pdf, rotate pdf, ubah orientasi pdf, pdf landscape, pdf portrait, amanin data, tanpa upload, client-side',
    alternates: {
        canonical: '/rotate',
    },
}

export default function RotatePage() {
    return <RotateWrapper />
}
