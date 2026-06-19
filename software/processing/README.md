# Digital Signal Processing (DSP) Module

## Overview

This module (`signal_processing.py`) is the processing engine of the
PULSE architecture. It transforms the raw triaxial acceleration data
acquired by the hardware (see `docs/architecture.md`) into a clean,
normative-ready velocity signal, and extracts its frequency content via
FFT. Its outputs feed directly into the Environmental and Seismic
interpretation modules (`software/interpretation/`).

## Evaluated parameters

* **Raw acceleration (m/s²)** — triaxial input signal (`acel_x`, `acel_y`,
  `acel_z`), as recorded by the accelerometer and written to
  `eventos/amostras.csv`.
* **Processed velocity (mm/s)** — triaxial output signal (`vx_mm`,
  `vy_mm`, `vz_mm`), ready for PPV/PVS/PGV calculation.
* **Dominant frequency (Hz)** — the frequency with the highest spectral
  energy, used by the standards lookup logic (see `docs/standards.md`).

## Implemented functions

### `processar_cinematica(tempo, acel_x, acel_y, acel_z)`

Converts raw acceleration into processed velocity, per axis, in four
steps:

1. **Initial detrend (on acceleration)** — `scipy.signal.detrend` removes
   the sensor's initial DC offset from each raw acceleration axis, before
   any integration takes place.
2. **Numerical integration (trapezoidal rule)** —
   `scipy.integrate.cumtrapz(accel, tempo, initial=0)` integrates
   acceleration (m/s²) into velocity (m/s) using the trapezoidal rule,
   which accounts for the slope between consecutive samples rather than
   treating each interval as constant. `initial=0` keeps the output array
   the same length as the input time array.
3. **Second detrend (on velocity)** — `detrend` is applied again, this
   time to the integrated velocity signal, to remove the cumulative drift
   introduced by the integration step itself. This double-detrend
   approach (acceleration-side + velocity-side) is a deliberate design
   choice to separate two distinct sources of drift: hardware offset and
   numerical integration error.
4. **Unit conversion** — multiplies by `1000.0` to convert m/s to mm/s,
   the unit used by all four vibration standards.

Returns the three processed velocity arrays: `vx_mm, vy_mm, vz_mm`.

### `calcular_fft(tempo, sinal_velocidade)`

Computes the frequency spectrum of a velocity signal (typically the axis
with the largest peak, or the PVS):

1. Computes the sampling interval `dt` from the time array and guards
   against signals with fewer than 2 samples (returns `0.0` and empty
   arrays in that case).
2. Runs `scipy.fft.fft` on the velocity signal.
3. Normalizes the amplitude spectrum: `(2.0 / N) * |fft(signal)[:N//2]|`
   — the factor of 2 compensates for discarding the symmetric negative-
   frequency half of the spectrum, and `1/N` normalizes by signal length.
4. Maps the corresponding frequency axis with `scipy.fft.fftfreq`.
5. Identifies the dominant frequency as the highest-amplitude bin,
   **explicitly excluding index 0** (the DC / 0 Hz component), to avoid
   misidentifying a residual offset as the dominant frequency.

Returns `frequencia_dominante` (float, Hz), plus the `freqs` and
`amplitudes` arrays used to plot the spectrum.

## Outputs

For each processed event, this module provides:

1. **Processed velocity signal** (`vx_mm, vy_mm, vz_mm`) — the input to
   PPV/PVS (environmental module) and PGV (seismic module) calculations.
2. **Dominant frequency (Hz)** — used to select the correct frequency
   band when looking up standard thresholds (see
   `software/interpretation/environmental/`).
3. **Frequency/amplitude arrays** — used to render the spectrum plot in
   the generated reports (see examples in `data/processed/`).

## Design notes

* The double-detrend approach (step 1 and step 3 above) is more rigorous
  than detrending only once on the final velocity signal, since it
  addresses sensor-side offset and integration-side drift separately.
* The trapezoidal integration rule (`cumtrapz`) is more accurate for
  continuously sampled signals than a simple cumulative sum, since it
  accounts for the slope between consecutive samples rather than treating
  each sample interval as constant.

## Related documentation

* `docs/software.md` — system-wide software documentation. Note: an
  earlier, simpler version of this pipeline (single detrend on velocity,
  `np.cumsum` instead of `cumtrapz`) was documented there from
  `geonode_analyzer.py`; this module supersedes that approach. **This
  should be reconciled so both documents describe the same, current
  implementation** — see Open Items below.
* `docs/standards.md` — how the dominant frequency is used in threshold
  lookups.
* `docs/validation.md` — what has been tested against real events.

## Open items

* Confirm whether `geonode_analyzer.py` now calls into
  `signal_processing.py`, or whether the two implementations
  (the simpler one in `geonode_analyzer.py` and this one) currently
  coexist independently. If they coexist, clarify which one is
  authoritative for the reports shown in `data/processed/`.
* Update `docs/software.md` to reference `cumtrapz` and the double-detrend
  approach once the above is confirmed, so the project's documentation
  describes one consistent pipeline rather than two different versions.
