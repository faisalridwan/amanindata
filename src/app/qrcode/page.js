
import QrCodeClient from './QrCodeClient'

export const metadata = {
    title: 'QR Code Generator Online Gratis - Kustom Warna & Logo | Amanin Data',
    description: 'Buat QR Code kustom dengan logo, warna, dan frame unik. Mendukung URL, Text, WiFi, dan VCard. Download dalam format PNG/SVG resolusi tinggi.',
    keywords: 'qr code generator, buat qr code, qr code gratis, custom qr code, qr code wifi, amanin data qr',
    alternates: {
        canonical: '/qrcode',
    },
}

export default function QrCodePage() {
    return <QrCodeClient />
}
