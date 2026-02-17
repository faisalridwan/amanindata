
import PdfSecurityClient from './PdfSecurityClient'

export const metadata = {
    title: 'Protect & Unlock PDF Online Gratis | Amanin Data',
    description: 'Kunci PDF dengan password (Enkripsi AES) atau buka kunci PDF (Unlock) secara aman. 100% Client-side tanpa upload file. Lindungi dokumen rahasia Anda.',
    keywords: 'protect pdf, unlock pdf, kunci pdf, buka password pdf, enkripsi pdf, pdf security tool, amanin data, client-side encryption',
    alternates: {
        canonical: '/pdf-security',
    },
}

export default function PdfSecurityPage() {
    return <PdfSecurityClient />
}
