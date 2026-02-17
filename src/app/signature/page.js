
import SignatureClient from './SignatureClient'

export const metadata = {
    title: 'Tanda Tangan Digital Online Gratis - e-Sign Aman | Amanin Data',
    description: 'Buat tanda tangan digital (e-Sign) dan tempelkan pada dokumen PDF atau Word secara online. Tanpa registrasi, tanpa upload data ke server. 100% Aman dan Legal.',
    keywords: 'tanda tangan digital, ttd online, e-sign, electronic signature, sign pdf online, tanda tangan pdf, amanin data, client-side signing, gratis',
    alternates: {
        canonical: '/signature',
    },
}

export default function SignaturePage() {
    return <SignatureClient />
}
