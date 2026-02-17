
import ContactClient from './ContactClient'

export const metadata = {
    title: 'Hubungi Kami - Kontak Support & Kerjasama | Amanin Data',
    description: 'Punya pertanyaan atau saran untuk Amanin Data? Hubungi tim kami untuk dukungan teknis, laporan bug, atau peluang kerjasama bisnis.',
    keywords: 'kontak amanin data, hubungi kami, support amanin data, email support, kerjasama bisnis',
    alternates: {
        canonical: '/contact',
    },
}

export default function ContactPage() {
    return <ContactClient />
}
