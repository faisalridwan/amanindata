/**
 * QRIS Generator Utility
 * Generates QRIS code with dynamic amount
 */

/**
 * Calculate CRC16-CCITT checksum for QRIS
 * @param {string} str - Input string
 * @returns {string} - 4-character hex CRC
 */
function calculateCRC16(str) {
    let crc = 0xFFFF;
    const polynomial = 0x1021;

    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ polynomial;
            } else {
                crc = crc << 1;
            }
            crc &= 0xFFFF;
        }
    }

    return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Generate QRIS with custom amount
 * @param {string} baseQRIS - Base QRIS string without CRC
 * @param {string|number} amount - Amount in Rupiah
 * @returns {string} - Complete QRIS string with amount and CRC
 */
export function generateQRIS(baseQRIS, amount) {
    // Remove existing CRC (last 4 chars after "63" tag)
    let qrisWithoutCRC = baseQRIS;
    const crcIndex = baseQRIS.lastIndexOf('6304');
    if (crcIndex !== -1) {
        qrisWithoutCRC = baseQRIS.substring(0, crcIndex);
    }

    // Format amount with ID "54" and length
    const amountStr = String(amount);
    const amountLength = amountStr.length.toString().padStart(2, '0');
    const amountTag = `54${amountLength}${amountStr}`;

    // Insert amount before CRC tag
    const qrisWithAmount = qrisWithoutCRC + amountTag;

    // Add CRC tag placeholder
    const qrisForCRC = qrisWithAmount + '6304';

    // Calculate CRC
    const crc = calculateCRC16(qrisForCRC);

    return qrisForCRC + crc;
}

export default generateQRIS;
