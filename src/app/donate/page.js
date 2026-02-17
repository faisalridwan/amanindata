
import DonateClient from './DonateClient'

export const metadata = {
    title: 'Dukung Amanin Data - Donasi Pengembangan | Amanin Data',
    description: 'Bantu kami menjaga server tetap hidup dan mengembangkan fitur baru. Dukung proyek open-source Amanin Data melalui donasi sukarela (Saweria/Trakteer).',
    keywords: 'donasi amanin data, dukung pengembangan, saweria, trakteer, open source funding, support us',
    alternates: {
        canonical: '/donate',
    },
}

export default function DonatePage() {
    return <DonateClient />
}
