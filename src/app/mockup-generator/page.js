
import MockupGeneratorClient from './MockupGeneratorClient'

export const metadata = {
    title: 'Mockup Generator Online - iPhone, Laptop, Browser Frame | Amanin Data',
    description: 'Buat mockup produk profesional (iPhone, MacBook, Browser Frame) dari screenshot Anda dalam hitungan detik. Kustomisasi background dan ganti device gratis.',
    keywords: 'mockup generator, iphone mockup, browser frame, screenshot mockup, laptop mockup, product showcase, mockup creator online, amanin data',
    alternates: {
        canonical: '/mockup-generator',
    },
}

export default function MockupGeneratorPage() {
    return <MockupGeneratorClient />
}
