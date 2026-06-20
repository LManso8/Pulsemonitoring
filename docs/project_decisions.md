# Project Decisions

A record of the key design choices made during PULSE's development, and
the reasoning behind them. 

## Why Raspberry Pi Pico W

- Built-in Wi-Fi removes the need for a separate communication module.
- Low cost and low power draw suit a field-deployable prototype.
- MicroPython support allows fast iteration on firmware logic without a
  full embedded C/C++ toolchain.

## Why High-Frequency Sampling (~475 Hz Hardware Target)

- High enough to resolve impact and structural vibration events (which typically exhibit dominant resonance well under 100 Hz) providing a Nyquist–Shannon safety margin for FFT resolution.
- Low enough to keep the I2C read loop and Wi-Fi batch transmission stable.
- **Architectural decoupling:** While the hardware targets 475 Hz, the Python DSP pipeline computes the effective Sample Rate dynamically based on the ingested timestamps, ensuring algorithmic stability even if network latency drops the effective rate closer to 250 Hz.

## Why a dedicated Flask server (servidor.py) instead of writing the CSV from the firmware directly

- The Pico W does not need to manage an SD card filesystem or handle
  concurrent write safety; it only needs to send a JSON payload.
- Centralizing the CSV write in one server process avoids file-corruption
  risk if multiple Pico W units (in a future multi-node setup) write
  concurrently.
- The server is also responsible for reconstructing real-world timestamps,
  which keeps the firmware simple (it only needs to track milliseconds
  since boot, not maintain an accurate wall clock).

## Why CSV as the data format

- Transparent and inspectable — every value can be opened in a spreadsheet
  or text editor, which matters for an academic project where reviewers
  need to verify the pipeline.
- Acts as a single shared source of truth written by the server and read
  by the dashboard for processing.
- Trade-off accepted: CSV does not scale well to very high-frequency,
  long-duration continuous logging. This is acceptable because PULSE logs
  discrete triggered events, not continuous streams.

## Why separate Environmental and Seismic modes

- The two domains use different metrics (PPV/PVS vs. PGV), different
  reference literature (engineering standards vs. seismological empirical
  relationships), and answer different questions: "is this safe for
  structures nearby?" vs. "how strong was this as a seismic event?".
- Keeping them as separate interpretation modules, rather than one merged
  classifier, makes each easier to validate and extend independently.

## Why BS 5228-2 / ISO 2631-2 use fixed thresholds, not full frequency curves

- Scoping decision for the prototype phase: NP 2074 and DIN 4150-3 were
  prioritized for full frequency-band x structure-class implementation
  because they are the standards most directly applicable to the
  construction/mining contexts PULSE targets.
- BS 5228-2 and ISO 2631-2 were included for breadth (occupational/comfort
  perspective) using their simpler reference thresholds, with full
  frequency weighting flagged as future work rather than implemented
  approximately.

## Why epicenter trilateration is a roadmap item, not a delivered feature

- Real trilateration requires multiple synchronized physical nodes in the
  field. Building and validating a multi-node deployment was out of scope
  for the current hardware and timeline.
- Rather than presenting a simulated result as if it were validated, the
  decision was to clearly document it as a designed-but-unproven capability
  (see validation.md) and demonstrate the underlying math
  (P-wave delay = distance / velocity) conceptually.
