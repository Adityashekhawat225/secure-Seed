export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setTimeout(async () => {
      await navigator.clipboard.writeText("");
    }, 10000); // clears after 10 sec
  } catch (err) {
    console.error("Clipboard error:", err);
  }
};