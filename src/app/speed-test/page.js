
import SpeedTestClient from './SpeedTestClient'

export const metadata = {
    title: 'Speed Test Internet Online Gratis - Cek Kecepatan WiFi Akurat | Amanin Data',
    description: 'Ukur kecepatan internet (Download, Upload, Ping) Anda secara akurat dan real-time. Cek kestabilan koneksi WiFi dan jaringan seluler (4G/5G) dengan teknologi Fast.com-style.',
    keywords: 'speed test, cek kecepatan internet, tes wifi, speedtest online, internet speed, ping test, bandwidth test, amanin data, fast com alternative',
    alternates: {
        canonical: '/speed-test',
    },
}

export default function SpeedTestPage() {
    return <SpeedTestClient />
}
