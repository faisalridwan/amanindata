'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Layout, Smartphone, Monitor, Upload, Download, Palette, Layers,
    Maximize, Type, Image as ImageIcon, Check, X, Shield
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function MockupGeneratorPage() {
    const [image, setImage] = useState(null)
    const [frameType, setFrameType] = useState('browser') // browser, phone, simple
    const [bgColor, setBgColor] = useState('#f3f4f6')
    const [padding, setPadding] = useState(50)
    const [borderRadius, setBorderRadius] = useState(12)
    const [isDragging, setIsDragging] = useState(false)
    const canvasRef = useRef(null)
    const containerRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            loadImage(e.dataTransfer.files[0])
        }
    }

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            loadImage(e.target.files[0])
        }
    }

    const loadImage = (file) => {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
            setImage(img)
        }
        img.src = url
    }

    useEffect(() => {
        if (image) {
            drawMockup()
        }
    }, [image, frameType, bgColor, padding, borderRadius])

    const drawMockup = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!canvas || !ctx || !image) return

        // 1. Calculate Dimensions
        // We want high res output
        const scale = 2 // Upscale for quality

        let frameWidth, frameHeight, contentX, contentY, contentW, contentH
        let totalWidth, totalHeight

        // Base content dimensions from image
        // Limit max width to avoid massive canvas
        const MAX_CONTENT_WIDTH = 1200
        let imgW = image.width
        let imgH = image.height

        if (imgW > MAX_CONTENT_WIDTH) {
            const ratio = MAX_CONTENT_WIDTH / imgW
            imgW = MAX_CONTENT_WIDTH
            imgH = imgH * ratio
        }

        // Frame consts
        const browserHeaderH = 40
        const phoneBorderW = 12
        const phoneNotchW = 120
        const phoneNotchH = 30

        if (frameType === 'browser') {
            contentW = imgW
            contentH = imgH
            frameWidth = contentW
            frameHeight = contentH + browserHeaderH
            contentX = 0
            contentY = browserHeaderH
        } else if (frameType === 'phone') {
            contentW = imgW
            contentH = imgH
            frameWidth = contentW + (phoneBorderW * 2)
            frameHeight = contentH + (phoneBorderW * 2)
            contentX = phoneBorderW
            contentY = phoneBorderW
        } else { // simple
            contentW = imgW
            contentH = imgH
            frameWidth = contentW
            frameHeight = contentH
            contentX = 0
            contentY = 0
        }

        const viewPadding = parseInt(padding) * 2 // Double for higher res
        totalWidth = frameWidth + (viewPadding * 2)
        totalHeight = frameHeight + (viewPadding * 2)

        canvas.width = totalWidth
        canvas.height = totalHeight

        // 2. Clear & Draw Background
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, totalWidth, totalHeight)

        // Translate to frame start
        ctx.translate(viewPadding, viewPadding)

        // 3. Draw Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
        ctx.shadowBlur = 40
        ctx.shadowOffsetY = 20

        // 4. Draw Frame Background (for shadow casting)
        if (frameType === 'simple') {
            roundRect(ctx, 0, 0, frameWidth, frameHeight, parseInt(borderRadius))
            ctx.fillStyle = 'white'
            ctx.fill()
        } else if (frameType === 'browser') {
            roundRect(ctx, 0, 0, frameWidth, frameHeight, 12, true, true) // Top rounded
            ctx.fillStyle = '#1e1e1e' // Dark theme browser
            ctx.fill()
        } else if (frameType === 'phone') {
            roundRect(ctx, 0, 0, frameWidth, frameHeight, 40)
            ctx.fillStyle = '#121212'
            ctx.fill()
        }

        ctx.shadowColor = 'transparent' // Reset shadow

        // 5. Draw Content
        ctx.save()
        if (frameType === 'browser') {
            // Browser Header
            ctx.fillStyle = '#1e1e1e' // Header bg
            // Top rounded only clip
            roundRect(ctx, 0, 0, frameWidth, browserHeaderH, 12, true, false)
            ctx.fill()

            // Dots
            ctx.beginPath()
            ctx.fillStyle = '#ff5f56' // Red
            ctx.arc(24, 20, 6, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.fillStyle = '#ffbd2e' // Yellow
            ctx.arc(44, 20, 6, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.fillStyle = '#27c93f' // Green
            ctx.arc(64, 20, 6, 0, Math.PI * 2)
            ctx.fill()

            // Content Area (Bottom rounded)
            ctx.beginPath()
            // Clip to bottom rounded rect
            roundRect(ctx, 0, browserHeaderH, contentW, contentH, 12, false, true)
            ctx.clip()
            ctx.drawImage(image, 0, browserHeaderH, contentW, contentH)

        } else if (frameType === 'phone') {
            // Clip inner screen area
            roundRect(ctx, contentX, contentY, contentW, contentH, 30)
            ctx.clip()
            ctx.drawImage(image, contentX, contentY, contentW, contentH)

            ctx.restore() // Remove clip
            ctx.save()

            // Notch
            ctx.fillStyle = '#121212'
            const notchX = (frameWidth / 2) - (phoneNotchW / 2)
            ctx.beginPath()
            ctx.roundRect(notchX, phoneBorderW, phoneNotchW, phoneNotchH, [0, 0, 10, 10])
            ctx.fill()

        } else {
            // Simple
            roundRect(ctx, 0, 0, contentW, contentH, parseInt(borderRadius))
            ctx.clip()
            ctx.drawImage(image, 0, 0, contentW, contentH)
        }

        ctx.restore()
    }

    const roundRect = (ctx, x, y, w, h, r, topRounded = true, bottomRounded = true) => {
        const tl = topRounded ? r : 0
        const tr = topRounded ? r : 0
        const br = bottomRounded ? r : 0
        const bl = bottomRounded ? r : 0

        ctx.beginPath()
        if (ctx.roundRect) {
            ctx.roundRect(x, y, w, h, [tl, tr, br, bl])
        } else {
            // Fallback
            ctx.moveTo(x + tl, y)
            ctx.lineTo(x + w - tr, y)
            ctx.quadraticCurveTo(x + w, y, x + w, y + tr)
            ctx.lineTo(x + w, y + h - br)
            ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h)
            ctx.lineTo(x + bl, y + h)
            ctx.quadraticCurveTo(x, y + h, x, y + h - bl)
            ctx.lineTo(x, y + tl)
            ctx.quadraticCurveTo(x, y, x + tl, y)
        }
        ctx.closePath()
    }

    const downloadMockup = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = url
        a.download = `mockup-amanin-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <>
            <Navbar />
            <main className="container">
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        <Layers size={32} /> Device <span>Mockup</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Buat mockup profesional untuk screenshot aplikasi atau website dalam hitungan detik.
                    </p>
                    <div className={styles.trustBadge}>
                        <Shield size={16} /> 100% Client-Side Processing
                    </div>
                </header>

                <div className={styles.workspace}>
                    <div className={styles.grid}>
                        <div className={styles.previewContainer}>
                            {!image ? (
                                <div
                                    className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('image-upload').click()}
                                >
                                    <Upload size={48} className={styles.dropIcon} />
                                    <h3 className={styles.dropText}>Klik atau Drag screenshot</h3>
                                    <p className={styles.dropSubtext}>JPG, PNG, WebP</p>
                                    <input type="file" id="image-upload" accept="image/*" onChange={handleFileSelect} hidden />
                                </div>
                            ) : (
                                <canvas ref={canvasRef} className={styles.previewCanvas} style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                            )}
                        </div>

                        <div className={styles.sidebar}>
                            <div className={styles.controlsCard}>
                                <div className={styles.sectionTitle}>Pilih Frame</div>
                                <div className={styles.framesGrid}>
                                    <div
                                        className={`${styles.frameOption} ${frameType === 'browser' ? styles.frameActive : ''}`}
                                        onClick={() => setFrameType('browser')}
                                    >
                                        <Monitor size={24} />
                                        <span className={styles.frameLabel}>Browser</span>
                                    </div>
                                    <div
                                        className={`${styles.frameOption} ${frameType === 'phone' ? styles.frameActive : ''}`}
                                        onClick={() => setFrameType('phone')}
                                    >
                                        <Smartphone size={24} />
                                        <span className={styles.frameLabel}>HP</span>
                                    </div>
                                    <div
                                        className={`${styles.frameOption} ${frameType === 'simple' ? styles.frameActive : ''}`}
                                        onClick={() => setFrameType('simple')}
                                    >
                                        <Maximize size={24} />
                                        <span className={styles.frameLabel}>Simple</span>
                                    </div>
                                </div>

                                <div className={styles.sliderGroup}>
                                    <div className={styles.sliderHeader}>
                                        <span className={styles.sliderLabel}>Padding (Jarak)</span>
                                        <span className={styles.sliderValue}>{padding}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={padding}
                                        onChange={(e) => setPadding(e.target.value)}
                                        className={styles.slider}
                                    />
                                </div>

                                {frameType === 'simple' && (
                                    <div className={styles.sliderGroup}>
                                        <div className={styles.sliderHeader}>
                                            <span className={styles.sliderLabel}>Radius Sudut</span>
                                            <span className={styles.sliderValue}>{borderRadius}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            value={borderRadius}
                                            onChange={(e) => setBorderRadius(e.target.value)}
                                            className={styles.slider}
                                        />
                                    </div>
                                )}

                                <div className={styles.sectionTitle}>Warna Background</div>
                                <div className={styles.colorPickerGroup}>
                                    {['#f3f4f6', '#1e293b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                                        <div
                                            key={color}
                                            className={`${styles.colorBtn} ${bgColor === color ? styles.colorBtnActive : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setBgColor(color)}
                                        />
                                    ))}
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className={styles.colorBtn}
                                        style={{ padding: 0, overflow: 'hidden' }}
                                    />
                                </div>

                                <button
                                    className={styles.downloadBtn}
                                    onClick={downloadMockup}
                                    disabled={!image}
                                >
                                    <Download size={20} /> Download PNG
                                </button>

                                {image && (
                                    <button
                                        className={styles.downloadBtn}
                                        onClick={() => setImage(null)}
                                        style={{ marginTop: '10px', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}
                                    >
                                        Reset Gambar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
