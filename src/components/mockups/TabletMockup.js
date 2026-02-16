import styles from "./Mockups.module.css"

import { TABLETS } from '@/app/mockup-generator/registry'

export default function TabletMockup({
    deviceType = "ipadPro",
    image,
    scale = 0.5,
    fitMode = "cover",
    imagePos
}) {
    const d = TABLETS[deviceType]
    const width = d.w * scale
    const height = d.h * scale

    return (
        <div
            className={styles.tabletFrame}
            style={{
                width,
                height,
                borderRadius: d.r * scale,
                padding: d.bezel * scale
            }}
        >
            <div className={styles.tabletCamera} />
            <div className={styles.screen}>
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
            <div className={styles.glassReflection} />
        </div>
    )
}
