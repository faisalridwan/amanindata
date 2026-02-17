
import IpCheckClient from './IpCheckClient'

export const metadata = {
    title: 'Cek Alamat IP Saya & Info ISP Lengkap | Amanin Data',
    description: 'Lihat alamat IP publik (My IP Address), lokasi geografis, ISP, dan informasi perangkat Anda secara lengkap. Cek data privasi internet Anda dengan mudah.',
    keywords: 'cek ip, my ip address, lokasi ip, info isp, cek provider internet, ip checker, what is my ip, amanin data',
    alternates: {
        canonical: '/ip-check',
    },
}

export default function IpCheckPage() {
    return <IpCheckClient />
}
