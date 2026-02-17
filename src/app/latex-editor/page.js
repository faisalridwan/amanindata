
import LatexEditorClient from './LatexEditorClient'

export const metadata = {
    title: 'LaTeX Equation Editor Online - Buat Rumus Matematika | Amanin Data',
    description: 'Tulis dan edit rumus matematika kompleks dengan LaTeX Editor online. Konversi persamaan ke gambar PNG/SVG transparan berkualitas tinggi secara instan.',
    keywords: 'latex editor online, rumus matematika, equation editor, latex to image, math formula generator, amanin data',
    alternates: {
        canonical: '/latex-editor',
    },
}

export default function LatexEditorPage() {
    return <LatexEditorClient />
}
