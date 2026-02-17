
import DiffCheckerClient from './DiffCheckerClient'

export const metadata = {
    title: 'Bandingkan Teks Online - Diff Checker & Compare Text | Amanin Data',
    description: 'Cek perbandingan dua teks (Diff Check) untuk melihat perbedaan kata per kata atau karakter secara detail. Alat bantu penulis & developer untuk revisi dokumen.',
    keywords: 'diff checker, bandingkan teks, compare text online, text difference, cek perbedaan teks, amanin data, developer tools',
    alternates: {
        canonical: '/diff-checker',
    },
}

export default function DiffCheckerPage() {
    return <DiffCheckerClient />
}
