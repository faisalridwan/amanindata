
import TermsClient from './TermsClient'

export const metadata = {
    title: 'Syarat & Ketentuan Penggunaan Layanan | Amanin Data',
    description: 'Baca syarat dan ketentuan penggunaan (Terms of Service) Amanin Data. Pahami hak dan kewajiban Anda saat menggunakan layanan edit dokumen kami.',
    keywords: 'syarat ketentuan, terms of service, aturan penggunaan, hukum digital indonesia, amanin data legal',
    alternates: {
        canonical: '/terms',
    },
}

export default function TermsPage() {
    return <TermsClient />
}
