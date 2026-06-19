# Raw Data (Verification Benchmarks)

## Overview
This folder contains static, immutable baseline datasets acquired directly from the triaxial acceleration monitoring system. 

NOTE: To maintain repository efficiency and comply with software engineering best practices, continuous production logs generated during real-time monitoring are excluded from version control via `.gitignore`. The datasets stored here serve exclusively as historical calibration benchmarks and unit testing inputs for the signal processing pipeline.

## Data Schema & Specifications
All files are structured in Comma-Separated Values (CSV) format with the following column matrix:
1. `evento_id`: Unique integer identifier for the seismic or vibration trigger.
2. `data_hora_evento`: Temporal reference point recorded at the instance of execution.
3. `t_ms`: Continuous relative time increment since trigger initialization, measured in milliseconds (ms).
4. `ax_ms2`, `ay_ms2`, `az_ms2`: Raw linear acceleration values mapped across the X, Y, and Z orthogonal axes, measured in meters per second squared (m/s²).

## Baseline Examples (Calibration & Triggers)
The sample files in this folder reflect actual physical calibration tests conducted in a laboratory environment to validate the mechanical and algorithmic responses of the system:

- `calibration_static_drift.csv`: (Static Baseline) - Record of the sensor at absolute rest. Essential file to quantify the accelerometer's intrinsic error rate (Offset/Drift) and to assess the 'Detrend' filter correction constant in numerical integrations.
- `trigger_impulse_test.csv`: (Dynamic Threshold Validation) - Record of a physical test involving an abrupt mechanical impact (high amplitude, short duration). Used to validate the software's interception mechanics against a dynamic acceleration threshold configurable by the operator.
- `resonance_continuous_wave.csv`: (Spectral Validation) - Record of continuous forced vibration in the vicinity of the sensor. Reference file to test the precision and resolution of the Fast Fourier Transform (FFT) algorithm in identifying the dominant frequency of the structural system.
