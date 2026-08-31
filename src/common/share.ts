/**
 * Shared native-share / clipboard helper used by ViewClass, ViewTask, and EditClass.
 * Callers build the URL and share payload; this only handles navigator.share vs clipboard fallback.
 *
 * @module common/share
 */
import { WarningToast, SuccessToast } from "@svonk/util";

/**
 * Share a URL via the Web Share API, or copy it to the clipboard when share is unavailable.
 *
 * @param {Object} options
 * @param {string} options.title - Share title
 * @param {string} [options.text] - Share text body
 * @param {string} options.url - Absolute URL to share
 * @param {{ error: Function }} [options.status] - Optional status logger (e.g. this.$status)
 * @param {string} [options.shareErrorMessage="🔥 Error sharing"] - Message passed to status.error on share failure
 * @returns {Promise<void>}
 */
export async function shareUrl({ title, text, url, status, shareErrorMessage = "🔥 Error sharing" }) {
  if (navigator.share) {
    return navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => new SuccessToast("Opened share dialog", 1000))
      .catch((err) => status?.error?.(shareErrorMessage, err));
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    new WarningToast("Sharing not supported, copied link to clipboard", 2000);
  } else {
    new WarningToast("Sharing and copying not supported, sorry", 2000);
  }
}
