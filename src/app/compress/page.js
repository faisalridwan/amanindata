
import ImageCompressorClient from './ImageCompressorClient'

export const metadata = {
    title: 'Kompres PDF & Foto Online Gratis - Kecilkan Ukuran File | Amanin Data',
    description: 'Kompres PDF dan Foto (JPG, PNG) secara online dengan cepat dan aman. Perkecil ukuran file dokumen Anda tanpa mengurangi kualitas secara signifikan. Gratis, tanpa watermark, dan 100% diproses di browser (Client-Side) tanpa upload data ke server.',
    keywords: 'kompres pdf, kompres foto, perkecil pdf, compress pdf online, kompres jpg, kompres png, kecilkan ukuran foto, resize image, optimize pdf, amanin data, tanpa upload, client-side, gratis',
    alternates: {
        canonical: '/compress',
    },
}

export default function CompressPage() {
    return <ImageCompressorClient />
}
