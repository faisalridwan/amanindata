
import PdfToWordClient from './PdfToWordClient'

export const metadata = {
    title: 'Konversi PDF ke Word & Word ke PDF Gratis | Amanin Data',
    description: 'Ubah PDF ke Word (.docx) atau Word ke PDF dengan mudah dan aman. 100% Client-side tanpa upload file ke server. Gratis dan Cepat.',
    keywords: 'pdf to word, word to pdf, convert pdf to docx, convert docx to pdf, ubah pdf ke word, konversi dokumen aman, client-side converter, amanin data',
    alternates: {
        canonical: '/pdf-word',
    },
}

export default function PdfToWordPage() {
    return <PdfToWordClient />
}
