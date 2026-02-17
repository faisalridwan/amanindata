
import HashGeneratorClient from './HashGeneratorClient'

export const metadata = {
    title: 'Cek Hash File Online - MD5, SHA1, SHA256 Generator | Amanin Data',
    description: 'Generate checksum (MD5, SHA1, SHA256, SHA512) untuk file atau teks guna memverifikasi integritas data. Proses cepat dan aman di browser Anda.',
    keywords: 'hash generator, cek hash file, md5 check, sha256 generator, checksum calculator, file integrity, amanin data, client-side hashing',
    alternates: {
        canonical: '/hash-generator',
    },
}

export default function HashGeneratorPage() {
    return <HashGeneratorClient />
}
