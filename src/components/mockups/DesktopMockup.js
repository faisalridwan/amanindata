import styles from "./Mockups.module.css"

import { DESKTOPS } from '@/app/mockup-generator/registry'

export default function DesktopMockup({
    deviceType = "imac24",
    image,
    scale = 0.6,
    fitMode = "cover",
    imagePos
}) {
    const d = DESKTOPS[deviceType] || DESKTOPS.imac24
    const width = d.w * scale
    const height = d.h * scale

    return (
        <div className={styles.desktopWrapper} style={{ width: `${width}px` }}>
            <div
                className={styles.desktopScreen}
                style={{ height }}
            >
                <div className={styles.glassReflection} />
                {image && (
                    <div
                        className={styles.screenContent}
                        style={{
                            backgroundImage: `url(${image.src})`,
                            backgroundSize: fitMode,
                            backgroundPosition: `${imagePos?.x || 50}% ${imagePos?.y || 50}%`
                        }}
                    />
                )}
            </div>
            <div className={styles.desktopStand}></div>
        </div>
    )
}
