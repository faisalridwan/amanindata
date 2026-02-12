'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Layout, Smartphone, Monitor, Upload, Download, Palette, Layers,
    Maximize, Type, Image as ImageIcon, Check, X, Shield, Tablet, Laptop,
    Smartphone as PhoneIcon, ChevronDown, ChevronUp
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

// --- Device Definitions ---
const DEVICES = {
    iphone15: {
        id: 'iphone15',
        name: 'iPhone 15 Pro',
        type: 'phone',
        aspectRatio: 9 / 19.5,
        cornerRadius: 50,
        bezel: 12,
        frameColor: '#53504C', // Natural Titanium
        features: { dynamicIsland: true, sideButtons: true }
    },
    iphone14: {
        id: 'iphone14',
        name: 'iPhone 14',
        type: 'phone',
        aspectRatio: 9 / 19.5,
        cornerRadius: 40,
        bezel: 14,
        frameColor: '#1c1c1e',
        features: { notch: true, sideButtons: true }
    },
    pixel8: {
        id: 'pixel8',
        name: 'Pixel 8 Pro',
        type: 'phone',
        aspectRatio: 9 / 20,
        cornerRadius: 28,
        bezel: 10,
        frameColor: '#3c4043',
        features: { punchHole: true, sideButtons: true, squareCorners: true }
    },
    s24ultra: {
        id: 's24ultra',
        name: 'Galaxy S24 Ultra',
        type: 'phone',
        aspectRatio: 9 / 19.5,
        cornerRadius: 4, // Sharp corners
        bezel: 8,
        frameColor: '#2C2C2C',
        features: { punchHole: true, sideButtons: true }
    },
    ipad: {
        id: 'ipad',
        name: 'iPad Pro',
        type: 'tablet',
        aspectRatio: 3 / 4,
        cornerRadius: 24,
        bezel: 20,
        frameColor: '#282828',
        features: { cameraIndicator: true }
    },
    macbook: {
        id: 'macbook',
        name: 'MacBook Pro',
        type: 'laptop',
        aspectRatio: 16 / 10,
        cornerRadius: 16,
        bezel: 16, // Screen bezel
        frameColor: '#000000', // Screen border is black
        features: { notch: true, keyboardHint: true }
    },
    browser: {
        id: 'browser',
        name: 'Safari Browser',
        type: 'browser',
        aspectRatio: 16 / 9, // dynamic
        cornerRadius: 12,
        bezel: 0,
        frameColor: '#1e1e1e', // Dark mode header
        features: { trafficLights: true }
    },
    simple: {
        id: 'simple',
        name: 'Simple Frame',
        type: 'simple',
        aspectRatio: null,
        cornerRadius: 12,
        bezel: 0,
        frameColor: 'transparent',
        features: {}
    }
}

