'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WatermarkPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to homepage where watermark editor is now located
        router.replace('/')
    }, [router])

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            color: '#5C6D7E'
        }}>
            <p>Redirecting to Watermark Editor...</p>
        </div>
    )
}
