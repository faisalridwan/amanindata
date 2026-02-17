
import OcrClient from './OcrClient'

export const metadata = {
    title: 'OCR Online Gratis - Ekstrak Teks dari Gambar (Image to Text) | Amanin Data',
    description: 'Konversi gambar ke teks secara instan dengan teknologi OCR Tesseract. Scan dokumen, struk, atau foto menjadi teks yang bisa diedit. Privasi aman diproses di browser.',
    keywords: 'ocr online, image to text, scan gambar ke teks, ekstrak teks, tesseract js, ocr gratis, text scanner, amanin data',
    alternates: {
        canonical: '/ocr',
    },
}

export default function OcrPage() {
    return <OcrClient />
}
