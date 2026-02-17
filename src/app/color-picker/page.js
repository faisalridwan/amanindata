
import ColorPickerClient from './ColorPickerClient'

export const metadata = {
    title: 'Color Picker Online - Ambil Warna dari Gambar & Layar | Amanin Data',
    description: 'Alat pengambil kode warna (HEX, RGB, HSL) dari gambar atau layar Anda. Upload gambar dan klik bagian mana saja untuk mendapatkan detail warnanya. Gratis dan Presisi.',
    keywords: 'color picker, ambil warna gambar, eyedropper online, hex color finder, rgb color picker, image color picker, desain grafis, amanin data',
    alternates: {
        canonical: '/color-picker',
    },
}

export default function ColorPickerPage() {
    return <ColorPickerClient />
}
