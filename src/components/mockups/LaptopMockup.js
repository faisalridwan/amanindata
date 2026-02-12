import styles from './Mockups.module.css'

export default function LaptopMockup({ image, scale = 1, fitMode, imageScale = 1, imageOffset = { x: 0, y: 0 }, isPanning, onMouseDown, onMouseMove, onMouseUp }) {
    // MacBook Pro 16 logical res ~ 
    // Let's use a standard aspect ratio container.
    const width = 600
    const height = 375 // 16:10 roughly

    return (
        <div className={styles.laptopWrapper} style={{ width: width }}>
            <div className={styles.laptopLid} style={{ width: '100%' }}>
                <div className={styles.laptopNotch} />
                <div
                    className={styles.laptopScreen}
                    style={{
                        height: height,
                        width: '100%'
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
            <div className={styles.laptopBase}>
                <div className={styles.laptopIndent} />
            </div>
        </div>
    )
}
