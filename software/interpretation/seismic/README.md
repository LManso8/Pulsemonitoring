# Seismological Module

## Overview
This module shifts the analytical focus of the GeoNode architecture from localized structural compliance to regional macroscopic seismology. It is designed to evaluate low-frequency, high-amplitude transient events (earthquakes), translating the instrument's kinematic data into standardized human-perceptible and structural damage intensity scales.

## Evaluated Parameters
Unlike the environmental module, which evaluates high-frequency resonance limits, the seismic engine focuses on macroscopic ground motion:
* **Peak Ground Velocity (PGV):** The maximum absolute velocity recorded during the seismic transient. PGV is the preferred primary indicator in modern seismology for assessing potential damage.
* **Low-Frequency Dominance:** The module expects seismic surface and body waves to exhibit dominant frequencies significantly lower than standard environmental or mechanical noise (typically < 5 Hz), verified via the DSP pipeline's FFT output.

## Implemented Frameworks
The core of this module is the programmatic implementation of the **Modified Mercalli Intensity (MMI) Scale**.
* **Wald et al. (1999) Empirical Correlation:** The engine maps the calculated Peak Ground Velocity (PGV) directly onto the subjective Mercalli scale. This mathematical bridging converts raw, instrumented physics into phenomenological impact tiers.

## Outputs
For each evaluated transient event, the module outputs a graduated scientific classification:
1. **Intensity Grade:** The deterministic MMI grade represented in standard Roman numerals (ranging from **I** to **IX+**).
2. **Hazard Classification:** The textual seismological descriptor associated with the computed intensity (e.g., *Instrumental, Ligeiro, Moderado, Severo, Destrutivo*).
3. **Macroscopic Impact Indicator:** Contextual data regarding expected human perception (e.g., "Felt by few", "General panic") and potential structural yield thresholds.
