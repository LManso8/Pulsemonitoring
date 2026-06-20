# Seismic Module

## Overview

This module (`event_detection.py`) is the seismic evaluation layer of the
PULSE architecture. It correlates the velocity vectors extracted from the
Digital Signal Processing (DSP) pipeline (see `software/processing/`)
with the Peak Ground Velocity (PGV) of an event, and converts that value
into a Modified Mercalli Intensity (MMI) estimate using an empirical
seismological relationship.

## Evaluated Parameters
* **Peak Ground Velocity — PGV (mm/s):** The system strictly isolates the maximum absolute velocity recorded on the vertical axis (`max(|vz|)`), as surface waves (Rayleigh) represented on the Z-axis are the primary indicator of macroscopic energy dissipation in structural seismology.
* **Modified Mercalli Intensity (MMI):** Derived directly from the vertical PGV via empirical logarithmic translation.

## Implemented method

### Wald et al. (1999) empirical relationship

`equacao_wald_mercalli()` converts PGV (received in mm/s) to MMI:

1. Convert mm/s to cm/s (`pgv_cm_s = pgv_mm_s / 10.0`), as required by the
   original empirical formula.
2. If `pgv_cm_s <= 0.1`, return MMI = 1.0 directly (guards against
   `log(0)` for residual/near-zero signals).
3. Otherwise, compute `mmi = 3.47 * log10(pgv_cm_s) + 2.35`.
4. Clamp the result to the physical range of the scale:
   `max(1.0, min(10.0, mmi))`.

### Intensity classification

`classificar_mercalli()` rounds the MMI value to the nearest integer
degree and maps it to a Roman numeral and a phenomenological description:

| Computed MMI (grau) | Dashboard UI Label | Phenomenological Description | UI Color (Hex) |
| :--- | :--- | :--- | :--- |
| $\le 1$ | I - Não Sentido | Instrumental | `#555555` |
| 2 ou 3 | II a III - Fraco | Sentido em repouso | `#3399ff` |
| 4 | IV - Ligeiro | Vidros tremem | `#33cc33` |
| 5 | V - Moderado | Objetos caem | `#ffcc00` |
| 6 | VI - Forte | Danos no estuque | `#ff9900` |
| 7 | VII - Muito Forte | Danos moderados | `#ff3333` |
| 8 | VIII - Destrutivo | Danos severos | `#cc0000` |
| $\ge 9$ | IX+ - Violento | Colapso estrutural | `#990099` |

## Outputs

For each processed event, the seismic module provides:
1. **PGV (mm/s)** — the Peak Ground Velocity on the vertical axis (Z-axis).
2. **Mercalli Data Tuple** — the Roman numeral degree, the phenomenological description, and the strict UI color code utilized by the visualization engine.

## Related documentation

* `docs/standards.md` — note: PGV/Mercalli is documented separately from
  the four environmental standards, as it answers a different question
  (seismic intensity vs. structural vibration compliance).
* `docs/references.md` — full citation for Wald et al. (1999).
* `docs/validation.md` — validated vs. unvalidated capabilities, including
  the epicenter trilateration caveat.
