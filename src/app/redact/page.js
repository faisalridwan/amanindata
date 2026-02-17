
import RedactClient from './RedactClient'

export const metadata = {
    title: 'Sensor PDF & Foto Online - Tutupi Data Pribadi Aman | Amanin Data',
    description: 'Alat sensor dokumen aman untuk menutupi teks, NIK, atau foto pada PDF dan Gambar. Gunakan fitur blackout atau blur untuk melindungi privasi Anda. Data tidak pernah meninggalkan perangkat Anda.',
    keywords: 'sensor pdf, redact pdf, blur pdf, tutupi data pdf, sensor ktp, sensor foto, protect pdf, privacy shielding, amanin data, client-side encryption',
    alternates: {
        canonical: '/redact',
    },
}

export default function RedactPage() {
    return <RedactClient />
}
