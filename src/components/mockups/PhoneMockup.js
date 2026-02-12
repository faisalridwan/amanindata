import styles from './Mockups.module.css'

export default function PhoneMockup({ image, scale = 1, fitMode, imageScale = 1, imageOffset = { x: 0, y: 0 }, isPanning, onMouseDown, onMouseMove, onMouseUp, device }) {
    // Dynamic dimensions based on device type in parent, but here we can just use 
    // basic relative sizing or fixed pixels. 
    // Approach: The container is sized by the parent or fixed.
    // Let's use fixed dimensions from our constants for the "inner" part and scale the whole thing.

    // iPhone 15 Pro logical res: 393 x 852.
    // Frame adds padding.
    const width = 393
    const height = 852

    return (
        <div
            className={`${styles.wrapper} ${styles.phoneFrame} ${device?.color === 'titanium' ? styles.titanium : ''}`}
            style={{
                width: `${width}px`,
                // Height auto or fixed? Fixed allows dynamic island to position correctly.
                height: `${height}px`,
                backgroundColor: device?.frameColor || '#1c1c1e'
            }}
        >
            {/* Dynamic Island */}
            <div className={styles.dynamicIsland}>
                <div className={styles.cameraDot} />
            </div>

            {/* Reflection Overlay */}
            <div className={styles.phoneReflection} />

            {/* Screen Content */}
            <div
                className={styles.screen}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '46px'
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