export default function MockupGeneratorPage() {
    const [image, setImage] = useState(null)
    const [selectedDevice, setSelectedDevice] = useState('iphone15')

    // Customization State
    const [bgColor, setBgColor] = useState('#f3f4f6')
    const [frameColor, setFrameColor] = useState('') // Overrides device default if set
    const [padding, setPadding] = useState(50)
    const [borderRadius, setBorderRadius] = useState(12) // For simple frame

    // Shadow
    const [shadowBlur, setShadowBlur] = useState(40)
    const [shadowOpacity, setShadowOpacity] = useState(0.3)
    const [shadowOffsetY, setShadowOffsetY] = useState(20)

    const [isDragging, setIsDragging] = useState(false)
    const canvasRef = useRef(null)

    // Set initial frame color when device changes
    useEffect(() => {
        setFrameColor(DEVICES[selectedDevice].frameColor)
    }, [selectedDevice])

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
    }, [image, selectedDevice, bgColor, padding, borderRadius, shadowBlur, shadowOpacity, shadowOffsetY, frameColor])

    const drawMockup = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!canvas || !ctx || !image) return

        const device = DEVICES[selectedDevice]
        const scale = 2 // Upscale for high res

        // 1. Calculate Content Size & Canvas Size
        const MAX_WIDTH = 1200
        let contentW = image.width
        let contentH = image.height

        // Constrain width if too large
        if (contentW > MAX_WIDTH) {
            contentH = contentH * (MAX_WIDTH / contentW)
            contentW = MAX_WIDTH
        }

        // Adjust dimensions based on device type constraints if strict aspect ratio needed
        // For phones/tablets, we often fit image to width and let height flow, OR fit to device aspect ratio
        // Here we'll fit image to Content Width 

        let frameW, frameH, screenX, screenY, screenW, screenH

        // Calculate geometry
        if (device.type === 'phone' || device.type === 'tablet') {
            screenW = contentW
            screenH = contentH // Allow adaptable height for scrolling screenshots

            // Hard constraint if we want to force device aspect (optional, enabled for realism usually)
            // But for mocking scrolling screenshots, we adapt height.
            // Let's stick to adaptable height for utility, but maybe enforce min-ratio?

            frameW = screenW + (device.bezel * 2)
            frameH = screenH + (device.bezel * 2)
            screenX = device.bezel
            screenY = device.bezel

        } else if (device.type === 'laptop') {
            // MacBook Bottom base
            const headerH = 0
            // We draw image as screen
            screenW = contentW
            screenH = contentH

            // Screen Bezel
            const topBezel = device.bezel
            const sideBezel = device.bezel
            const bottomBezel = device.bezel * 1.5 // Chin

            frameW = screenW + (sideBezel * 2)
            frameH = screenH + topBezel + bottomBezel

            screenX = sideBezel
            screenY = topBezel

        } else if (device.type === 'browser') {
            const headerH = 40
            screenW = contentW
            screenH = contentH
            frameW = screenW
            frameH = screenH + headerH
            screenX = 0
            screenY = headerH
        } else { // simple
            screenW = contentW
            screenH = contentH
            frameW = screenW
            frameH = screenH
            screenX = 0
            screenY = 0
        }

        const viewPadding = parseInt(padding) * 2
        const totalW = frameW + (viewPadding * 2)
        const totalH = frameH + (viewPadding * 2)

        // Lower Base (Keyboard) for Laptop
        let baseH = 0
        if (device.type === 'laptop') {
            baseH = 16
        }

        canvas.width = totalW
        canvas.height = totalH + (baseH * 2) // Extra space for laptop base

        // 2. Background
        // Check if gradient or solid
        if (bgColor === 'transparent') {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        } else if (bgColor.includes('gradient')) {
            const grad = ctx.createLinearGradient(0, 0, 0, totalH)
            // Simple parsing for demo (needs better color picker for gradients)
            // Fallback to solid for now until UI ready
            ctx.fillStyle = bgColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        } else {
            ctx.fillStyle = bgColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Translate to Frame Start
        ctx.translate(viewPadding, viewPadding)

        // 3. Draw Shadow (Behind Frame)
        ctx.save()
        if (device.type !== 'simple' || shadowOpacity > 0) {
            ctx.shadowColor = `rgba(0, 0, 0, ${shadowOpacity})`
            ctx.shadowBlur = parseInt(shadowBlur)
            ctx.shadowOffsetY = parseInt(shadowOffsetY)

            // Draw a shape to cast shadow
            ctx.fillStyle = frameColor || device.frameColor

            if (device.type === 'browser') {
                roundRect(ctx, 0, 0, frameW, frameH, device.cornerRadius)
                ctx.fill()
            } else if (device.type === 'laptop') {
                // Laptop Screen
                roundRect(ctx, 0, 0, frameW, frameH, device.cornerRadius)
                ctx.fill()
                // Laptop Base not shadowed same way usually, but let's simple it
            } else {
                roundRect(ctx, 0, 0, frameW, frameH, device.cornerRadius)
                ctx.fill()
            }
        }
        ctx.restore()

        // 4. Draw Device Frame
        // Main Body
        ctx.fillStyle = frameColor || device.frameColor
        if (device.type === 'laptop') {
            // Screen Body
            roundRect(ctx, 0, 0, frameW, frameH, device.cornerRadius)
            ctx.fill()

            // Base (Keyboard area projection)
            ctx.fillStyle = adjustColor(frameColor || device.frameColor, -20)
            const baseX = -20
            const baseY = frameH
            const baseW = frameW + 40
            const baseDepth = 12

            // Base Top
            ctx.beginPath()
            ctx.moveTo(0, frameH - 10) // Hinge left
            ctx.lineTo(frameW, frameH - 10) // Hinge right
            ctx.lineTo(baseX + baseW, baseY + baseDepth)
            ctx.lineTo(baseX, baseY + baseDepth)
            ctx.fill()

            // Base Front
            ctx.fillStyle = adjustColor(frameColor || device.frameColor, -40)
            ctx.fillRect(baseX, baseY + baseDepth, baseW, 4)

            // Reset for Screen
            ctx.fillStyle = frameColor || device.frameColor

        } else {
            roundRect(ctx, 0, 0, frameW, frameH, device.cornerRadius)
            ctx.fill()
        }

        // 5. Side Buttons (Phones)
        if (device.features.sideButtons) {
            ctx.fillStyle = adjustColor(frameColor || device.frameColor, -20)

            // Left Buttons (Volume)
            // ctx.fillRect(-2, 120, 2, 40)
            // ctx.fillRect(-2, 170, 2, 40)

            // Right Button (Power)
            // ctx.fillRect(frameW, 140, 2, 60)
        }

        // 6. Draw Content (Screen)
        ctx.save()

        // Define Screen Path for Clipping
        ctx.beginPath()
        if (device.type === 'browser') {
            // Header
            ctx.fillStyle = '#1e1e1e' // Fixed header color
            // Clip top
            roundRect(ctx, 0, 0, frameW, 40, device.cornerRadius, true, false)
            ctx.fill()

            // Buttons
            drawTrafficLights(ctx, 20, 20)

            // Content Clip
            roundRect(ctx, 0, 40, screenW, screenH, device.cornerRadius, false, true)
            ctx.clip()

            ctx.drawImage(image, 0, 40, screenW, screenH)

        } else if (device.type === 'simple') {
            roundRect(ctx, 0, 0, screenW, screenH, parseInt(borderRadius))
            ctx.clip()
            ctx.drawImage(image, 0, 0, screenW, screenH)
        } else {
            // Phone/Tablet/Laptop Screen Area
            // Inner Radius calculation
            const innerRadius = Math.max(0, device.cornerRadius - device.bezel + 2)

            roundRect(ctx, screenX, screenY, screenW, screenH, innerRadius)
            ctx.clip()
            ctx.drawImage(image, screenX, screenY, screenW, screenH)
        }
        ctx.restore()

        // 7. Post-Pro Features (Notch, Dynamic Island, Reflections)
        if (device.features.dynamicIsland) {
            drawDynamicIsland(ctx, frameW / 2, device.bezel + 10)
        } else if (device.features.notch) {
            drawNotch(ctx, frameW / 2, device.bezel)
        } else if (device.features.punchHole) {
            drawPunchHole(ctx, frameW / 2, device.bezel + 15)
        }

        // 8. Gloss/Reflection (Subtle)
        if (device.type === 'phone' || device.type === 'tablet') {
            // Diagonal Gradient
            const grad = ctx.createLinearGradient(0, 0, frameW, frameH)
            grad.addColorStop(0, 'rgba(255,255,255,0.05)')
            grad.addColorStop(0.5, 'rgba(255,255,255,0)')
            grad.addColorStop(1, 'rgba(255,255,255,0.02)')

            ctx.fillStyle = grad
            ctx.beginPath()
            roundRect(ctx, 0, 0, frameW, frameH, device.cornerRadius)
            ctx.fill()
        }
    }

    // --- Helpers ---
    const roundRect = (ctx, x, y, w, h, r, top = true, bottom = true) => {
        if (r < 0) r = 0
        const tl = top ? r : 0
        const tr = top ? r : 0
        const br = bottom ? r : 0
        const bl = bottom ? r : 0

        ctx.beginPath()
        ctx.moveTo(x + tl, y)
        ctx.lineTo(x + w - tr, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + tr)
        ctx.lineTo(x + w, y + h - br)
        ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h)
        ctx.lineTo(x + bl, y + h)
        ctx.quadraticCurveTo(x, y + h, x, y + h - bl)
        ctx.lineTo(x, y + tl)
        ctx.quadraticCurveTo(x, y, x + tl, y)
        ctx.closePath()
    }

    const drawTrafficLights = (ctx, x, y) => {
        const colors = ['#ff5f56', '#ffbd2e', '#27c93f']
        colors.forEach((c, i) => {
            ctx.beginPath()
            ctx.fillStyle = c
            ctx.arc(x + (i * 20), y, 6, 0, Math.PI * 2)
            ctx.fill()
        })
    }

    const drawDynamicIsland = (ctx, x, y) => {
        ctx.fillStyle = '#000'
        ctx.beginPath()
        ctx.roundRect(x - 60, y, 120, 36, 18)
        ctx.fill()
    }

    const drawNotch = (ctx, x, y) => {
        ctx.fillStyle = '#000'
        ctx.beginPath()
        // Simple Notch shape (Laptop/Phone)
        ctx.moveTo(x - 60, 0)
        ctx.lineTo(x - 50, y + 25)
        ctx.lineTo(x + 50, y + 25)
        ctx.lineTo(x + 60, 0)
        ctx.fill()
    }

    const drawPunchHole = (ctx, x, y) => {
        ctx.fillStyle = '#000'
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
    }

    const adjustColor = (color, amount) => {
        // Simple Hex Darken/Lighten
        // For production, use utility lib. 
        // Hacky implementation for "darker version":
        return color === '#53504C' ? '#3e3c39' : '#000'
    }

    const downloadMockup = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement('a')
        link.download = `mockup-${selectedDevice}-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png', 1.0)
        link.click()
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
                        Buat mockup profesional dengan frame iPhone, Android, Macbook, dan Browser.
                    </p>
                    <div className={styles.trustBadge}>
                        <Shield size={16} /> 100% Client-Side Processing
                    </div>
                </header>

                <div className={styles.workspace}>
                    <div className={styles.grid}>
                        {/* Preview Area */}
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
                                <canvas ref={canvasRef} className={styles.previewCanvas} />
                            )}
                        </div>

                        {/* Controls Sidebar */}
                        <div className={styles.sidebar}>
                            <div className={styles.controlsCard}>

                                {/* 1. Device Selection */}
                                <div className={styles.controlGroup}>
                                    <label className={styles.label}>Pilih Perangkat</label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            value={selectedDevice}
                                            onChange={(e) => setSelectedDevice(e.target.value)}
                                            className={styles.selectInput}
                                        >
                                            <optgroup label="Phones">
                                                <option value="iphone15">iPhone 15 Pro</option>
                                                <option value="iphone14">iPhone 14</option>
                                                <option value="pixel8">Pixel 8 Pro</option>
                                                <option value="s24ultra">Galaxy S24 Ultra</option>
                                            </optgroup>
                                            <optgroup label="Tablets & Computers">
                                                <option value="ipad">iPad Pro</option>
                                                <option value="macbook">MacBook Pro</option>
                                            </optgroup>
                                            <optgroup label="Other">
                                                <option value="browser">Browser Window</option>
                                                <option value="simple">Simple Frame</option>
                                            </optgroup>
                                        </select>
                                        <ChevronDown className={styles.selectIcon} size={16} />
                                    </div>
                                </div>

                                {/* 2. Layout Controls */}
                                <div className={styles.controlGroup}>
                                    <div className={styles.sliderHeader}>
                                        <span className={styles.sliderLabel}>Padding (Jarak)</span>
                                        <span className={styles.sliderValue}>{padding}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="200"
                                        value={padding}
                                        onChange={(e) => setPadding(e.target.value)}
                                        className={styles.slider}
                                    />
                                </div>

                                {selectedDevice === 'simple' && (
                                    <div className={styles.controlGroup}>
                                        <div className={styles.sliderHeader}>
                                            <span className={styles.sliderLabel}>Radius Sudut</span>
                                            <span className={styles.sliderValue}>{borderRadius}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            value={borderRadius}
                                            onChange={(e) => setBorderRadius(e.target.value)}
                                            className={styles.slider}
                                        />
                                    </div>
                                )}

                                {/* 3. Style Controls */}
                                <div className={styles.accordion}>
                                    <div className={styles.controlGroup}>
                                        <label className={styles.label}>Warna Frame</label>
                                        <div className={styles.colorRow}>
                                            <input
                                                type="color"
                                                value={frameColor || '#000000'}
                                                onChange={(e) => setFrameColor(e.target.value)}
                                                className={styles.colorInput}
                                            />
                                            <span className={styles.colorHex}>{frameColor || 'Default'}</span>
                                        </div>
                                    </div>

                                    <div className={styles.controlGroup}>
                                        <label className={styles.label}>Background</label>
                                        <div className={styles.colorGrid}>
                                            {['#f3f4f6', '#1e293b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', 'transparent'].map(color => (
                                                <div
                                                    key={color}
                                                    className={`${styles.colorBtn} ${bgColor === color ? styles.colorBtnActive : ''}`}
                                                    style={{
                                                        backgroundColor: color === 'transparent' ? 'white' : color,
                                                        backgroundImage: color === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%)' : 'none',
                                                        backgroundSize: '10px 10px'
                                                    }}
                                                    onClick={() => setBgColor(color)}
                                                    title={color}
                                                />
                                            ))}
                                            <input
                                                type="color"
                                                value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className={styles.colorBtnInput}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.controlGroup}>
                                        <div className={styles.sliderHeader}>
                                            <span className={styles.sliderLabel}>Bayangan (Blur)</span>
                                            <span className={styles.sliderValue}>{shadowBlur}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            value={shadowBlur}
                                            onChange={(e) => setShadowBlur(e.target.value)}
                                            className={styles.slider}
                                        />
                                    </div>

                                    <div className={styles.controlGroup}>
                                        <div className={styles.sliderHeader}>
                                            <span className={styles.sliderLabel}>Opacity Bayangan</span>
                                            <span className={styles.sliderValue}>{Math.round(shadowOpacity * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0" max="1" step="0.05"
                                            value={shadowOpacity}
                                            onChange={(e) => setShadowOpacity(e.target.value)}
                                            className={styles.slider}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className={styles.actions}>
                                    <button
                                        className={styles.downloadBtn}
                                        onClick={downloadMockup}
                                        disabled={!image}
                                    >
                                        <Download size={20} /> Download PNG
                                    </button>

                                    {image && (
                                        <button
                                            className={styles.resetBtn}
                                            onClick={() => setImage(null)}
                                        >
                                            Reset Gambar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
