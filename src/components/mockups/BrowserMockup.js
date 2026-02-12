import styles from './Mockups.module.css'

export default function BrowserMockup({ image, scale = 1, fitMode, imageScale = 1, imageOffset = { x: 0, y: 0 }, isPanning, onMouseDown, onMouseMove, onMouseUp }) {
    const width = 800
    const height = 500

    return (
        <div
            className={`${styles.wrapper} ${styles.browserFrame}`}
            style={{ width: width, height: height }}
        >
            <div className={styles.browserHeader}>
                <div className={styles.trafficLights}>
                    <div className={`${styles.trafficDot} ${styles.close}`} />
                    <div className={`${styles.trafficDot} ${styles.min}`} />
                    <div className={`${styles.trafficDot} ${styles.max}`} />
                </div>
                <div className={styles.addressBar}>amaninktp.com</div>
            </div>

            <div className={styles.screen} style={{ flex: 1 }}>
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
