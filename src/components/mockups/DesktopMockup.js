import styles from './Mockups.module.css'

export default function DesktopMockup({ image, fitMode, imageScale = 1, imageOffset = { x: 0, y: 0 }, isPanning, onMouseDown, onMouseMove, onMouseUp, device }) {

    const isImac = device.deviceType === 'imac'

    // Dimensions
    const width = 800
    const height = 500 // Screen height

    if (isImac) {
        return (
            <div className={`${styles.wrapper} ${styles.imacWrapper}`} style={{ width: width }}>
                <div className={styles.imacScreen} style={{ width: '100%' }}>
                    <div
                        className={styles.screen}
                        style={{
                            width: '100%',
                            height: height,
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px'
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
                    {/* Chin */}
                    <div className={styles.imacChin}>
                        {/* Apple Logo placeholder? or just empty */}
                    </div>
                </div>
                {/* Stand */}
                <div className={styles.imacStand}></div>
            </div>
        )
    } else {
        // Windows Laptop (Generic)
        const laptopWidth = 700
        const laptopHeight = 450

        return (
            <div className={styles.laptopWrapper} style={{ width: laptopWidth }}>
                <div className={styles.laptopLid} style={{ width: '100%', borderRadius: '8px 8px 0 0', padding: '10px 10px 10px 10px' }}>
                    <div
                        className={styles.laptopScreen}
                        style={{
                            height: laptopHeight,
                            width: '100%',
                            borderRadius: '4px'
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
                    {/* Brand text bottom bezel */}
                    <div style={{ height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '10px', fontWeight: 'bold' }}>
                        DELL
                    </div>
                </div>
                <div className={styles.winLaptopBase}></div>
            </div>
        )
    }
}
