import { Poppins } from 'next/font/google'
import '@/styles/globals.css'
import Script from 'next/script'
import ConsentModal from '@/components/ConsentModal'
import JsonLd from '@/components/JsonLd'
import { ThemeProvider } from '@/context/ThemeContext'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
})

export const metadata = {
    title: {
        template: '%s | Amanin Data',
        default: 'Amanin Data - Watermark Dokumen, Tanda Tangan Digital & Edit PDF Aman' // Fallback
    },
    description: 'Platform privasi digital #1 di Indonesia. Edit PDF, Watermark Dokumen, Tanda Tangan Digital, Hapus Background, dan Kompres Foto secara aman. 100% diproses di browser (Client-Side).',
    // Global verification tags remain here
    verification: {
        google: 'google-site-verification-code',
        'google-adsense-account': 'ca-pub-9738454984006701',
    },
    icons: {
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
    },
    // Base URL for relative alternates
    metadataBase: new URL('https://amanindata.qreatip.com'),
}

export default function RootLayout({ children }) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body className={poppins.className}>
                <ThemeProvider>
                    <Script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9738454984006701"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    />
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-YN17XSBEMY"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-YN17XSBEMY');
                        `}
                    </Script>
                    <JsonLd />
                    <ConsentModal />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
