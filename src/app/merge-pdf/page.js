'use client'

import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileText, Upload, X, ArrowUp, ArrowDown, Download, Check, AlertCircle, Trash2, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function MergePdfPage() {
    const [files, setFiles] = useState([])
    const [isMerging, setIsMerging] = useState(false)
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf')
        if (newFiles.length > 0) {
            setFiles(prev => [...prev, ...newFiles])
            setMergedPdfUrl(null) // Reset previous merge
            setError(null)
        } else {
            setError('Mohon upload file PDF saja.')
        }
        // Reset input value to allow re-uploading same file if needed (though unlikely for merge)
        e.target.value = ''
    }

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
        setMergedPdfUrl(null)
    }

    const moveFile = (index, direction) => {
        const newFiles = [...files]
        if (direction === 'up' && index > 0) {
            [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
        } else if (direction === 'down' && index < newFiles.length - 1) {
            [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
        }
        setFiles(newFiles)
        setMergedPdfUrl(null)
    }

    const mergePDFs = async () => {
        if (files.length < 2) {
            setError('Minimal 2 file PDF untuk digabungkan.')
            return
        }

        setIsMerging(true)
        setError(null)

        try {
            const mergedPdf = await PDFDocument.create()

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
                copiedPages.forEach((page) => mergedPdf.addPage(page))
            }

            const pdfBytes = await mergedPdf.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            setMergedPdfUrl(url)
        } catch (err) {
            console.error(err)
            setError('Gagal menggabungkan PDF. Pastikan file tidak rusak atau terproteksi password.')
        } finally {
            setIsMerging(false)
        }
    }

    return (
        <>
            <Navbar />
            <main className="container">
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Gabung <span>PDF</span></h1>
                    <p className={styles.heroSubtitle}>Satukan banyak file PDF menjadi satu dokumen dengan urutan yang Anda inginkan.</p>
                </div>

                <div className={styles.workspace}>
                    {/* Upload Area */}
                    <div
                        className={styles.uploadArea}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className={styles.secureBadge}>
                            <Check size={12} /> 100% Client-Side
                        </div>
                        <div className={styles.iconCircle}>
                            <Upload size={32} />
                        </div>
                        <div className={styles.uploadText}>
                            <h3>Klik untuk Upload PDF</h3>
                            <p>atau drag & drop file di sini</p>
                        </div>
                        <input
                            type="file"
                            accept="application/pdf"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            hidden
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{ color: 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    {/* File List */}
                    {files.length > 0 && (
                        <div className={styles.fileList}>
                            {files.map((file, index) => (
                                <div key={index} className={styles.fileItem}>
                                    <div className={styles.fileInfo}>
                                        <FileText size={20} className={styles.fileIcon} />
                                        <span className={styles.fileName}>
                                            {index + 1}. {file.name}
                                        </span>
                                        <span className={styles.fileSize}>
                                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                        </span>
                                    </div>
                                    <div className={styles.fileActions}>
                                        <button
                                            className={`${styles.actionBtn} ${styles.moveBtn}`}
                                            onClick={() => moveFile(index, 'up')}
                                            disabled={index === 0}
                                            title="Move Up"
                                        >
                                            <ArrowUp size={16} />
                                        </button>
                                        <button
                                            className={`${styles.actionBtn} ${styles.moveBtn}`}
                                            onClick={() => moveFile(index, 'down')}
                                            disabled={index === files.length - 1}
                                            title="Move Down"
                                        >
                                            <ArrowDown size={16} />
                                        </button>
                                        <button
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            onClick={() => removeFile(index)}
                                            title="Remove"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action Bar */}
                    {files.length > 0 && (
                        <div className={styles.actionBar}>
                            <button className={styles.addMoreBtn} onClick={() => fileInputRef.current?.click()}>
                                <Plus size={18} /> Tambah File Lagi
                            </button>

                            {mergedPdfUrl ? (
                                <a
                                    href={mergedPdfUrl}
                                    download="merged-document.pdf"
                                    className={`${styles.mergeBtn} ${styles.downloadBtn}`}
                                    style={{ background: 'var(--success-color)' }}
                                >
                                    <Download size={18} /> Download PDF
                                </a>
                            ) : (
                                <button
                                    className={styles.mergeBtn}
                                    onClick={mergePDFs}
                                    disabled={files.length < 2 || isMerging}
                                >
                                    {isMerging ? 'Memproses...' : 'Gabungkan PDF'}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Features / Trust (Optional/Reused) */}
                <section className={styles.trust} style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🔒 100% Client-Side</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>⚡ Proses Kilat</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🚫 Tanpa Upload Server</div>
                </section>
            </main>
            <Footer />
        </>
    )
}
