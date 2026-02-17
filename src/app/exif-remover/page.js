
import ExifRemoverClient from './ExifRemoverClient'

export const metadata = {
    title: 'Hapus EXIF Data Foto Online - Metadata Cleaner Aman | Amanin Data',
    description: 'Hapus data tersembunyi (EXIF) dari foto Anda seperti lokasi GPS, jenis kamera, dan tanggal pengambilan. Lindungi privasi Anda sebelum membagikan foto ke media sosial.',
    keywords: 'hapus exif, remove exif data, metadata remover, hapus lokasi foto, privacy photo, amanin data, client-side cleaner',
    alternates: {
        canonical: '/exif-remover',
    },
}

export default function ExifRemoverPage() {
    return <ExifRemoverClient />
}
