# Architecture

## Overview
PULSE is composed of four decoupled components: a hardware acquisition node, a receiving ingestion server (`servidor.py`), a DSP interpretation pipeline with an integrated dashboard (`geonode_analyzer.py`), and a separate demonstration web interface. Data flows from the physical sensor array through the ingestion server into a centralized CSV datastore, acting as the single source of truth for all downstream clients.



## Components

### 1. Acquisition (hardware/)
- 3-axis I2C accelerometer, sampled at **475 Hz**.
- Raspberry Pi Pico W firmware detects events locally via an acceleration
  threshold, buffers the samples for that event, and sends them as a batch
  over Wi-Fi (HTTP POST) to the server — it does not stream continuously.
- A batch sent to the server can contain one or more events, each with its
  own buffered list of samples.

### 2. Server (servidor.py)
- A Flask application listening on port 5000 (`0.0.0.0`, i.e. reachable
  from any device on the local network), exposing a single confirmed
  endpoint: `POST /eventos`.
- Receives a JSON payload of the form:
```json
  {
    "hora_base_iso": "2026-06-18T12:00:00",
    "timestamp_base_ms": 123456,
    "eventos": [
      {
        "timestamp_ms": 123900,
        "duracao_ms": 2000,
        "amostras": [
          {"t_ms": 0, "ax": 0.12, "ay": -0.03, "az": 9.81},
          ...
        ]
      }
    ]
  }
```
- For each event, reconstructs the real wall-clock timestamp from
  `timestamp_base_ms` + the per-event offset (`timestamp_ms - timestamp_base_ms`),
  using `hora_base_iso` as the anchor. This means the Pico W only needs to
  track elapsed milliseconds since boot, not an absolute clock — the
  server supplies the real-world time reference.
- Assigns a sequential `evento_id` to each incoming event and appends every
  sample to `eventos/amostras.csv`.
- Accepts sample fields under either of two possible key names (`ax` or
  `x_ms2`, etc.) for backward compatibility with earlier firmware versions.
- The CSV schema includes reserved `dx_ms2, dy_ms2, dz_ms2` columns. These
  are not currently populated by the firmware (no gyroscope or secondary
  sensor exists in the current hardware) — they default to empty strings
  and are not used anywhere downstream.

### 3. Processing & dashboard (geonode_analyzer.py)
- Reads `eventos/amostras.csv`, groups rows by `evento_id`.
- Converts acceleration to velocity (integration + drift removal + unit
  conversion — see `software.md`), computes the FFT, and applies the
  Environmental and Seismic interpretation logic (see `standards.md`).
- Also implements the Tkinter : lists detected events, lets the user
  pick a module (Signal / Environmental / Seismic), and renders the
  corresponding matplotlib report in a separate window.

  
### 4. Website (Demonstration UI)
- A separate HTML/JavaScript front-end built for live telemetry presentation.
- Acts as a lightweight client: it polls the centralized datastore (via asynchronous GET requests or direct file reads) to render the 3-axis kinematic waveform in near real-time without interfering with the heavy mathematical DSP pipeline executed by the Python dashboard.

## Data flow summary

1. The accelerometer samples continuously at 475 Hz; the Pico W firmware
   buffers samples for a detected event and sends the batch to the server.
2. `servidor.py` receives the batch, reconstructs real timestamps, assigns
   `evento_id`s, and appends the samples to `amostras.csv`.
3. `geonode_analyzer.py` reads the CSV on demand, processes a selected
   event (integration, drift removal, FFT), and classifies it
   (Environmental and/or Seismic).
4. The website connects to `servidor.py` over HTTP and fetches event data
   whenever a new event occurs, rendering the 3-axis waveform in the
   browser for live demonstrations. (Exact route — see open item above.)

## Design constraints

- **Single-node by design (current phase).** All thresholds and the
  seismic classification operate on data from one sensor node. Multi-node
  features (epicenter trilateration) are documented separately as
  roadmap — see `validation.md`.
- **Batched, not streamed, transmission.** The Pico W sends complete
  events rather than individual samples in real time, reducing Wi-Fi
  overhead at the cost of slight latency between event detection and
  server receipt.

Performs environmental assessment and seismic event detection.

### Visualization

Generates plots and reports for analysis.
