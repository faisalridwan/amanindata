
import CaseConverterClient from './CaseConverterClient'

export const metadata = {
    title: 'Case Converter Online - Ubah Huruf Besar Kecil Otomatis | Amanin Data',
    description: 'Tool gratis untuk mengubah format teks menjadi Uppercase, lowercase, Title Case, camelCase, snake_case, dan lainnya. Cepat, mudah, dan privasi terjaga.',
    keywords: 'case converter, ubah huruf besar, huruf kecil online, title case generator, camelcase converter, text tools, amanin data',
    alternates: {
        canonical: '/case-converter',
    },
}

export default function CaseConverterPage() {
    return <CaseConverterClient />
}
