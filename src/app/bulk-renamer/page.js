
import BulkRenamerClient from './BulkRenamerClient'

export const metadata = {
    title: 'Ganti Nama File Massal Online - Rename Banyak File Sekaligus | Amanin Data',
    description: 'Ubah nama ribuan file sekaligus dengan pola tertentu (Prefix, Suffix, Replace Text, Numbering). Rapikan file Anda dengan cepat, mudah, dan gratis tanpa install aplikasi.',
    keywords: 'bulk rename, ganti nama file massal, rename files online, batch rename, file renamer, amanin data, productivity tool, client-side',
    alternates: {
        canonical: '/bulk-renamer',
    },
}

export default function BulkRenamerPage() {
    return <BulkRenamerClient />
}
