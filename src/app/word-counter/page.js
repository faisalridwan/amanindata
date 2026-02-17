
import WordCounterClient from './WordCounterClient'

export const metadata = {
    title: 'Word Counter & Character Counter Online Gratis | Amanin Data',
    description: 'Hitung jumlah kata, karakter, kalimat, dan paragraf secara real-time. Alat bantu gratis untuk penulis, pelajar, dan SEO specialist.',
    keywords: 'word counter online, hitung kata, character count, jumlah karakter, online text tool, word density, amanin data',
    alternates: {
        canonical: '/word-counter',
    },
}

export default function WordCounterPage() {
    return <WordCounterClient />
}
