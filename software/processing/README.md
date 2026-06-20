# Digital Signal Processing (DSP) Module

## Overview

This module (`signal_processing.py`) is the processing engine of the PULSE architecture. It transforms the raw triaxial acceleration data acquired by the hardware (see `docs/architecture.md`) into a clean, normative-ready velocity signal, and extracts its frequency content via FFT. Its outputs feed directly into the Environmental and Seismic interpretation modules (`software/interpretation/`).

## Evaluated parameters

* **Raw acceleration (m/s²)** — triaxial input signal (`acel_x`, `acel_y`, `acel_z`), as recorded by the accelerometer and written to `eventos/amostras.csv`.
* **Processed velocity (mm/s)** — triaxial output signal (`vx_mm`, `vy_mm`, `vz_mm`), ready for PPV/PVS/PGV calculation.
* **Dominant frequency (Hz)** — the frequency with the highest spectral energy, used by the standards lookup logic (see `docs/standards.md`).

## Implemented functions

### `converter_aceleracao_para_velocidade(accel_ms2, dt)`
Converts raw acceleration into processed velocity, per axis, ensuring baseline stability:
1. **Numerical integration (Cumulative Sum):** Executes a high-performance rectangular integration (`np.cumsum(accel_ms2) * dt`), yielding velocity in m/s. This method was selected for its execution speed and reliability in transient event windows.
2. **Drift removal:** `scipy.signal.detrend` is applied to the integrated velocity signal to remove the cumulative drift (DC offset) introduced by the numerical integration and intrinsic hardware bias. This ensures the kinematic curve returns to a zero-baseline after the event.
3. **Unit conversion:** Multiplies the output by 1000.0 to convert $m/s$ to $mm/s$, the normative dimension used across civil engineering standards.

### `compute_fft(signal, sample_rate)`
Computes the frequency spectrum of the processed velocity signal:
1. Runs `scipy.fft.fft` on the velocity array.
2. Generates the frequency mapping via `scipy.fft.fftfreq`.
3. Applies a positive-frequency Boolean mask (`mask = xf > 0`) to discard the symmetric negative-frequency half of the spectrum and strictly isolate the physical frequency components.

## Outputs

For each processed event, this module provides:
* **Processed velocity signal** (`vx`, `vy`, `vz` in mm/s) — the kinematic input for PPV/PVS (Environmental) and PGV (Seismic) calculations.
* **Dominant frequency (Hz)** — dynamically extracted via `argmax` on the FFT spectrum, used to select the correct frequency envelope in normative compliance matrices.
