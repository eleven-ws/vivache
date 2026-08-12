const ADDRESS = "〒530-0047 大阪府大阪市北区西天満４丁目１５−１８ プラザ梅新 1402";

/** 公開前に確定情報へ差し替える項目を集約しています。 */
export const SITE_CONFIG = {
  LINE_URL: "https://line.me/",
  HOTPEPPER_URL: "",
  ADDRESS,
  MAP_URL: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
  MAP_EMBED_URL: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`,
  LOCATION_SHORT: "北新地徒歩5分 / 梅田14階",
  OPENING_HOURS: "平日 10:00〜22:00",
  WEEKEND_HOURS: "土日 不定休",
} as const;

export type TrackingEvent =
  | "line_click_fv"
  | "line_click_trainer"
  | "line_click_price"
  | "line_click_final"
  | "hotpepper_click_header"
  | "hotpepper_click_fv"
  | "hotpepper_click_method"
  | "hotpepper_click_experience"
  | "hotpepper_click_final"
  | "hotpepper_click_floating"
  | "program_view"
  | "faq_open"
  | "scroll_25"
  | "scroll_50"
  | "scroll_75"
  | "scroll_100";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: TrackingEvent, detail?: Record<string, unknown>) {
  const payload = {
    event,
    variant: document.documentElement.dataset.variant ?? "A",
    ...detail,
  };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("vivache:analytics", { detail: payload }));
}
