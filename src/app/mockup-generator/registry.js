
import { Smartphone, Tablet, Monitor, Layout, Watch, Laptop } from 'lucide-react'

// --- Phone Registry ---
export const PHONES = {
    iphoneSE: {
        id: 'iphoneSE',
        name: 'iPhone SE',
        w: 375, h: 667,
        frameRadius: 36,
        screenRadius: 2,
        bezel: 16,
        material: "aluminium",
        notch: false,
        homeButton: true,
        type: 'phone',
        category: 'phone'
    },
    iphoneXR: {
        id: 'iphoneXR',
        name: 'iPhone XR',
        w: 414, h: 896,
        frameRadius: 48,
        screenRadius: 40,
        bezel: 14,
        notch: true,
        type: 'phone',
        category: 'phone'
    },
    iphone12Pro: {
        id: 'iphone12Pro',
        name: 'iPhone 12 Pro',
        w: 390, h: 844,
        frameRadius: 52,
        screenRadius: 44,
        bezel: 12,
        flatEdges: true,
        notch: true,
        type: 'phone',
        category: 'phone'
    },
    iphone14ProMax: {
        id: 'iphone14ProMax',
        name: 'iPhone 14 Pro Max',
        w: 430, h: 932,
        frameRadius: 56,
        screenRadius: 46,
        bezel: 12,
        flatEdges: true,
        dynamicIsland: true,
        material: "titanium",
        type: 'phone',
        category: 'phone'
    },
    iphone15Pro: { // Added based on prompt request
        id: 'iphone15Pro',
        name: 'iPhone 15 Pro',
        w: 393, h: 852,
        frameRadius: 56,
        screenRadius: 46,
        bezel: 10,
        flatEdges: true,
        dynamicIsland: true,
        material: "titanium",
        type: 'phone',
        category: 'phone'
    },
    pixel7: {
        id: 'pixel7',
        name: 'Google Pixel 7',
        w: 412, h: 915,
        frameRadius: 28,
        screenRadius: 20,
        bezel: 10,
        punch: true,
        type: 'phone',
        category: 'phone'
    },
    pixel8Pro: { // Added based on prompt
        id: 'pixel8Pro',
        name: 'Pixel 8 Pro',
        w: 1344 / 3, // ~448 simulated logic pt
        h: 2992 / 3, // ~997
        frameRadius: 32,
        screenRadius: 24,
        bezel: 10,
        punch: true,
        material: "aluminium",
        type: 'phone',
        category: 'phone'
    },
    galaxyS20Ultra: {
        id: 'galaxyS20Ultra',
        name: 'Galaxy S20 Ultra',
        w: 412, h: 915,
        frameRadius: 8,
        screenRadius: 4,
        bezel: 6,
        punch: true,
        curvedOLED: true,
        type: 'phone',
        category: 'phone'
    },
    galaxyS24Ultra: { // Added based on prompt
        id: 'galaxyS24Ultra',
        name: 'Galaxy S24 Ultra',
        w: 412, h: 915, // Approx pt
        frameRadius: 4,
        screenRadius: 0,
        bezel: 4,
        punch: true,
        flatEdges: true,
        material: "titanium",
        type: 'phone',
        category: 'phone'
    },
    galaxyZFold5: {
        id: 'galaxyZFold5',
        name: 'Galaxy Z Fold 5',
        w: 768, h: 1024, // Unfolded
        frameRadius: 24,
        screenRadius: 18,
        bezel: 14,
        fold: true,
        punch: true,
        type: 'phone',
        category: 'phone'
    },
    surfaceDuo: {
        id: 'surfaceDuo',
        name: 'Surface Duo',
        w: 540, h: 720,
        frameRadius: 16,
        screenRadius: 12,
        bezel: 12,
        dual: true,
        type: 'phone',
        category: 'phone'
    }
}

// --- Tablet Registry ---
export const TABLETS = {
    ipadMini: {
        id: 'ipadMini',
        name: 'iPad Mini',
        w: 744, h: 1133,
        r: 24, bezel: 20,
        type: 'tablet',
        category: 'tablet'
    },
    ipadAir: {
        id: 'ipadAir',
        name: 'iPad Air',
        w: 820, h: 1180,
        r: 24, bezel: 22,
        type: 'tablet',
        category: 'tablet'
    },
    ipadPro: {
        id: 'ipadPro',
        name: 'iPad Pro',
        w: 1024, h: 1366,
        r: 28, bezel: 24,
        type: 'tablet',
        category: 'tablet'
    },
    surfacePro7: {
        id: 'surfacePro7',
        name: 'Surface Pro 7',
        w: 912, h: 1368,
        r: 8, bezel: 18,
        type: 'tablet',
        category: 'tablet'
    }
}

// --- Laptop Registry ---
// --- Laptop Registry ---
export const LAPTOPS = {
    macbookAir: {
        id: 'macbookAir',
        name: 'MacBook Air',
        w: 1280, h: 832,
        baseCurve: true,
        type: 'laptop',
        category: 'laptop'
    },
    macbookPro14: {
        id: 'macbookPro14',
        name: 'MacBook Pro 14"',
        w: 1512, h: 982,
        notch: true,
        type: 'laptop',
        category: 'laptop'
    },
    macbookPro16: {
        id: 'macbookPro16',
        name: 'MacBook Pro 16"',
        w: 1728, h: 1117,
        notch: true,
        type: 'laptop',
        category: 'laptop'
    }
}

// --- Desktop Registry ---
export const DESKTOPS = {
    imac24: {
        id: 'imac24',
        name: 'iMac 24"',
        w: 1920, h: 1080, // Simplification
        chin: true,
        stand: true,
        type: 'desktop',
        category: 'desktop'
    }
}

// --- Browser Registry ---
export const BROWSERS = {
    safariLight: {
        id: 'safariLight',
        name: 'Safari (Light)',
        w: 1440, h: 900,
        headerHeight: 60,
        radius: 12,
        theme: "light",
        style: "safari",
        type: 'browser',
        category: 'browser'
    },
    safariDark: {
        id: 'safariDark',
        name: 'Safari (Dark)',
        w: 1440, h: 900,
        headerHeight: 60,
        radius: 12,
        theme: "dark",
        style: "safari",
        type: 'browser',
        category: 'browser'
    },
    chromeLight: {
        id: 'chromeLight',
        name: 'Chrome (Light)',
        w: 1440, h: 900,
        headerHeight: 64,
        radius: 12,
        theme: "light",
        style: "chrome",
        type: 'browser',
        category: 'browser'
    },
    chromeDark: {
        id: 'chromeDark',
        name: 'Chrome (Dark)',
        w: 1440, h: 900,
        headerHeight: 64,
        radius: 12,
        theme: "dark",
        style: "chrome",
        type: 'browser',
        category: 'browser'
    }
}

export const CATEGORIES = [
    { id: 'phone', label: 'Phone', icon: Smartphone },
    { id: 'tablet', label: 'Tablet', icon: Tablet },
    { id: 'laptop', label: 'Laptop', icon: Laptop },
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'browser', label: 'Browser', icon: Layout },
]

export const ALL_DEVICES = {
    ...PHONES,
    ...TABLETS,
    ...LAPTOPS,
    ...DESKTOPS,
    ...BROWSERS
}
