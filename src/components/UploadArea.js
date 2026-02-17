
import { useRef } from 'react'
import { Upload, Lock } from 'lucide-react'
import styles from './UploadArea.module.css'

export default function UploadArea({
    onFileSelect,
    accept,
    multiple = false,
    title = "Upload File PDF & Gambar",
    subtitle = "Tarik file atau klik untuk memilih",
    formats = ['PDF', 'JPG', 'PNG'],
    icon: Icon = Upload
}) {
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleChange = (e) => {
        if (onFileSelect) {
            onFileSelect(e)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Emulate event object structure for consistency
            handleChange({ target: { files: e.dataTransfer.files } })
        }
    }

    return (
        <div 
            className={styles.uploadArea} 
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className={styles.iconWrapper}>
                <Icon size={32} />
            </div>
            
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
            
            <div className={styles.formats}>
                {formats.map((format, index) => (
                    <span key={index} className={styles.formatBadge}>{format}</span>
                ))}
            </div>

            <div className={styles.secureBadge}>
                <Lock size={14} />
                100% Client-Side
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleChange} 
                accept={accept} 
                multiple={multiple} 
                hidden 
            />
        </div>
    )
}
