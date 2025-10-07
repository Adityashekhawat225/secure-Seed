import CryptoJS from "crypto-js";

export const encryptData = (data: string, secretKey: string): string => {
  try {
    if (!data) return "";
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (err) {
    console.error("Encryption failed:", err);
    return data;
  }
};

export const decryptData = (encryptedData: string, secretKey: string): string => {
  try {
    if (!encryptedData) return "";

    const isProbablyEncrypted =
      /^[A-Za-z0-9+/=]+$/.test(encryptedData) && encryptedData.length > 20;

    if (!isProbablyEncrypted) {
      console.warn("Data not encrypted, returning raw value:", encryptedData);
      return encryptedData;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted || decrypted.trim() === "") {
      console.warn("Decryption failed or returned empty, returning raw data");
      return encryptedData;
    }

    return decrypted;
  } catch (err) {
    console.error("Decryption error:", err);
    return encryptedData; // fallback
  }
};
