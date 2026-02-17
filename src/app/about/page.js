
import AboutClient from './AboutClient'

export const metadata = {
    title: 'Tentang Kami - Misi Privasi Data Indonesia | Amanin Data',
    description: 'Amanin Data adalah platform keamanan dokumen digital yang dibangun untuk melindungi privasi masyarakat Indonesia. Gratis, aman, dan tanpa server (Client-Side).',
    keywords: 'tentang amanin data, misi privasi data, keamanan dokumen, client side processing, qreatip studio, faisal ridwan',
    alternates: {
        canonical: '/about',
    },
}

export default function AboutPage() {
    return <AboutClient />
}
