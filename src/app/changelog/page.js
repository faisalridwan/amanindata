
import ChangelogClient from './ChangelogClient'

export const metadata = {
    title: 'Changelog - Riwayat Pembaruan Aplikasi | Amanin Data',
    description: 'Lihat apa yang baru di Amanin Data. Riwayat pembaruan fitur, perbaikan bug, dan peningkatan performa aplikasi dari versi ke versi.',
    keywords: 'changelog amanin data, update terbaru, versi aplikasi, fitur baru, riwayat perubahan',
    alternates: {
        canonical: '/changelog',
    },
}

export default function ChangelogPage() {
    return <ChangelogClient />
}
