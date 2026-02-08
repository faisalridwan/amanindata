'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DonationModal from '@/components/DonationModal'
import styles from './page.module.css'

export default function Home() {
    const [isDonationOpen, setIsDonationOpen] = useState(false)

    // Image states
    const [uploadedImage, setUploadedImage] = useState(null)
    const [originalFileName, setOriginalFileName] = useState('')
    const [imageLoaded, setImageLoaded] = useState(false)

    // Crop states
    const [isCropping, setIsCropping] = useState(false)
    const [cropStart, setCropStart] = useState({ x: 0, y: 0 })
    const [cropEnd, setCropEnd] = useState({ x: 0, y: 0 })
    const [croppedImage, setCroppedImage] = useState(null)

    // Watermark states
    const [watermarkType, setWatermarkType] = useState('tiled') // 'single' or 'tiled'
    const [watermarkText, setWatermarkText] = useState('')
    const [useAutoWatermark, setUseAutoWatermark] = useState(true)
    const [fontSize, setFontSize] = useState(30)
    const [fontFamily, setFontFamily] = useState('Arial')
    const [rotation, setRotation] = useState(-30)
    const [opacity, setOpacity] = useState(0.3)
    const [color, setColor] = useState('#080808')

    // Position for single text mode
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const canvasRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const cropCanvasRef = useRef(null)
    const fileInputRef = useRef(null)

    const fonts = [
        { value: 'Arial', label: 'Arial' },
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'PT Sans', label: 'PT Sans' },
        { value: 'Poppins', label: 'Poppins' },
    ]

    // Generate auto watermark text
    const getAutoWatermarkText = useCallback(() => {
        const today = new Date()
        const day = today.getDate().toString().padStart(2, '0')
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const year = today.getFullYear()
        return `Verifikasi ${day}/${month}/${year}`
    }, [])

    // Get current watermark text
    const getCurrentWatermarkText = useCallback(() => {
        if (useAutoWatermark) {
            return watermarkText ? `${watermarkText}\n${getAutoWatermarkText()}` : getAutoWatermarkText()
        }
        return watermarkText || 'WATERMARK'
    }, [watermarkText, useAutoWatermark, getAutoWatermarkText])

    // Main draw function
    const draw = useCallback(() => {
        const canvas = canvasRef.current
        const sourceImage = croppedImage || uploadedImage
        if (!canvas || !sourceImage) return

        const ctx = canvas.getContext('2d')
        canvas.width = sourceImage.width
        canvas.height = sourceImage.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height)

        // Draw watermark
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.font = `bold ${fontSize}px "${fontFamily}", sans-serif`
        ctx.fillStyle = color
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'

        const text = getCurrentWatermarkText()
        const lines = text.split('\n')
        const lineHeight = fontSize * 1.3

        if (watermarkType === 'tiled') {
            const spacing = fontSize * 4
            const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2)

            for (let x = -diagonal; x < diagonal * 2; x += spacing) {
                for (let y = -diagonal; y < diagonal * 2; y += spacing) {
                    ctx.save()
                    ctx.translate(x, y)
                    ctx.rotate((rotation * Math.PI) / 180)
                    lines.forEach((line, index) => {
                        const yOffset = index * lineHeight - ((lines.length - 1) * lineHeight) / 2
                        ctx.fillText(line, 0, yOffset)
                    })
                    ctx.restore()
                }
            }
        } else {
            // Single text mode
            ctx.translate(textPosition.x || canvas.width / 2, textPosition.y || canvas.height / 2)
            ctx.rotate((rotation * Math.PI) / 180)
            lines.forEach((line, index) => {
                const yOffset = index * lineHeight - ((lines.length - 1) * lineHeight) / 2
                ctx.fillText(line, 0, yOffset)
            })
        }

        ctx.restore()
    }, [uploadedImage, croppedImage, watermarkType, watermarkText, fontSize, fontFamily, rotation, opacity, color, textPosition, getCurrentWatermarkText])

    useEffect(() => {
        if (imageLoaded) {
            draw()
        }
    }, [draw, imageLoaded])

    // Initialize text position when image loads
    useEffect(() => {
        const sourceImage = croppedImage || uploadedImage
        if (sourceImage && watermarkType === 'single') {
            setTextPosition({ x: sourceImage.width / 2, y: sourceImage.height / 2 })
        }
    }, [uploadedImage, croppedImage, watermarkType])

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const fileName = file.name.replace(/\.[^/.]+$/, '')
            setOriginalFileName(fileName)

            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.onload = () => {
                    setUploadedImage(img)
                    setCroppedImage(null)
                    setImageLoaded(true)
                    setTextPosition({ x: img.width / 2, y: img.height / 2 })
                }
                img.src = event.target?.result
            }
            reader.readAsDataURL(file)
        }
    }

    // Crop functions
    const startCrop = () => {
        setIsCropping(true)
        setCropStart({ x: 0, y: 0 })
        setCropEnd({ x: 0, y: 0 })
    }

    const handleCropMouseDown = (e) => {
        if (!isCropping) return
        const coords = getCropCoords(e)
        setCropStart(coords)
        setCropEnd(coords)
    }

    const handleCropMouseMove = (e) => {
        if (!isCropping || !cropStart.x) return
        const coords = getCropCoords(e)
        setCropEnd(coords)
    }

    const handleCropMouseUp = () => {
        if (!isCropping) return
        // Crop will be applied when user clicks "Apply Crop"
    }

    const getCropCoords = (e) => {
        const canvas = cropCanvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        }
    }

    const applyCrop = () => {
        const sourceImage = uploadedImage
        if (!sourceImage) return

        const x = Math.min(cropStart.x, cropEnd.x)
        const y = Math.min(cropStart.y, cropEnd.y)
        const width = Math.abs(cropEnd.x - cropStart.x)
        const height = Math.abs(cropEnd.y - cropStart.y)

        if (width < 10 || height < 10) {
            setIsCropping(false)
            return
        }

        const cropCanvas = document.createElement('canvas')
        cropCanvas.width = width
        cropCanvas.height = height
        const cropCtx = cropCanvas.getContext('2d')
        cropCtx.drawImage(sourceImage, x, y, width, height, 0, 0, width, height)

        const croppedImg = new Image()
        croppedImg.onload = () => {
            setCroppedImage(croppedImg)
            setTextPosition({ x: croppedImg.width / 2, y: croppedImg.height / 2 })
            setIsCropping(false)
        }
        croppedImg.src = cropCanvas.toDataURL()
    }

    const cancelCrop = () => {
        setIsCropping(false)
        setCropStart({ x: 0, y: 0 })
        setCropEnd({ x: 0, y: 0 })
    }

    // Drag functions for single text
    const getCanvasCoords = (e) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        }
    }

    const handleMouseDown = (e) => {
        if (!imageLoaded || watermarkType !== 'single' || isCropping) return
        e.preventDefault()
        const coords = getCanvasCoords(e)
        setIsDragging(true)
        setDragStart(coords)
    }

    const handleMouseMove = (e) => {
        if (!isDragging || watermarkType !== 'single') return
        e.preventDefault()
        const coords = getCanvasCoords(e)
        setTextPosition(prev => ({
            x: prev.x + (coords.x - dragStart.x),
            y: prev.y + (coords.y - dragStart.y)
        }))
        setDragStart(coords)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    // Download functions
    const getDownloadFileName = (ext) => {
        const baseName = originalFileName || 'ktp'
        return `${baseName}-watermark by amaninktp.qreatip.com.${ext}`
    }

    const handleDownloadPNG = () => {
        const canvas = canvasRef.current
        if (!canvas || !imageLoaded) return

        const link = document.createElement('a')
        link.download = getDownloadFileName('png')
        link.href = canvas.toDataURL('image/png')
        link.click()
    }

    const handleDownloadPDF = async () => {
        const canvas = canvasRef.current
        if (!canvas || !imageLoaded) return

        const { jsPDF } = await import('jspdf')

        const imgData = canvas.toDataURL('image/png')
        const imgWidth = canvas.width
        const imgHeight = canvas.height

        // Create PDF with image dimensions (in mm, assuming 72 DPI)
        const pdfWidth = imgWidth * 0.264583
        const pdfHeight = imgHeight * 0.264583

        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'mm',
            format: [pdfWidth, pdfHeight]
        })

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save(getDownloadFileName('pdf'))
    }

    const handleReset = () => {
        setUploadedImage(null)
        setCroppedImage(null)
        setOriginalFileName('')
        setImageLoaded(false)
        setWatermarkText('')
        setUseAutoWatermark(true)
        setFontSize(30)
        setFontFamily('Arial')
        setRotation(-30)
        setOpacity(0.3)
        setColor('#080808')
        setWatermarkType('tiled')
        setIsCropping(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    // Draw crop overlay
    useEffect(() => {
        if (!isCropping || !uploadedImage) return

        const canvas = cropCanvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        canvas.width = uploadedImage.width
        canvas.height = uploadedImage.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(uploadedImage, 0, 0)

        // Draw dark overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Clear crop area
        if (cropStart.x && cropEnd.x) {
            const x = Math.min(cropStart.x, cropEnd.x)
            const y = Math.min(cropStart.y, cropEnd.y)
            const width = Math.abs(cropEnd.x - cropStart.x)
            const height = Math.abs(cropEnd.y - cropStart.y)

            ctx.clearRect(x, y, width, height)
            ctx.drawImage(uploadedImage, x, y, width, height, x, y, width, height)

            // Draw border
            ctx.strokeStyle = '#A8C5F0'
            ctx.lineWidth = 3
            ctx.strokeRect(x, y, width, height)
        }
    }, [isCropping, uploadedImage, cropStart, cropEnd])

    return (
        <>
            <Navbar onDonateClick={() => setIsDonationOpen(true)} />

            <main className="container">
                {/* Hero Section */}
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        🛡️ Watermark KTP <span>Online</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Lindungi foto KTP Anda dengan watermark. Semua proses di browser, data aman.
                    </p>
                </header>

                {/* Main Workspace */}
                <div className={`neu-card no-hover ${styles.workspace}`}>
                    {/* Left: Controls */}
                    <div className={styles.controls}>
                        {/* Upload */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>📁 Upload Gambar</h3>
                            <div
                                className={styles.fileInputWrapper}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <span className={styles.fileIcon}>{imageLoaded ? '✅' : '📷'}</span>
                                <span className={styles.fileText}>
                                    {imageLoaded ? originalFileName : 'Pilih file gambar KTP'}
                                </span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    hidden
                                />
                            </div>

                            {imageLoaded && !isCropping && (
                                <button className={`neu-btn neu-btn-sm ${styles.cropBtn}`} onClick={startCrop}>
                                    ✂️ Crop Gambar
                                </button>
                            )}
                        </div>

                        {/* Watermark Type */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>📝 Jenis Watermark</h3>
                            <div className={styles.typeButtons}>
                                <button
                                    className={`neu-btn neu-btn-sm ${watermarkType === 'tiled' ? 'primary' : ''}`}
                                    onClick={() => setWatermarkType('tiled')}
                                >
                                    🔲 Menyeluruh
                                </button>
                                <button
                                    className={`neu-btn neu-btn-sm ${watermarkType === 'single' ? 'primary' : ''}`}
                                    onClick={() => setWatermarkType('single')}
                                >
                                    📍 Satu Teks
                                </button>
                            </div>
                        </div>

                        {/* Auto Watermark */}
                        <div className={styles.section}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={useAutoWatermark}
                                    onChange={(e) => setUseAutoWatermark(e.target.checked)}
                                />
                                <span>Tambah "Verifikasi + Tanggal" otomatis</span>
                            </label>
                        </div>

                        {/* Custom Text */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>✏️ Teks Watermark</h3>
                            <textarea
                                className="neu-input"
                                value={watermarkText}
                                onChange={(e) => setWatermarkText(e.target.value)}
                                placeholder="Contoh: Hanya untuk verifikasi Shopee"
                                rows={2}
                            />
                        </div>

                        {/* Font */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>🔤 Font</h3>
                            <select
                                className="neu-input"
                                value={fontFamily}
                                onChange={(e) => setFontFamily(e.target.value)}
                            >
                                {fonts.map(f => (
                                    <option key={f.value} value={f.value}>{f.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sliders */}
                        <div className={styles.section}>
                            <div className={styles.controlRow}>
                                <label>Ukuran: <span className={styles.value}>{fontSize}px</span></label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                />
                            </div>

                            <div className={styles.controlRow}>
                                <label>Rotasi: <span className={styles.value}>{rotation}°</span></label>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    value={rotation}
                                    onChange={(e) => setRotation(Number(e.target.value))}
                                />
                            </div>

                            <div className={styles.controlRow}>
                                <label>Transparansi: <span className={styles.value}>{Math.round(opacity * 100)}%</span></label>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="1"
                                    step="0.05"
                                    value={opacity}
                                    onChange={(e) => setOpacity(Number(e.target.value))}
                                />
                            </div>

                            <div className={styles.controlRow}>
                                <label>Warna:</label>
                                <div className={styles.colorInput}>
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                    <span>{color}</span>
                                </div>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>💾 Download Hasil</h3>
                            <div className={styles.downloadButtons}>
                                <button
                                    className="neu-btn primary"
                                    onClick={handleDownloadPNG}
                                    disabled={!imageLoaded}
                                >
                                    📷 PNG
                                </button>
                                <button
                                    className="neu-btn accent"
                                    onClick={handleDownloadPDF}
                                    disabled={!imageLoaded}
                                >
                                    📄 PDF
                                </button>
                            </div>
                            <button
                                className={`neu-btn ${styles.resetBtn}`}
                                onClick={handleReset}
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div className={styles.preview}>
                        <h3 className={styles.sectionTitle}>👁️ Preview Hasil</h3>

                        {isCropping && uploadedImage && (
                            <div className={styles.cropContainer}>
                                <canvas
                                    ref={cropCanvasRef}
                                    onMouseDown={handleCropMouseDown}
                                    onMouseMove={handleCropMouseMove}
                                    onMouseUp={handleCropMouseUp}
                                    onTouchStart={handleCropMouseDown}
                                    onTouchMove={handleCropMouseMove}
                                    onTouchEnd={handleCropMouseUp}
                                />
                                <div className={styles.cropActions}>
                                    <button className="neu-btn primary" onClick={applyCrop}>✅ Apply Crop</button>
                                    <button className="neu-btn" onClick={cancelCrop}>❌ Cancel</button>
                                </div>
                            </div>
                        )}

                        {!isCropping && (
                            <div
                                className={styles.canvasContainer}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleMouseDown}
                                onTouchMove={handleMouseMove}
                                onTouchEnd={handleMouseUp}
                            >
                                <canvas
                                    ref={canvasRef}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                                {!imageLoaded && (
                                    <div className={styles.placeholder}>
                                        <span className={styles.placeholderIcon}>🖼️</span>
                                        <p>Upload gambar KTP untuk memulai</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {watermarkType === 'single' && imageLoaded && !isCropping && (
                            <p className={styles.dragHint}>💡 Drag teks untuk mengubah posisi</p>
                        )}
                    </div>
                </div>

                {/* Trust Section */}
                <section className={styles.trustSection}>
                    <div className={styles.trustBadges}>
                        <div className={styles.trustBadge}>🔒 100% Client-Side</div>
                        <div className={styles.trustBadge}>🚫 Tanpa Upload Server</div>
                        <div className={styles.trustBadge}>⚡ Tanpa Login</div>
                        <div className={styles.trustBadge}>🇮🇩 Karya Lokal</div>
                    </div>
                </section>
            </main>

            <Footer onDonateClick={() => setIsDonationOpen(true)} />
            <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
        </>
    )
}
