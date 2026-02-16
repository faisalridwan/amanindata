'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
    Activity, ArrowDown, ArrowUp, Zap, RotateCw, Play, Shield,
    Globe, Smartphone, Wifi, Server, Info
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrustSection from '@/components/TrustSection'
import GuideSection from '@/components/GuideSection'
import styles from './page.module.css'

export default function SpeedTestPage() {
    const [isRunning, setIsRunning] = useState(false)
    const [currentPhase, setCurrentPhase] = useState('idle') // idle, ping, download, upload, complete

    // Metrics
    const [downloadSpeed, setDownloadSpeed] = useState(0)
    const [uploadSpeed, setUploadSpeed] = useState(0)
    const [ping, setPing] = useState(0)
    const [jitter, setJitter] = useState(0)
    const [progress, setProgress] = useState(0)
    
    // UI states
    const [gaugeValue, setGaugeValue] = useState(0)
    const [ipInfo, setIpInfo] = useState(null)
    const [location, setLocation] = useState(null)
    const [isp, setIsp] = useState(null)

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setIpInfo(data.ip)
                setLocation(`${data.city}, ${data.region}`)
                setIsp(data.org)
            })
            .catch(err => console.error('Failed to fetch IP info', err))
    }, [])

    const runTest = async () => {
        setIsRunning(true)
        setCurrentPhase('ping')
        setDownloadSpeed(0)
        setUploadSpeed(0)
        setPing(0)
        setJitter(0)
        setProgress(0)
        setGaugeValue(0)

        try {
            await measureLatency()
            setCurrentPhase('download')
            await measureDownload()
            setCurrentPhase('upload')
            await measureUpload()
            setCurrentPhase('complete')
            setGaugeValue(0)
        } catch (error) {
            console.error(error)
        } finally {
            setIsRunning(false)
        }
    }

    const measureLatency = async () => {
        const pings = []
        const endpoint = '/favicon.ico'

        for (let i = 0; i < 15; i++) {
            const start = performance.now()
            try {
                await fetch(`${endpoint}?t=${Date.now()}`, { method: 'HEAD', cache: 'no-store' })
                const end = performance.now()
                pings.push(end - start)
            } catch (e) { }
            await new Promise(r => setTimeout(r, 60))
        }

        if (pings.length > 0) {
            const avg = pings.reduce((a, b) => a + b, 0) / pings.length
            const jitterVal = pings.reduce((acc, curr) => acc + Math.abs(curr - avg), 0) / pings.length
            setPing(Math.round(Math.min(...pings)))
            setJitter(Math.round(jitterVal))
        }
    }

    // Fast.com discovery helpers
    const fetchFastUrls = async () => {
        try {
            // 1. Get token from Fast.com app JS via AllOrigins proxy
            const proxy = 'https://api.allorigins.win/get?url='
            const appUrl = encodeURIComponent('https://fast.com/app-a.js')
            const appRes = await fetch(`${proxy}${appUrl}`)
            const appData = await appRes.json()
            const tokenMatch = appData.contents.match(/token:"([^"]+)"/)
            
            if (!tokenMatch) throw new Error('Token not found')
            const token = tokenMatch[1]

            // 2. Get server targets
            const authUrl = encodeURIComponent(`https://api.fast.com/netflix/speedtest/v2?https=true&token=${token}&urlCount=5`)
            const authRes = await fetch(`${proxy}${authUrl}`)
            const authData = await authRes.json()
            const targets = JSON.parse(authData.contents).targets
            
            return targets.map(t => t.url)
        } catch (e) {
            console.error('Fast.com discovery failed, using fallback', e)
            return [
                'https://upload.wikimedia.org/wikipedia/commons/3/3a/A_vivid_sunset_on_the_Pacific_Ocean._(5_MB).jpg',
                'https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Earth_at_Night_-_View_from_Space_Panorama.jpg'
            ]
        }
    }

    const measureDownload = async () => {
        const totalDuration = 15000 // Fast.com style longer test for stability
        const startTime = performance.now()
        let snapshots = []
        let activeStreams = new Map()
        let cumulativeBytes = 0

        const resources = await fetchFastUrls()

        return new Promise((resolve) => {
            let running = true
            const maxParallel = 4

            const updateSpeed = () => {
                if (!running) return
                const now = performance.now()
                const elapsed = (now - startTime) / 1000

                let currentActive = 0
                activeStreams.forEach(bytes => currentActive += bytes)
                const totalLoaded = cumulativeBytes + currentActive

                snapshots.push({ time: now, bytes: totalLoaded })
                const windowSize = 1000 
                snapshots = snapshots.filter(s => now - s.time <= windowSize)

                if (snapshots.length > 1) {
                    const first = snapshots[0]
                    const last = snapshots[snapshots.length - 1]
                    const timeDiff = (last.time - first.time) / 1000
                    const byteDiff = last.bytes - first.bytes
                    
                    if (timeDiff > 100 / 1000) { // at least 100ms diff
                        const mbps = (byteDiff * 8 / 1000000) / timeDiff
                        setDownloadSpeed(parseFloat(mbps.toFixed(1)))
                        setGaugeValue(mbps)
                    }
                }
                
                setProgress(Math.min((elapsed / 15) * 100, 100))
                if (elapsed >= 15) {
                    running = false
                    resolve()
                } else {
                    setTimeout(updateSpeed, 100)
                }
            }

            const startRequest = (id) => {
                if (!running) return
                const xhr = new XMLHttpRequest()
                const url = resources[Math.floor(Math.random() * resources.length)]
                
                xhr.open('GET', `${url}&t=${Date.now()}`, true)
                xhr.responseType = 'blob'
                xhr.onprogress = (event) => {
                    if (running) activeStreams.set(id, event.loaded)
                }
                xhr.onload = () => {
                    if (running) {
                        cumulativeBytes += activeStreams.get(id) || 0
                        activeStreams.set(id, 0)
                        startRequest(id)
                    }
                }
                xhr.onerror = () => {
                    if (running) {
                        activeStreams.set(id, 0)
                        startRequest(id)
                    }
                }
                xhr.send()
            }

            updateSpeed()
            for (let i = 0; i < maxParallel; i++) {
                startRequest(i)
            }
        })
    }

    const measureUpload = async () => {
        const totalDuration = 10000
        const startTime = performance.now()
        let snapshots = []
        let cumulativeUploaded = 0
        let activeUploads = new Map()

        return new Promise((resolve) => {
            let running = true

            const updateSpeed = () => {
                if (!running) return
                const now = performance.now()
                const elapsed = (now - startTime) / 1000

                let currentActive = 0
                activeUploads.forEach(bytes => currentActive += bytes)
                const totalTotal = cumulativeUploaded + currentActive

                snapshots.push({ time: now, bytes: totalTotal })
                snapshots = snapshots.filter(s => now - s.time <= 1000)

                if (snapshots.length > 1) {
                    const first = snapshots[0]
                    const last = snapshots[snapshots.length - 1]
                    const timeDiff = (last.time - first.time) / 1000
                    const byteDiff = last.bytes - first.bytes
                    
                    if (timeDiff > 0) {
                        const mbps = (byteDiff * 8 / 1000000) / timeDiff
                        setUploadSpeed(parseFloat(mbps.toFixed(1)))
                        setGaugeValue(mbps)
                    }
                }

                setProgress(Math.min((elapsed / 10) * 100, 100))
                if (elapsed >= 10) {
                    running = false
                    resolve()
                } else {
                    setTimeout(updateSpeed, 100)
                }
            }

            const sendData = (id) => {
                if (!running) return
                const size = 1024 * 1024 // 1MB chunks
                const blob = new Blob([new Uint8Array(size).map(() => Math.floor(Math.random() * 255))])
                const xhr = new XMLHttpRequest()
                
                xhr.open('POST', `https://speed.cloudflare.com/__up?t=${Date.now()}`, true)
                xhr.upload.onprogress = (event) => {
                    if (running) activeUploads.set(id, event.loaded)
                }
                xhr.onload = () => {
                    if (running) {
                        cumulativeUploaded += size
                        activeUploads.set(id, 0)
                        sendData(id)
                    }
                }
                xhr.onerror = () => {
                    if (running) {
                        activeUploads.set(id, 0)
                        sendData(id)
                    }
                }
                xhr.send(blob)
            }

            updateSpeed()
            for (let i = 0; i < 2; i++) {
                sendData(i)
            }
        })
    }

    const getGaugeRotation = () => {
        let angle = 0
        if (gaugeValue <= 10) {
            angle = (gaugeValue / 10) * 60 
        } else if (gaugeValue <= 100) {
            angle = 60 + ((gaugeValue - 10) / 90) * 120 
        } else if (gaugeValue > 100) {
            angle = 180 + Math.min(((gaugeValue - 100) / 900) * 60, 60) 
        }
        return angle - 120 
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
                        Ukur kecepatan internet Anda secara akurat dengan teknologi Fast.com-style measurement.
                    </p>
                    <div className={styles.trustBadge}>
                        <Shield size={16} /> Secure Client-Side Measurement
                    </div>
                </header>

                <div className={styles.workspace}>
                    <div className={styles.card}>
                        
                        <div className={styles.gaugeWrapper}>
                            <svg className={styles.gaugeSvg} viewBox="0 0 200 150">
                                <path 
                                    className={styles.gaugePath} 
                                    d="M 40 130 A 70 70 0 1 1 160 130" 
                                />
                                <path 
                                    className={styles.gaugeProgress}
                                    d="M 40 130 A 70 70 0 1 1 160 130"
                                    style={{ 
                                        strokeDashoffset: 283 - ((getGaugeRotation() + 120) / 240) * 283,
                                        stroke: currentPhase === 'download' ? '#10B981' : currentPhase === 'upload' ? '#8B5CF6' : '#3b82f6'
                                    }}
                                />
                                <path 
                                    className={`${styles.gaugeProgress} ${styles.gaugeGlow}`}
                                    d="M 40 130 A 70 70 0 1 1 160 130"
                                    style={{ 
                                        strokeDashoffset: 283 - ((getGaugeRotation() + 120) / 240) * 283,
                                        stroke: currentPhase === 'download' ? '#10B981' : currentPhase === 'upload' ? '#8B5CF6' : '#3b82f6'
                                    }}
                                />
                                <g transform={`rotate(${getGaugeRotation()} 100 100)`}>
                                    <path 
                                        className={styles.gaugeNeedle}
                                        d="M 98 100 L 100 30 L 102 100 Z" 
                                        style={{ fill: currentPhase === 'download' ? '#10B981' : currentPhase === 'upload' ? '#8B5CF6' : '#3b82f6' }}
                                    />
                                    <circle cx="100" cy="100" r="5" fill="#1e293b" />
                                </g>
                                
                                <text x="40" y="145" fontSize="8" fill="#94a3b8" textAnchor="middle">0</text>
                                <text x="70" y="55" fontSize="8" fill="#94a3b8" textAnchor="middle">10</text>
                                <text x="130" y="55" fontSize="8" fill="#94a3b8" textAnchor="middle">100</text>
                                <text x="160" y="145" fontSize="8" fill="#94a3b8" textAnchor="middle">1k</text>
                            </svg>

                            <div className={styles.gaugeInfo}>
                                <div className={styles.speedValue}>
                                    {currentPhase === 'idle' ? '0.0' : gaugeValue.toFixed(1)}
                                </div>
                                <div className={styles.unit}>Mbps</div>
                                <div className={styles.statusText}>
                                    {currentPhase === 'idle' && 'Ready'}
                                    {currentPhase === 'ping' && 'Latency'}
                                    {currentPhase === 'download' && 'Download'}
                                    {currentPhase === 'upload' && 'Upload'}
                                    {currentPhase === 'complete' && 'Selesai'}
                                </div>
                            </div>
                        </div>

                        <div className={styles.metrics}>
                            <div className={`${styles.metricCard} ${currentPhase === 'ping' ? styles.metricCardActive : ''}`}>
                                <div className={styles.metricLabel}><Activity size={14} /> PING</div>
                                <div className={styles.metricValue} style={{ color: '#F59E0B' }}>
                                    {ping > 0 ? ping : '-'} <span style={{ fontSize: '0.8rem' }}>ms</span>
                                </div>
                            </div>
                            <div className={`${styles.metricCard} ${currentPhase === 'ping' ? styles.metricCardActive : ''}`}>
                                <div className={styles.metricLabel}><Activity size={14} /> JITTER</div>
                                <div className={styles.metricValue} style={{ color: '#F59E0B' }}>
                                    {jitter > 0 ? jitter : '-'} <span style={{ fontSize: '0.8rem' }}>ms</span>
                                </div>
                            </div>
                            <div className={`${styles.metricCard} ${currentPhase === 'download' ? styles.metricCardActive : ''}`}>
                                <div className={styles.metricLabel}><ArrowDown size={14} /> DOWNLOAD</div>
                                <div className={styles.metricValue} style={{ color: '#10B981' }}>
                                    {downloadSpeed > 0 ? downloadSpeed : '-'} <span style={{ fontSize: '0.8rem' }}>Mbps</span>
                                </div>
                            </div>
                            <div className={`${styles.metricCard} ${currentPhase === 'upload' ? styles.metricCardActive : ''}`}>
                                <div className={styles.metricLabel}><ArrowUp size={14} /> UPLOAD</div>
                                <div className={styles.metricValue} style={{ color: '#8B5CF6' }}>
                                    {uploadSpeed > 0 ? uploadSpeed : '-'} <span style={{ fontSize: '0.8rem' }}>Mbps</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoSection}>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Internet Provider</span>
                                    <span className={styles.infoValue}>
                                        <Wifi className={styles.infoIcon} size={18} /> {isp || 'Detecting...'}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>IP Address</span>
                                    <span className={styles.infoValue}>
                                        <Globe className={styles.infoIcon} size={18} /> {ipInfo || '...'}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Location</span>
                                    <span className={styles.infoValue}>
                                        <Server className={styles.infoIcon} size={18} /> {location || '...'}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Measurement</span>
                                    <span className={styles.infoValue}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 10 }} /> 
                                        Netflix CDN Optimized
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            className={styles.startButton}
                            onClick={runTest}
                            disabled={isRunning}
                        >
                            {isRunning ? (
                                <> <RotateCw className={styles.spin} size={24} /> Testing... </>
                            ) : (
                                <> <Play size={24} fill="currentColor" /> MULAI TEST </>
                            )}
                        </button>
                    </div>
                    
                    <TrustSection />
                    <GuideSection toolId="speed-test" />
                </div>
            </main>
            <Footer />
        </>
    )
}
