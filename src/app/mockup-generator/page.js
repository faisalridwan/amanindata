'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Layout, Smartphone, Monitor, Upload, Download, Palette, Layers,
    Maximize, Type, ImageIcon, Check, X, Shield, Tablet, Laptop,
    Smartphone as PhoneIcon, ChevronDown, ChevronUp
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrustSection from '@/components/TrustSection'
import GuideSection from '@/components/GuideSection'
import styles from './page.module.css'
import PhoneMockup from '@/components/mockups/PhoneMockup'
import LaptopMockup from '@/components/mockups/LaptopMockup'
import BrowserMockup from '@/components/mockups/BrowserMockup'
import * as htmlToImage from 'html-to-image'

// --- Device Definitions ---
const DEVICES = {
    iphone15: {
        id: 'iphone15',
        name: 'iPhone 15 Pro',
        type: 'phone',
        color: 'titanium'
    },
    iphone14: {
        id: 'iphone14',
        name: 'iPhone 14',
        type: 'phone',
        color: 'black'
    },
    macbook: {
        id: 'macbook',
        name: 'MacBook Pro',
        type: 'laptop',
        color: 'space-gray'
    },
    browser: {
        id: 'browser',
        name: 'Safari Browser',
        type: 'browser'
    }
}

export default function MockupGeneratorPage() {
    const [image, setImage] = useState(null)
    const [selectedDevice, setSelectedDevice] = useState('iphone15')

    // Customization State
    const [bgColor, setBgColor] = useState('#f3f4f6')
    const [frameColor, setFrameColor] = useState('#1c1c1e')
    const [padding, setPadding] = useState(50)

    // Scale for Export (Quality)
    const [scale, setScale] = useState(2)

    // Fit Mode: 'cover' (Crop to fill) or 'contain' (Fit whole image)
    const [fitMode, setFitMode] = useState('cover')

    // Image Positioning & Scaling
    const [imageScale, setImageScale] = useState(1) // Zoom inside frame
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })
    const [isPanning, setIsPanning] = useState(false)
    const [startPan, setStartPan] = useState({ x: 0, y: 0 })

    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef(null)

    // Reset panning/zooming when image or device changes
    useEffect(() => {
        setImageScale(1)
        setImageOffset({ x: 0, y: 0 })
    }, [image, selectedDevice, fitMode])

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }
    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0])
    }

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) loadImage(e.target.files[0])
    }

    const loadImage = (file) => {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => setImage(img)
        img.src = url
    }

    // --- Panning Handlers ---
    const handleMouseDown = (e) => {
        if (!image) return
        setIsPanning(true)
        setStartPan({ x: e.clientX, y: e.clientY })
    }
    const handleMouseMove = (e) => {
        if (!isPanning) return
        const dx = e.clientX - startPan.x
        const dy = e.clientY - startPan.y
        setStartPan({ x: e.clientX, y: e.clientY })

        setImageOffset(prev => ({
            x: prev.x + dx,
            y: prev.y + dy
        }))
    }

    const handleMouseUp = () => setIsPanning(false)

    // Download action
    const downloadMockup = async () => {
        if (!containerRef.current) return

        try {
            // Force higher resolution
            const dataUrl = await htmlToImage.toPng(containerRef.current, {
                pixelRatio: scale,
                backgroundColor: bgColor === 'transparent' ? null : bgColor,
            })
            const link = document.createElement('a')
            link.download = `mockup-${selectedDevice}-${Date.now()}.png`
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Download failed', error)
        }
    }

    const getDeviceIcon = (type) => {
        switch (type) {
            case 'phone': return <Smartphone size={20} />
            case 'laptop': return <Laptop size={20} />
            case 'browser': return <Monitor size={20} />
            default: return <Maximize size={20} />
        }
    }

    const currentDevice = DEVICES[selectedDevice]

    const renderMockup = () => {
        const props = {
            image,
            fitMode,
            scale,
            imageScale,
            imageOffset,
            isPanning,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            device: currentDevice
        }

        if (currentDevice.type === 'phone') return <PhoneMockup {...props} />
        if (currentDevice.type === 'laptop') return <LaptopMockup {...props} />
        if (currentDevice.type === 'browser') return <BrowserMockup {...props} />
        return null
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
                            <div
                                id="capture-container"
                                ref={containerRef}
                                className={styles.captureArea}
                                style={{
                                    padding: `${padding}px`,
                                    background: bgColor === 'transparent' ? 'transparent' : bgColor,
                                    transform: `scale(${1 / scale})`, // Counter-scale if we want visual fit, but here we just let it be responsive
                                    // Actually, let's keep it simple. The user sees 1x, we export 2x/3x. 
                                    // Or we scale the visual preview down to fit.
                                    zoom: 0.6 // Quick hack to fit large mockups in preview
                                }}
                            >
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
                                    renderMockup()
                                )}
                            </div>
                        </div>

                        {/* Controls Sidebar */}
                        <div className={styles.sidebar}>
                            <div className={styles.controlsCard}>

                                {/* 1. Visual Device Selector */}
                                <div className={styles.controlGroup}>
                                    <label className={styles.label}>Pilih Perangkat</label>
                                    <div className={styles.deviceGrid}>
                                        {Object.values(DEVICES).map(device => (
                                            <div
                                                key={device.id}
                                                className={`${styles.deviceCard} ${selectedDevice === device.id ? styles.deviceCardActive : ''}`}
                                                onClick={() => setSelectedDevice(device.id)}
                                                title={device.name}
                                            >
                                                <div className={styles.deviceIcon}>
                                                    {getDeviceIcon(device.type)}
                                                </div>
                                                <span className={styles.deviceName}>{device.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Layout Controls */}
                                <div className={styles.accordion}>
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

                                    {image && (
                                        <div className={styles.controlGroup}>
                                            <label className={styles.label}>Posisi Gambar</label>

                                            <div className={styles.scaleButtons} style={{ marginBottom: '12px' }}>
                                                <button
                                                    className={`${styles.scaleBtn} ${fitMode === 'cover' ? styles.scaleBtnActive : ''}`}
                                                    onClick={() => setFitMode('cover')}
                                                >
                                                    Penuh (Crop)
                                                </button>
                                                <button
                                                    className={`${styles.scaleBtn} ${fitMode === 'contain' ? styles.scaleBtnActive : ''}`}
                                                    onClick={() => setFitMode('contain')}
                                                >
                                                    Fit (Utuh)
                                                </button>
                                            </div>

                                            <div className={styles.sliderHeader}>
                                                <span className={styles.sliderLabel}>Zoom Gambar</span>
                                                <span className={styles.sliderValue}>{Math.round(imageScale * 100)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5" max="3" step="0.1"
                                                value={imageScale}
                                                onChange={(e) => setImageScale(parseFloat(e.target.value))}
                                                className={styles.slider}
                                            />
                                            <p className={styles.dropSubtext} style={{ marginTop: '8px' }}>*Geser gambar di preview untuk mengatur posisi</p>
                                        </div>
                                    )}

                                    {/* 3. Style Controls */}
                                    <div className={styles.controlGroup}>
                                        <label className={styles.label}>Warna Frame</label>
                                        <div className={styles.colorRow}>
                                            <input
                                                type="color"
                                                value={frameColor}
                                                onChange={(e) => setFrameColor(e.target.value)}
                                                className={styles.colorInput}
                                            />
                                            <span className={styles.colorHex}>{frameColor}</span>
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

                                    {/* 4. Export Settings */}
                                    <div className={styles.controlGroup}>
                                        <div className={styles.sliderHeader}>
                                            <span className={styles.sliderLabel}>Kualitas (Output)</span>
                                            <span className={styles.sliderValue}>{scale}x</span>
                                        </div>
                                        <div className={styles.scaleButtons}>
                                            {[1, 2, 3, 4].map(s => (
                                                <button
                                                    key={s}
                                                    className={`${styles.scaleBtn} ${scale === s ? styles.scaleBtnActive : ''}`}
                                                    onClick={() => setScale(s)}
                                                >
                                                    {s}x
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className={styles.actions}>
                                    <button
                                        className={styles.downloadBtn}
                                        onClick={downloadMockup}
                                        disabled={!image}
                                        style={{
                                            backgroundColor: 'var(--primary-dark)',
                                            color: 'white',
                                        }}
                                    >
                                        <Download size={20} /> Download PNG
                                    </button>

                                    {image && (
                                        <button
                                            className={styles.resetBtn}
                                            onClick={() => {
                                                setImage(null)
                                                // Reset file input
                                                const fileInput = document.getElementById('image-upload')
                                                if (fileInput) fileInput.value = ''
                                            }}
                                        >
                                            Reset Gambar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TrustSection />
                <GuideSection toolId="mockup-generator" />
            </main>
            <Footer />
        </>
    )
}
