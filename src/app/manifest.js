export const dynamic = 'force-static'

export default function manifest() {
    return {
        name: 'Amanin Data - Watermark & TTD Digital',
        short_name: 'Amanin Data',
        description: 'Lindungi dokumen Anda dengan Watermark KTP dan Tanda Tangan Digital online gratis.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3B82F6',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
