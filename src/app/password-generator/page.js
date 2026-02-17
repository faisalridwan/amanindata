
import PasswordGeneratorClient from './PasswordGeneratorClient'

export const metadata = {
    title: 'Password Generator Aman - Buat Kata Sandi Kuat & Acak | Amanin Data',
    description: 'Generatorkan password acak yang super kuat dan sulit ditek. Kustomisasi panjang, angka, simbol, dan huruf. Lindungi akun Anda dari peretasan.',
    keywords: 'password generator, buat password kuat, random password, secure password, keamanan akun, amanin data',
    alternates: {
        canonical: '/password-generator',
    },
}

export default function PasswordGeneratorPage() {
    return <PasswordGeneratorClient />
}
