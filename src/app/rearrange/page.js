
import RearrangeWrapper from './RearrangeWrapper'

export const metadata = {
    title: 'Atur Ulang Halaman PDF Online - Susun Urutan PDF | Amanin Data',
    description: 'Ubah urutan halaman PDF dengan cara drag-and-drop. Hapus halaman yang tidak diinginkan dan simpan susunan baru sebagai file PDF. Cepat, mudah, dan aman tanpa upload ke server.',
    keywords: 'atur ulang pdf, susun pdf, rearrange pdf, urutkan halaman pdf, hapus halaman pdf, organize pdf, amanin data, privacy first, client-side',
    alternates: {
        canonical: '/rearrange',
    },
}

export default function RearrangePage() {
    return <RearrangeWrapper />
}
