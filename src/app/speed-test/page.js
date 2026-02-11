'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Activity, ArrowDown, ArrowUp, Zap, RotateCw, Play, Shield
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function SpeedTestPage() {
    const [isRunning, setIsRunning] = useState(false)
    const [speed, setSpeed] = useState(0)
    const [progress, setProgress] = useState(0)
    const [ping, setPing] = useState(0)
    const [jitter, setJitter] = useState(0)
    const [finalSpeed, setFinalSpeed] = useState(null)
    const [status, setStatus] = useState('Siap')

    // Test file URL (approx 10MB)
    // Using a reliable CDN file. Wikimedia is good but might vary.
    // Let's use a smaller one repeated if needed, or a decent size one.
    // 5MB is safer for mobile data. 
    const TEST_FILE_URL = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg'

    const runTest = async () => {
        setIsRunning(true)
        setSpeed(0)
        setProgress(0)
        setFinalSpeed(null)
        setPing(0)
        setStatus('Mengukur Ping...')

        try {
            // 1. Measure Ping & Jitter
            const pings = []
            for (let i = 0; i < 5; i++) {
                const start = performance.now()
                await fetch(TEST_FILE_URL + '?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' })
                const end = performance.now()
                pings.push(end - start)
            }
            const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length
            const minPing = Math.min(...pings)
            const maxPing = Math.max(...pings)
            const calcJitter = maxPing - minPing

            setPing(Math.round(avgPing))
            setJitter(Math.round(calcJitter))

            // 2. Measure Download Speed
            setStatus('Mengukur Download...')
            const startTime = performance.now()
            let loadedBytes = 0

            // We use XHR to track progress as Fetch doesn't support progress events easily on response body without Streams which are complex to calc exact speed instantly.
            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('GET', TEST_FILE_URL + '?t=' + Date.now())
                xhr.responseType = 'blob'

                let lastTime = startTime
                let lastLoaded = 0

                xhr.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const now = performance.now()
                        const duration = (now - startTime) / 1000 // seconds

                        // Current Speed (Mbps)
                        // bytes * 8 = bits
                        // bits / 1000000 = Mbits
                        const currentMbps = ((event.loaded * 8) / 1000000) / duration

                        setSpeed(currentMbps.toFixed(2))
                        setProgress((event.loaded / event.total) * 100)
                    }
                }

                xhr.onload = () => {
                    loadedBytes = xhr.total || xhr.response.size
                    resolve()
                }

                xhr.onerror = reject
                xhr.send()
            })

            const endTime = performance.now()
            const totalDuration = (endTime - startTime) / 1000
            const avgSpeed = ((loadedBytes * 8) / 1000000) / totalDuration

            setFinalSpeed(avgSpeed.toFixed(2))
            setSpeed(avgSpeed.toFixed(2))
            setProgress(100)
            setStatus('Selesai')

        } catch (error) {
            console.error(error)
            setStatus('Error: Gagal koneksi')
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <>
            <Navbar />
            <main className="container">
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        <Zap size={32} /> Speed <span>Test</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Ukur kecepatan internet (Download Only) dan latensi Anda dengan cepat.
                    </p>
                    <div className={styles.trustBadge}>
                        <Shield size={16} /> 100% Client-Side Test
                    </div>
                </header>

                <div className={styles.workspace}>
                    <div className={styles.card}>
                        <div className={styles.gaugeContainer}>
                            <div
                                className={styles.gaugeCircle}
                                style={{
                                    background: `conic-gradient(var(--primary-dark) ${progress}%, var(--border-color) ${progress}% 100%)`
                                }}
                            />
                            <div className={styles.gaugeInner}>
                                <div className={styles.speedValue}>{speed}</div>
                                <div className={styles.unit}>Mbps</div>
                                <div className={styles.statusText}>{status}</div>
                            </div>
                        </div>

                        <div className={styles.metrics}>
                            <div className={styles.metricCard}>
                                <div className={styles.metricLabel}>PING</div>
                                <div className={styles.metricValue} style={{ color: '#10b981' }}>
                                    {ping > 0 ? ping + ' ms' : '-'}
                                </div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricLabel}>JITTER</div>
                                <div className={styles.metricValue} style={{ color: '#f59e0b' }}>
                                    {jitter > 0 ? jitter + ' ms' : '-'}
                                </div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricLabel}>DOWNLOAD</div>
                                <div className={styles.metricValue} style={{ color: '--primary-dark' }}>
                                    {finalSpeed || speed || '-'} Mbps
                                </div>
                            </div>
                        </div>

                        <button
                            className={styles.startButton}
                            onClick={runTest}
                            disabled={isRunning}
                        >
                            {isRunning ? (
                                <> <RotateCw className="spin" size={20} /> Mengukur... </>
                            ) : (
                                <> <Play size={20} /> Mulai Test </>
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
