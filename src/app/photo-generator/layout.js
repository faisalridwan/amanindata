
export const metadata = {
    title: 'Photo Generator Online – Ganti Background, Resize, & Atur DPI',
    description: 'Tools lengkap untuk edit pas foto (2x3, 3x4, 4x6), ubah ukuran (px/cm/mm), ganti background (merah/biru), atur DPI (300/press), dan konversi format. 100% Gratis & Aman.',
    keywords: 'photo generator, ganti background foto, pas foto online, ubah ukuran foto, resize foto, atur dpi foto, convert jpg to png, edit foto 4x6, cetak foto, visa photo generator, amanin data',
    alternates: {
        canonical: '/photo-generator',
    },
    openGraph: {
        title: 'Photo Generator Online – Ganti Background & Resize Foto',
        description: 'Edit pas foto, ubah ukuran, ganti background, dan atur DPI langsung di browser. Gratis dan aman tanpa upload.',
        url: 'https://amanindata.qreatip.com/photo-generator',
        type: 'website',
        images: [
            {
                url: '/images/og-photo-generator.jpg',
                width: 1200,
                height: 630,
                alt: 'Photo Generator Preview',
            },
        ],
    }
}

export default function PhotoGenLayout({ children }) {
    return <>{children}</>
}
