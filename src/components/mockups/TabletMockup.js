import styles from './Mockups.module.css'

export default function TabletMockup({ image, fitMode, imageScale = 1, imageOffset = { x: 0, y: 0 }, isPanning, onMouseDown, onMouseMove, onMouseUp, device }) {
    // iPad Pro 11" 
    const width = 590
    const height = 820

    return (
        <div
            className={`${styles.wrapper} ${styles.ipadFrame}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: device?.frameColor || '#282828'
            }}
        >
            {/* Gloss Reflection */}
            <div className={styles.phoneReflection} style={{ borderRadius: '18px' }} />

            {/* Screen Content */}
            <div
                className={styles.screen}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px'
                }}
            >
                {image && (
                    <div
                        className={styles.screenContent}
                        style={{
                            backgroundImage: `url(${image.src})`,
                            backgroundSize: fitMode === 'cover' ? 'cover' : 'contain',
                            backgroundPosition: 'top center',
                            transform: `scale(${imageScale}) translate(${imageOffset.x}px, ${imageOffset.y}px)`,
                            cursor: isPanning ? 'grabbing' : 'grab',
                        }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                    />
                )}
            </div>
        </div>
    )
}
