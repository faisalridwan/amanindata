const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../public/images/guide');
const TEMP_IMAGE_PATH = path.join(__dirname, '../public/temp_upload.png');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Create a simple dummy image for upload testing if not exists
function createDummyImage() {
    // We'll use a screenshot of a small area to create a valid PNG file
    // This is handled inside the browser session below
}

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: { width: 1280, height: 800 }
    });
    const page = await browser.newPage();

    console.log('Starting screenshot capture...');

    try {
        // --- 1. Watermark Guide Screenshots ---
        console.log('Capturing Watermark guide...');

        // Step 1: Home Page (Initial)
        await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-1.png') });
        console.log('Captured watermark-1.png');

        // Prepare dummy image for upload
        // Taking a screenshot of the hero section to use as "document"
        const heroSection = await page.$('main');
        await heroSection.screenshot({ path: TEMP_IMAGE_PATH });

        // Step 2 & 3: Upload & Crop (Mocking upload)
        // Find upload input by text content using pseudo-selector
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('div::-p-text(Pilih / Drag / Paste)')
        ]);
        await fileChooser.accept([TEMP_IMAGE_PATH]);

        // Wait for image to load/preview
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-2.png') });
        console.log('Captured watermark-2.png');

        // Step 3: Crop (Assuming crop view appears or we just take screenshot of loaded image)
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-3.png') });
        console.log('Captured watermark-3.png (Crop view proxy)');

        // Step 4: Watermark Mode
        // Scroll to controls
        await page.evaluate(() => window.scrollBy(0, 500));
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-4.png') });
        console.log('Captured watermark-4.png');

        // Step 5: Text Input
        await page.type('textarea', 'RAHASIA NEGARA');
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-5.png') });
        console.log('Captured watermark-5.png');

        // Step 6: Customization
        // Interact with sliders if possible, otherwise just screenshot controls area
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-6.png') });
        console.log('Captured watermark-6.png');

        // Step 7: Download Section
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'watermark-7.png') });
        console.log('Captured watermark-7.png');


        // --- 2. Signature Guide Screenshots ---
        console.log('Capturing Signature guide...');
        await page.goto(`${BASE_URL}/signature`, { waitUntil: 'networkidle0' });

        // Step 1: Initial Page
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-1.png') });
        console.log('Captured signature-1.png');

        // Step 2: Draw on Canvas
        const canvas = await page.$('canvas');
        if (canvas) {
            const rect = await canvas.boundingBox();
            await page.mouse.move(rect.x + 50, rect.y + 50);
            await page.mouse.down();
            await page.mouse.move(rect.x + 150, rect.y + 150, { steps: 10 });
            await page.mouse.move(rect.x + 250, rect.y + 50, { steps: 10 });
            await page.mouse.up();
        }
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-2.png') });
        console.log('Captured signature-2.png');

        // Step 3: Save Signature
        // Find "Simpan ke Dokumen" button. It contains "Simpan" text.
        try {
            await page.click('button::-p-text(Simpan)');
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
            console.log('Save button not found or click failed', e);
        }
        // Capture logic for saved signature list
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-3.png') });
        console.log('Captured signature-3.png');

        // Step 4: Upload Document for Signature
        // Scroll down
        await page.evaluate(() => window.scrollBy(0, 600));

        const [docFileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('div::-p-text(Upload Dokumen)') // Trying direct text on container or inner element, often clicks bubble up
        ]);
        await docFileChooser.accept([TEMP_IMAGE_PATH]);
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-4.png') });
        console.log('Captured signature-4.png');

        // Step 5: Place Signature (Drag and Drop simulation on document)
        // This is complex to automate blindly. We'll take a screenshot of the "Add Signature" button or the doc.
        // Let's assume user clicks "Add Signature" or just screenshots the doc ready state.

        // Select the saved signature first
        // Assuming first signature in list is auto-selected or we click it

        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-5.png') });
        console.log('Captured signature-5.png');

        // Step 6: Position/Resize
        // Hard to simulate visually without logic. We'll screenshot the workspace with the doc.
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-6.png') });
        console.log('Captured signature-6.png');

        // Step 7: Download
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'signature-7.png') });
        console.log('Captured signature-7.png');

    } catch (error) {
        console.error('Error capturing screenshots:', error);
    } finally {
        // Cleanup temp file
        if (fs.existsSync(TEMP_IMAGE_PATH)) {
            fs.unlinkSync(TEMP_IMAGE_PATH);
        }
        await browser.close();
        console.log('Done!');
    }
})();
