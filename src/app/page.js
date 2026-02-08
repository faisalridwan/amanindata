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
    const [cropStart, setCropStart] = useState(null)
    const [cropEnd, setCropEnd] = useState(null)
    const [isCropDragging, setIsCropDragging] = useState(false)
    const [croppedImage, setCroppedImage] = useState(null)

    // Watermark states
    const [watermarkType, setWatermarkType] = useState('tiled')
    const [watermarkText, setWatermarkText] = useState('')
    const [fontSize, setFontSize] = useState(30)
    const [fontFamily, setFontFamily] = useState('Arial')
    const [rotation, setRotation] = useState(-15)
    const [opacity, setOpacity] = useState(0.3)
    const [color, setColor] = useState('#080808')

    // Single text manipulation states
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
    const [textScale, setTextScale] = useState(1)
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [showTextBorder, setShowTextBorder] = useState(false)

    const canvasRef = useRef(null)
    const cropCanvasRef = useRef(null)
    const fileInputRef = useRef(null)
    const containerRef = useRef(null)

    const fonts = [
        { value: 'Arial', label: 'Arial' },
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'PT Sans', label: 'PT Sans' },
        { value: 'Poppins', label: 'Poppins' },
        { value: 'Georgia', label: 'Georgia' },
    ]

    // Generate default watermark text with date
    const getDefaultWatermarkText = useCallback(() => {
        const today = new Date()
        const day = today.getDate().toString().padStart(2, '0')
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const year = today.getFullYear()
        return `Verifikasi ${day}/${month}/${year}`
    }, [])

    // Initialize watermark text with auto date
    useEffect(() => {
        if (!watermarkText) {
            setWatermarkText(getDefaultWatermarkText())
        }
    }, [getDefaultWatermarkText, watermarkText])

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

        const text = watermarkText || 'WATERMARK'
        const lines = text.split('\n')
        const lineHeight = fontSize * textScale * 1.3
        const actualFontSize = fontSize * textScale

        // Draw watermark
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.font = `bold ${actualFontSize}px "${fontFamily}", sans-serif`
        ctx.fillStyle = color
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'

        if (watermarkType === 'tiled') {
            const spacing = actualFontSize * 4
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
            const posX = textPosition.x || canvas.width / 2
            const posY = textPosition.y || canvas.height / 2

            ctx.translate(posX, posY)
            ctx.rotate((rotation * Math.PI) / 180)

            lines.forEach((line, index) => {
                const yOffset = index * lineHeight - ((lines.length - 1) * lineHeight) / 2
                ctx.fillText(line, 0, yOffset)
            })

            // Draw selection border when hovering/dragging
            if (showTextBorder && watermarkType === 'single') {
                ctx.globalAlpha = 1
                ctx.strokeStyle = '#A8C5F0'
                ctx.lineWidth = 2
                ctx.setLineDash([5, 5])

                const maxWidth = Math.max(...lines.map(line => ctx.measureText(line).width))
                const totalHeight = lines.length * lineHeight

                ctx.strokeRect(-maxWidth / 2 - 10, -totalHeight / 2 - 10, maxWidth + 20, totalHeight + 20)

                // Draw resize handles
                const handleSize = 10
                ctx.fillStyle = '#A8C5F0'
                ctx.setLineDash([])

                // Corner handles
                ctx.fillRect(-maxWidth / 2 - 10 - handleSize / 2, -totalHeight / 2 - 10 - handleSize / 2, handleSize, handleSize)
                ctx.fillRect(maxWidth / 2 + 10 - handleSize / 2, -totalHeight / 2 - 10 - handleSize / 2, handleSize, handleSize)
                ctx.fillRect(-maxWidth / 2 - 10 - handleSize / 2, totalHeight / 2 + 10 - handleSize / 2, handleSize, handleSize)
                ctx.fillRect(maxWidth / 2 + 10 - handleSize / 2, totalHeight / 2 + 10 - handleSize / 2, handleSize, handleSize)

                // Rotation handle
                ctx.beginPath()
                ctx.arc(0, -totalHeight / 2 - 30, 8, 0, Math.PI * 2)
                ctx.fill()
                ctx.moveTo(0, -totalHeight / 2 - 10)
                ctx.lineTo(0, -totalHeight / 2 - 22)
                ctx.strokeStyle = '#A8C5F0'
                ctx.lineWidth = 2
                ctx.stroke()
            }
        }

        ctx.restore()
    }, [uploadedImage, croppedImage, watermarkType, watermarkText, fontSize, fontFamily, rotation, opacity, color, textPosition, textScale, showTextBorder])

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

    const loadImage = (file) => {
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
                setTextScale(1)
            }
            img.src = event.target?.result
        }
        reader.readAsDataURL(file)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) loadImage(file)
    }

    // Drag & Drop handlers
    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const file = e.dataTransfer?.files?.[0]
        if (file && file.type.startsWith('image/')) {
            loadImage(file)
        }
    }

    // Paste handler
    useEffect(() => {
        const handlePaste = (e) => {
            const items = e.clipboardData?.items
            if (!items) return

            for (let item of items) {
                if (item.type.startsWith('image/')) {
                    const file = item.getAsFile()
                    if (file) loadImage(file)
                    break
                }
            }
        }

        document.addEventListener('paste', handlePaste)
        return () => document.removeEventListener('paste', handlePaste)
    }, [])

    // Crop functions
    const startCrop = () => {
        setIsCropping(true)
        setCropStart(null)
        setCropEnd(null)
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
            x: Math.max(0, Math.min(canvas.width, (clientX - rect.left) * scaleX)),
            y: Math.max(0, Math.min(canvas.height, (clientY - rect.top) * scaleY))
        }
    }

    const handleCropMouseDown = (e) => {
        if (!isCropping) return
        const coords = getCropCoords(e)
        setCropStart(coords)
        setCropEnd(coords)
        setIsCropDragging(true)
    }

    const handleCropMouseMove = (e) => {
        if (!isCropping || !isCropDragging) return
        const coords = getCropCoords(e)
        setCropEnd(coords)
    }

    const handleCropMouseUp = () => {
        setIsCropDragging(false)
    }

    const applyCrop = () => {
        const sourceImage = uploadedImage
        if (!sourceImage || !cropStart || !cropEnd) return

        const x = Math.min(cropStart.x, cropEnd.x)
        const y = Math.min(cropStart.y, cropEnd.y)
        const width = Math.abs(cropEnd.x - cropStart.x)
        const height = Math.abs(cropEnd.y - cropStart.y)

        if (width < 20 || height < 20) {
            alert('Area crop terlalu kecil. Pilih area yang lebih besar.')
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
            setCropStart(null)
            setCropEnd(null)
        }
        croppedImg.src = cropCanvas.toDataURL()
    }

    const cancelCrop = () => {
        setIsCropping(false)
        setCropStart(null)
        setCropEnd(null)
    }

    // Canvas coordinate helpers
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

    // Text manipulation handlers
    const handleCanvasMouseDown = (e) => {
        if (!imageLoaded || watermarkType !== 'single' || isCropping) return
        e.preventDefault()

        const coords = getCanvasCoords(e)
        const distance = Math.sqrt(
            Math.pow(coords.x - textPosition.x, 2) +
            Math.pow(coords.y - textPosition.y, 2)
        )

        // Check if clicking rotation handle (above text)
        if (distance > fontSize * textScale * 1.5 && coords.y < textPosition.y - fontSize * textScale) {
            setIsRotating(true)
            setDragStart(coords)
        }
        // Check if clicking corner (resize)
        else if (distance > fontSize * textScale * 0.8) {
            setIsResizing(true)
            setDragStart({ ...coords, initialScale: textScale, initialDistance: distance })
        }
        // Otherwise drag
        else {
            setIsDragging(true)
            setDragStart(coords)
        }

        setShowTextBorder(true)
    }

    const handleCanvasMouseMove = (e) => {
        if (watermarkType !== 'single') return

        const coords = getCanvasCoords(e)

        if (isDragging) {
            e.preventDefault()
            setTextPosition(prev => ({
                x: prev.x + (coords.x - dragStart.x),
                y: prev.y + (coords.y - dragStart.y)
            }))
            setDragStart(coords)
        } else if (isResizing && dragStart.initialDistance) {
            e.preventDefault()
            const currentDistance = Math.sqrt(
                Math.pow(coords.x - textPosition.x, 2) +
                Math.pow(coords.y - textPosition.y, 2)
            )
            const scale = (currentDistance / dragStart.initialDistance) * dragStart.initialScale
            setTextScale(Math.max(0.3, Math.min(3, scale)))
        } else if (isRotating) {
            e.preventDefault()
            const angle = Math.atan2(coords.y - textPosition.y, coords.x - textPosition.x) * 180 / Math.PI + 90
            setRotation(Math.round(angle))
        }
    }

    const handleCanvasMouseUp = () => {
        setIsDragging(false)
        setIsResizing(false)
        setIsRotating(false)
    }

    const handleCanvasMouseEnter = () => {
        if (watermarkType === 'single' && imageLoaded) {
            setShowTextBorder(true)
        }
    }

    const handleCanvasMouseLeave = () => {
        setShowTextBorder(false)
        handleCanvasMouseUp()
    }

    // Download functions
    const getDownloadFileName = (ext) => {
        const baseName = originalFileName || 'ktp'
        return `${baseName}-watermark by amaninktp.qreatip.com.${ext}`
    }

    const handleDownloadPNG = () => {
        const canvas = canvasRef.current
        if (!canvas || !imageLoaded) return

        // Temporarily hide border
        const prevShowBorder = showTextBorder
        setShowTextBorder(false)

        setTimeout(() => {
            const link = document.createElement('a')
            link.download = getDownloadFileName('png')
            link.href = canvas.toDataURL('image/png')
            link.click()
            setShowTextBorder(prevShowBorder)
        }, 50)
    }

    const handleDownloadPDF = async () => {
        const canvas = canvasRef.current
        if (!canvas || !imageLoaded) return

        setShowTextBorder(false)

        setTimeout(async () => {
            const { jsPDF } = await import('jspdf')

            const imgData = canvas.toDataURL('image/png')
            const imgWidth = canvas.width
            const imgHeight = canvas.height

            const pdfWidth = imgWidth * 0.264583
            const pdfHeight = imgHeight * 0.264583

            const pdf = new jsPDF({
                orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            })

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save(getDownloadFileName('pdf'))
        }, 50)
    }

    const handleReset = () => {
        setUploadedImage(null)
        setCroppedImage(null)
        setOriginalFileName('')
        setImageLoaded(false)
        setWatermarkText(getDefaultWatermarkText())
        setFontSize(30)
        setFontFamily('Arial')
        setRotation(-15)
        setOpacity(0.3)
        setColor('#080808')
        setWatermarkType('tiled')
        setTextScale(1)
        setIsCropping(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    // Add current date to watermark text
    const handleAddDate = () => {
        const today = new Date()
        const day = today.getDate().toString().padStart(2, '0')
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const year = today.getFullYear()
        const dateStr = `${day}/${month}/${year}`

        setWatermarkText(prev => prev ? `${prev}\n${dateStr}` : dateStr)
    }

    // Draw crop overlay
    useEffect(() => {
        if (!isCropping || !uploadedImage) return

        const canvas = cropCanvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        canvas.width = uploadedImage.width
        canvas.height = uploadedImage.height

        // Draw original image
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(uploadedImage, 0, 0)

        // Draw dark overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Clear and highlight crop area
        if (cropStart && cropEnd) {
            const x = Math.min(cropStart.x, cropEnd.x)
            const y = Math.min(cropStart.y, cropEnd.y)
            const width = Math.abs(cropEnd.x - cropStart.x)
            const height = Math.abs(cropEnd.y - cropStart.y)

            // Restore original image in crop area
            ctx.clearRect(x, y, width, height)
            ctx.drawImage(uploadedImage, x, y, width, height, x, y, width, height)

            // Draw border around crop area
            ctx.strokeStyle = '#A8C5F0'
            ctx.lineWidth = 3
            ctx.setLineDash([])
            ctx.strokeRect(x, y, width, height)

            // Draw corner handles
            const handleSize = 12
            ctx.fillStyle = '#A8C5F0'

            // Top-left
            ctx.fillRect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize)
            // Top-right
            ctx.fillRect(x + width - handleSize / 2, y - handleSize / 2, handleSize, handleSize)
            // Bottom-left
            ctx.fillRect(x - handleSize / 2, y + height - handleSize / 2, handleSize, handleSize)
            // Bottom-right
            ctx.fillRect(x + width - handleSize / 2, y + height - handleSize / 2, handleSize, handleSize)

            // Draw grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x + width / 3, y)
            ctx.lineTo(x + width / 3, y + height)
            ctx.moveTo(x + 2 * width / 3, y)
            ctx.lineTo(x + 2 * width / 3, y + height)
            ctx.moveTo(x, y + height / 3)
            ctx.lineTo(x + width, y + height / 3)
            ctx.moveTo(x, y + 2 * height / 3)
            ctx.lineTo(x + width, y + 2 * height / 3)
            ctx.stroke()

            // Draw size indicator
            ctx.fillStyle = 'rgba(168, 197, 240, 0.9)'
            ctx.font = '14px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(`${Math.round(width)} × ${Math.round(height)}`, x + width / 2, y + height + 20)
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
                        Lindungi foto KTP dengan watermark. 100% di browser, data aman.
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
                                    {imageLoaded ? originalFileName : 'Pilih / Drag / Paste gambar'}
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
                                <button className={`${styles.actionBtn} ${styles.cropActionBtn}`} onClick={startCrop}>
                                    ✂️ Crop Gambar
                                </button>
                            )}
                        </div>

                        {/* Watermark Type */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>📝 Jenis Watermark</h3>
                            <div className={styles.typeButtons}>
                                <button
                                    className={`${styles.typeBtn} ${watermarkType === 'tiled' ? styles.active : ''}`}
                                    onClick={() => setWatermarkType('tiled')}
                                >
                                    🔲 Menyeluruh
                                </button>
                                <button
                                    className={`${styles.typeBtn} ${watermarkType === 'single' ? styles.active : ''}`}
                                    onClick={() => setWatermarkType('single')}
                                >
                                    📍 Satu Teks
                                </button>
                            </div>
                            {watermarkType === 'single' && imageLoaded && (
                                <p className={styles.hint}>💡 Drag teks, tarik sudut untuk resize, tarik atas untuk rotate</p>
                            )}
                        </div>

                        {/* Custom Text */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>✏️ Teks Watermark</h3>
                            <textarea
                                className={styles.textInput}
                                value={watermarkText}
                                onChange={(e) => setWatermarkText(e.target.value)}
                                placeholder="Contoh: Hanya untuk verifikasi Shopee"
                                rows={3}
                            />
                            <button className={styles.addDateBtn} onClick={handleAddDate}>
                                📅 Tambah Tanggal
                            </button>
                        </div>

                        {/* Font */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>🔤 Font</h3>
                            <select
                                className={styles.selectInput}
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
                                    className={styles.slider}
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
                                    className={styles.slider}
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
                                    className={styles.slider}
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
                                    className={`${styles.downloadBtn} ${styles.pngBtn}`}
                                    onClick={handleDownloadPNG}
                                    disabled={!imageLoaded}
                                >
                                    📷 PNG
                                </button>
                                <button
                                    className={`${styles.downloadBtn} ${styles.pdfBtn}`}
                                    onClick={handleDownloadPDF}
                                    disabled={!imageLoaded}
                                >
                                    📄 PDF
                                </button>
                            </div>
                            <button
                                className={styles.resetBtn}
                                onClick={handleReset}
                            >
                                🔄 Reset Semua
                            </button>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div
                        className={styles.preview}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        ref={containerRef}
                    >
                        <h3 className={styles.sectionTitle}>👁️ Preview Hasil</h3>

                        {isCropping && uploadedImage && (
                            <div className={styles.cropContainer}>
                                <p className={styles.cropInstruction}>Drag untuk memilih area crop</p>
                                <canvas
                                    ref={cropCanvasRef}
                                    className={styles.cropCanvas}
                                    onMouseDown={handleCropMouseDown}
                                    onMouseMove={handleCropMouseMove}
                                    onMouseUp={handleCropMouseUp}
                                    onMouseLeave={handleCropMouseUp}
                                    onTouchStart={handleCropMouseDown}
                                    onTouchMove={handleCropMouseMove}
                                    onTouchEnd={handleCropMouseUp}
                                />
                                <div className={styles.cropActions}>
                                    <button className={`${styles.downloadBtn} ${styles.pngBtn}`} onClick={applyCrop}>
                                        ✅ Apply Crop
                                    </button>
                                    <button className={styles.resetBtn} onClick={cancelCrop}>
                                        ❌ Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {!isCropping && (
                            <div
                                className={styles.canvasContainer}
                                onMouseDown={handleCanvasMouseDown}
                                onMouseMove={handleCanvasMouseMove}
                                onMouseUp={handleCanvasMouseUp}
                                onMouseEnter={handleCanvasMouseEnter}
                                onMouseLeave={handleCanvasMouseLeave}
                                onTouchStart={handleCanvasMouseDown}
                                onTouchMove={handleCanvasMouseMove}
                                onTouchEnd={handleCanvasMouseUp}
                            >
                                <canvas
                                    ref={canvasRef}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                    className={styles.mainCanvas}
                                />
                                {!imageLoaded && (
                                    <div className={styles.placeholder}>
                                        <span className={styles.placeholderIcon}>🖼️</span>
                                        <p>Drag & Drop gambar di sini</p>
                                        <p className={styles.placeholderHint}>atau klik "Pilih" atau Ctrl+V untuk paste</p>
                                    </div>
                                )}
                            </div>
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
