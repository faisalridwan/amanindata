
import JsonFormatterClient from './JsonFormatterClient'

export const metadata = {
    title: 'JSON Formatter & Validator Online - Beautify JSON Code | Amanin Data',
    description: 'Format, validasi, dan rapikan kode JSON yang berantakan (minified). Alat bantu developer untuk debugging data JSON dengan mudah dan cepat.',
    keywords: 'json formatter, json validator, beautify json, json parser, developer tools, amanin data',
    alternates: {
        canonical: '/json-formatter',
    },
}

export default function JsonFormatterPage() {
    return <JsonFormatterClient />
}
