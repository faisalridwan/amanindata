import styles from "./Mockups.module.css"

import { LAPTOPS } from '@/app/mockup-generator/registry'

export default function LaptopMockup({
    deviceType = "macbookPro16",
    image,
    scale = 0.7,
    fitMode = "cover",
    imagePos
}) {
    const d = LAPTOPS[deviceType] || LAPTOPS.macbookPro16
    const width = d.w * scale
    const height = d.h * scale

    return (
        <div className={styles.laptopWrapper} style={{ width: `${width}px` }}>
            <div className={styles.laptopLid}>
                {d.notch && <div className={styles.laptopNotch} />}
                <div
                    className={styles.laptopScreen}
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
            </div>
            <div className={styles.laptopBase}></div>
        </div>
    )
}
