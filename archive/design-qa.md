# Design QA: A-ver5 hero vertical placement

- Source visual truth: `/var/folders/l9/6f4_jbxj31577d7960lg5mbh0000gn/T/codex-clipboard-26092b8e-e7f8-4d98-a815-303fd123a879.png`
- Implementation: `http://127.0.0.1:4173/a-ver5`
- Implementation screenshot: `/private/tmp/vivache-a-ver5-after.png`
- Combined comparison: `/private/tmp/vivache-a-ver5-qa-comparison.jpg`
- State: initial desktop hero, no interaction
- CSS viewport: 1536 × 783, device scale factor 1
- Source pixels: 1503 × 783 RGBA
- Implementation pixels: 1521 × 775 RGB
- Density normalization: none; the source is an annotated placement reference rather than a pixel-identical browser capture. The comparison uses the photo frame as the shared visual boundary.

## Findings

- No actionable P0/P1/P2 findings remain.
- Fonts and typography: unchanged from A-ver5; family, weight, size, line height, letter spacing, wrapping, and hierarchy remain consistent.
- Spacing and layout rhythm: the desktop copy block moved upward by 46.98 px at the checked viewport. The feature chips now end 24 px above the photo-frame bottom instead of extending 25.59 px below it.
- Colors and visual tokens: unchanged; scrim, white copy, chip fill, radius, and shadow tokens remain consistent.
- Image quality and asset fidelity: the original `private-studio.webp` asset, crop, scale, and scrim are unchanged.
- Copy and content: unchanged.
- Responsive behavior: checked at 861 × 700, 860 × 700, and 390 × 844. No horizontal overflow was detected, and the mobile layout retains its previous placement.

## Full-view comparison evidence

The combined comparison shows the annotated source on the left and the revised implementation on the right. The requested text-and-chip group is visibly higher, and all three chips are contained within the photo at desktop width. The source includes red instructional marks and omits the site header, so those differences are intentionally excluded from fidelity findings.

## Focused-region comparison evidence

A separate crop was not needed because the requested change is limited to the hero group's vertical position, which is readable in the full-view comparison and was also verified from element bounds. Typography, image, and content were not modified.

## Comparison history

1. Earlier P2 finding: the feature chips ended 25.59 px below the photo frame, and the copy group sat lower than the annotated target.
2. Fix: increased desktop hero content bottom padding to `clamp(6.5rem, 14vh, 8rem)` and changed the desktop chip overlap to `-4.7rem`.
3. Post-fix evidence: at 1536 × 783 CSS viewport, the frame bottom is 742.05 px, the chip bottom is 718.05 px, and the copy begins 46.98 px higher. The combined screenshot confirms the chips are fully inside the photo.

## Implementation checklist

- [x] Move desktop hero copy upward as a single visual group.
- [x] Place all feature chips within the photo frame.
- [x] Preserve mobile placement and prevent horizontal overflow.
- [x] Confirm browser console has no warnings or errors.
- [x] Run production build and lint.

final result: passed
