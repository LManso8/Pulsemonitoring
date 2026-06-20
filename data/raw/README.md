# Raw Data

## Overview
This folder contains the raw CSV exports from the prototype's acquisition pipeline — the data written by the hardware gateway to `eventos/amostras.csv` (see `docs/architecture.md`). It serves as the historical archive and provides sample data to validate the software without requiring the physical sensor array.

## Data Schema & Metadata

* **Sampling Frequency:** Hardware-dependent and dynamically calculated per event. The ingestion engine computes the true Sample Rate via the $\Delta t$ mean of the recorded timestamps, falling back to a 250 Hz safety default only if temporal resolution is degraded.
* **Timestamp Format:** Reconstructed Local Time (`DD/MM HH:MM:SS.fff`) executed by the ingestion engine to avoid Base-60 math errors.

All files follow the same column structure as `eventos/amostras.csv`:

| Column | Description |
|---|---|
| `evento_id` | Sequential integer identifying the triggered vibration event. |
| `data_hora_evento` | Reconstructed high-precision wall-clock timestamp (Day/Month Time). |
| `t_ms` | Relative elapsed time since the hardware trigger threshold, in milliseconds. |
| `ax_ms2`, `ay_ms2`, `az_ms2` | Raw triaxial acceleration along the X, Y, and Z axes ($m/s^2$). |
| `dx`, `dy`, `dz` | Reserved telemetry columns (Unpopulated/Raw). Kept for future hardware iterations involving secondary sensors (e.g., gyroscope or direct displacement). |

## Available Sample Data
To allow peer review and software validation without the active Arduino hardware, a test file containing real near-field impact data has been committed to this directory.

**How to Test the Dashboard (Without Hardware):**
1. Copy the sample file `evento_teste_nearfield.csv` from this folder.
2. Paste it into your local `eventos/` folder and rename it to `amostras.csv`.
3. Launch `dashboard_gui.py` and click the "Forçar Leitura CSV" button to ingest the data and test the reporting engines.

## Testing Context (Current Status)
The events used during development to validate the DSP pipeline (see `docs/validation.md`) were generated through **uncalibrated near-field impulse testing** (e.g., direct mechanical impacts adjacent to the sensor array).

This means:
- The drift-removal step (`detrend`) has been validated qualitatively (the resulting velocity signal returns to a stable baseline rather than drifting indefinitely), but the sensor's intrinsic offset has not been characterized in isolation via a formal static-rest measurement.
- The extreme PPV/PVS/PGV values produced by these local tests are not representative of macroscopic real-world field distances — see the caveat in `data/processed/README.md`.

## Future Work
A controlled static-rest calibration test (sensor at rest, no induced vibration, recorded over several minutes) would let the team quantify the accelerometer's intrinsic hardware offset independently of the software-side `scipy.signal.detrend` correction. This is listed as future work in `docs/validation.md`.
