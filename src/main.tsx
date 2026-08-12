import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppAVer5 from "./AppAVer5";
import "./base.css";
import "./a-ver5.css";

const legacyPreviewPaths = new Set(["/a-ver2", "/a-ver3", "/a-ver4", "/a-ver5"]);
const currentUrl = new URL(window.location.href);
const normalizedPath = currentUrl.pathname.replace(/\/+$/, "").toLowerCase();
let shouldNormalizeUrl = false;

if (legacyPreviewPaths.has(normalizedPath)) {
  currentUrl.pathname = "/";
  shouldNormalizeUrl = true;
}

if (currentUrl.searchParams.has("variant")) {
  currentUrl.searchParams.delete("variant");
  shouldNormalizeUrl = true;
}

if (shouldNormalizeUrl) {
  window.history.replaceState(null, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
}

document.documentElement.dataset.variant = "A-ver5";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppAVer5 />
  </StrictMode>,
);
