import styles from "./Mockups.module.css"

/*
MOCKUP ENGINE V3 – PHONE
Fully parametric physical device renderer
Accurate ratios, notch/island logic, curved OLED simulation,
fold support, dual screen, material shading.
*/

import { PHONES as DEVICES } from '@/app/mockup-generator/registry'

export default function PhoneMockup({
    deviceType = "iphone14ProMax",
    image,
    scale = 0.55,
    fitMode = "cover",
    imagePos
}) {
    const d = DEVICES[deviceType]
    if (!d) return null

    const width = d.w * scale
    const height = d.h * scale
    const frameRadius = d.frameRadius * scale
    const screenRadius = d.screenRadius * scale
    const bezel = d.bezel * scale

    const notchW = width * 0.52
    const notchH = height * 0.045
    const islandW = width * 0.33
    const islandH = height * 0.04
    const punchSize = width * 0.035

    return (
        <div
            className={`${styles.phoneFrame} ${styles[d.material] || ""}`}
            style={{
                width,
                height,
                borderRadius: frameRadius,
                padding: bezel
            }}
        >
            {d.dynamicIsland && (
                <div
                    className={styles.dynamicIsland}
                    style={{ width: islandW, height: islandH }}
                />
            )}

            {d.notch && (
                <div
                    className={styles.notch}
                    style={{ width: notchW, height: notchH }}
                />
            )}

            {d.punch && (
                <div
                    className={styles.punchHole}
                    style={{ width: punchSize, height: punchSize }}
                />
            )}

            {d.homeButton && <div className={styles.homeButton} />}

            {/* Physical Buttons (Only on flat edge/pro devices usually) */}
            {d.flatEdges && (
                <>
                    <div className={`${styles.button} ${styles.volumeUp}`} />
                    <div className={`${styles.button} ${styles.volumeDown}`} />
                    <div className={`${styles.button} ${styles.powerBtn}`} />
                </>
            )}

            <div
                className={`${styles.screen} ${d.curvedOLED ? styles.curvedOLED : ""}`}
                style={{ borderRadius: screenRadius }}
            >
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

            {d.fold && <div className={styles.foldHinge} />}
            {d.dual && <div className={styles.dualGap} />}

            <div className={styles.glassReflection} />
        </div>
    )
}
