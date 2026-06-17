# System Architecture

## Overview

The PULSE system is composed of two main subsystems:

- Hardware Subsystem
- Software Subsystem

The hardware acquires vibration signals and converts them into digital data.

The software processes, interprets and visualizes the collected information.

---

## Data Flow

Accelerometer
↓
ADC
↓
JSON Data
↓
Acquisition
↓
Processing
↓
Interpretation
↓
Visualization

---

## Hardware Subsystem

The hardware subsystem is responsible for:

- Vibration acquisition
- Signal conditioning
- Data conversion
- Data storage

Main Components:

- Accelerometer
- ADC
- Raspberry Pi
- Power Supply
- 3D Printed Enclosure

---

## Software Subsystem

The software subsystem is divided into four stages:

### Acquisition

Reads vibration data from CSV files.

### Processing

Filters vibration signals and extracts relevant features.

### Interpretation

Performs environmental assessment and seismic event detection.

### Visualization

Generates plots and reports for analysis.
