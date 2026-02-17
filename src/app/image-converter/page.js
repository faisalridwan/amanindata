
import ImageConverterClient from './ImageConverterClient'

export const metadata = {
    title: 'Konverter Gambar Online Gratis - HEIC, PNG, JPG, WebP | Amanin Data',
    description: 'Ubah format gambar HEIC ke JPG, PNG ke WebP, dan format lainnya secara instan. Konversi gambar tanpa upload ke server, privasi Anda terjaga 100%.',
    keywords: 'convert image, ubah format gambar, heic to jpg, png to jpg, webp converter, image converter online, amanin data, client-side conversion, gratis',
    alternates: {
        canonical: '/image-converter',
    },
}

export default function ImageConverterPage() {
    return <ImageConverterClient />
}
