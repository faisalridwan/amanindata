import styles from './Mockups.module.css'

export default function AndroidMockup({ image, fitMode, imageScale = 1, imageOffset = { x: 0, y: 0 }, isPanning, onMouseDown, onMouseMove, onMouseUp, device }) {
    // Pixel 8 Pro: 20:9 aspect ratio approx
    // S24 Ultra: 19.5:9 aspect ratio approx
    const width = 393
    const height = 852 // Using similar dimensions to iPhone for consistency, or adjust per device

    const frameClass = device.deviceType === 's24ultra' ? styles.galaxyFrame : styles.pixelFrame
    const cornerRadius = device.deviceType === 's24ultra' ? '4px' : '28px' // Match CSS

    return (
        <div
            className={`${styles.wrapper} ${frameClass}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: device?.frameColor || '#333'
            }}
        >
            {/* Punch Hole Camera */}
            <div className={styles.punchHole} />

            {/* Reflection Overlay */}
            <div className={styles.phoneReflection} style={{ borderRadius: cornerRadius }} />

            {/* Screen Content */}
            <div
                className={styles.screen}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: device.deviceType === 's24ultra' ? '0px' : '20px' // Inner screen radius
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
