
import PrivacyClient from './PrivacyClient'

export const metadata = {
    title: 'Kebijakan Privasi - Komitmen Keamanan Data | Amanin Data',
    description: 'Kami serius menjaga privasi Anda. Pelajari bagaimana Amanin Data memproses dokumen secara lokal di browser tanpa pernah menguploadnya ke server.',
    keywords: 'kebijakan privasi, privacy policy, keamanan data, perlindungan data pribadi, gdpr indonesia, amanin data privacy',
    alternates: {
        canonical: '/privacy',
    },
}

export default function PrivacyPage() {
    return <PrivacyClient />
}
