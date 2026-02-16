import styles from "./Mockups.module.css"

/*
MOCKUP ENGINE V3 – BROWSER
Supports:
- Chrome style
- Safari style
- Edge style
- Light / Dark mode
- Custom URL
*/

import { BROWSERS } from '@/app/mockup-generator/registry'

export default function BrowserMockup({
    browserType = "chrome",
    image,
    scale = 0.8,
    url = "yourdomain.com",
    fitMode = "cover",
    theme = "light",
    imagePos
}) {
    const b = BROWSERS[browserType]
    if (!b) return null

    const width = (b.w || 1440) * scale
    const height = (b.h || 900) * scale
    const headerHeight = b.headerHeight * scale

    const isDark = theme === "dark" || b.theme === "dark"

    return (
        <div
            className={`${styles.browserFrame} ${isDark ? styles.darkBrowser : ""}`}
            style={{
                width,
                borderRadius: b.radius
            }}
        >
            {/* Header */}
            <div
                className={styles.browserHeader}
                style={{ height: headerHeight }}
            >
                {b.style === 'safari' ? (
                    <div className={styles.trafficLights}>
                        <div className={`${styles.trafficDot} ${styles.close}`} />
                        <div className={`${styles.trafficDot} ${styles.min}`} />
                        <div className={`${styles.trafficDot} ${styles.max}`} />
                    </div>
                ) : (
                    // Placeholder for spacing if needed on left
                    <div style={{ width: 60 }} />
                )}

                <div className={styles.addressBar}>
                    {url}
                </div>

                {b.style !== 'safari' && (
                    <div className={styles.winControls}>
                        <div className={`${styles.winBtn} ${styles.winMin}`} />
                        <div className={`${styles.winBtn} ${styles.winMax}`} />
                        <div className={`${styles.winClose} ${styles.winClose}`} />
                    </div>
                )}
            </div>

            {/* Screen */}
            <div
                className={styles.browserScreen}
                style={{
                    height: height - headerHeight
                }}
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
        </div>
    )
}
